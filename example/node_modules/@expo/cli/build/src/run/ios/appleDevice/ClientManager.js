"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _stream = require("stream");
var tls = _interopRequireWildcard(require("tls"));
var _errors = require("../../../utils/errors");
var _afcclient = require("./client/AFCClient");
var _debugserverClient = require("./client/DebugserverClient");
var _installationProxyClient = require("./client/InstallationProxyClient");
var _lockdowndClient = require("./client/LockdowndClient");
var _mobileImageMounterClient = require("./client/MobileImageMounterClient");
var _usbmuxdClient = require("./client/UsbmuxdClient");
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
class ClientManager {
    constructor(pairRecord, device, lockdowndClient){
        this.pairRecord = pairRecord;
        this.device = device;
        this.lockdowndClient = lockdowndClient;
        this.connections = [
            lockdowndClient.socket
        ];
    }
    static async create(udid) {
        const usbmuxClient = new _usbmuxdClient.UsbmuxdClient(_usbmuxdClient.UsbmuxdClient.connectUsbmuxdSocket());
        const device = await usbmuxClient.getDevice(udid);
        const pairRecord = await usbmuxClient.readPairRecord(device.Properties.SerialNumber);
        const lockdownSocket = await usbmuxClient.connect(device, 62078);
        const lockdownClient = new _lockdowndClient.LockdowndClient(lockdownSocket);
        await lockdownClient.doHandshake(pairRecord);
        return new ClientManager(pairRecord, device, lockdownClient);
    }
    async getUsbmuxdClient() {
        const usbmuxClient = new _usbmuxdClient.UsbmuxdClient(_usbmuxdClient.UsbmuxdClient.connectUsbmuxdSocket());
        this.connections.push(usbmuxClient.socket);
        return usbmuxClient;
    }
    async getLockdowndClient() {
        const usbmuxClient = new _usbmuxdClient.UsbmuxdClient(_usbmuxdClient.UsbmuxdClient.connectUsbmuxdSocket());
        const lockdownSocket = await usbmuxClient.connect(this.device, 62078);
        const lockdownClient = new _lockdowndClient.LockdowndClient(lockdownSocket);
        this.connections.push(lockdownClient.socket);
        return lockdownClient;
    }
    async getLockdowndClientWithHandshake() {
        const lockdownClient = await this.getLockdowndClient();
        await lockdownClient.doHandshake(this.pairRecord);
        return lockdownClient;
    }
    async getAFCClient() {
        return this.getServiceClient("com.apple.afc", _afcclient.AFCClient);
    }
    async getInstallationProxyClient() {
        return this.getServiceClient("com.apple.mobile.installation_proxy", _installationProxyClient.InstallationProxyClient);
    }
    async getMobileImageMounterClient() {
        return this.getServiceClient("com.apple.mobile.mobile_image_mounter", _mobileImageMounterClient.MobileImageMounterClient);
    }
    async getDebugserverClient() {
        try {
            // iOS 14 added support for a secure debug service so try to connect to that first
            return await this.getServiceClient("com.apple.debugserver.DVTSecureSocketProxy", _debugserverClient.DebugserverClient);
        } catch  {
            // otherwise, fall back to the previous implementation
            return this.getServiceClient("com.apple.debugserver", _debugserverClient.DebugserverClient, true);
        }
    }
    async getServiceClient(name, ServiceType, disableSSL = false) {
        const { port: servicePort , enableServiceSSL  } = await this.lockdowndClient.startService(name);
        const usbmuxClient = new _usbmuxdClient.UsbmuxdClient(_usbmuxdClient.UsbmuxdClient.connectUsbmuxdSocket());
        let usbmuxdSocket = await usbmuxClient.connect(this.device, servicePort);
        if (enableServiceSSL) {
            const tlsOptions = {
                rejectUnauthorized: false,
                secureContext: tls.createSecureContext({
                    // Avoid using `secureProtocol` fixing the socket to a single TLS version.
                    // Newer Node versions might not support older TLS versions.
                    // By using the default `minVersion` and `maxVersion` options,
                    // The socket will automatically use the appropriate TLS version.
                    // See: https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions
                    cert: this.pairRecord.RootCertificate,
                    key: this.pairRecord.RootPrivateKey
                })
            };
            // Some services seem to not support TLS/SSL after the initial handshake
            // More info: https://github.com/libimobiledevice/libimobiledevice/issues/793
            if (disableSSL) {
                // According to https://nodejs.org/api/tls.html#tls_tls_connect_options_callback we can
                // pass any Duplex in to tls.connect instead of a Socket. So we'll use our proxy to keep
                // the TLS wrapper and underlying usbmuxd socket separate.
                const proxy = new UsbmuxdProxy(usbmuxdSocket);
                tlsOptions.socket = proxy;
                await new Promise((resolve, reject)=>{
                    const timeoutId = setTimeout(()=>{
                        reject(new _errors.CommandError("APPLE_DEVICE", "The TLS handshake failed to complete after 5s."));
                    }, 5000);
                    tls.connect(tlsOptions, function() {
                        clearTimeout(timeoutId);
                        // After the handshake, we don't need TLS or the proxy anymore,
                        // since we'll just pass in the naked usbmuxd socket to the service client
                        this.destroy();
                        resolve();
                    });
                });
            } else {
                tlsOptions.socket = usbmuxdSocket;
                usbmuxdSocket = tls.connect(tlsOptions);
            }
        }
        const client = new ServiceType(usbmuxdSocket);
        this.connections.push(client.socket);
        return client;
    }
    end() {
        for (const socket of this.connections){
            // may already be closed
            try {
                socket.end();
            } catch  {}
        }
    }
}
exports.ClientManager = ClientManager;
class UsbmuxdProxy extends _stream.Duplex {
    constructor(usbmuxdSock){
        super();
        this.usbmuxdSock = usbmuxdSock;
        this.usbmuxdSock.on("data", (data)=>{
            this.push(data);
        });
    }
    _write(chunk, encoding, callback) {
        this.usbmuxdSock.write(chunk);
        callback();
    }
    _read(size) {
    // Stub so we don't error, since we push everything we get from usbmuxd as it comes in.
    // TODO: better way to do this?
    }
    _destroy() {
        this.usbmuxdSock.removeAllListeners();
    }
}

//# sourceMappingURL=ClientManager.js.map