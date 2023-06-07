"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _debug = _interopRequireDefault(require("debug"));
var tls = _interopRequireWildcard(require("tls"));
var _lockdownProtocol = require("../protocol/LockdownProtocol");
var _serviceClient = require("./ServiceClient");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
const debug = (0, _debug).default("expo:apple-device:client:lockdownd");
function isLockdowndServiceResponse(resp) {
    return resp.Request === "StartService" && resp.Service !== undefined && resp.Port !== undefined;
}
function isLockdowndSessionResponse(resp) {
    return resp.Request === "StartSession";
}
function isLockdowndAllValuesResponse(resp) {
    return resp.Request === "GetValue" && resp.Value !== undefined;
}
function isLockdowndValueResponse(resp) {
    return resp.Request === "GetValue" && resp.Key !== undefined && typeof resp.Value === "string";
}
function isLockdowndQueryTypeResponse(resp) {
    return resp.Request === "QueryType" && resp.Type !== undefined;
}
class LockdowndClient extends _serviceClient.ServiceClient {
    constructor(socket){
        super(socket, new _lockdownProtocol.LockdownProtocolClient(socket));
        this.socket = socket;
    }
    async startService(name) {
        debug(`startService: ${name}`);
        const resp = await this.protocolClient.sendMessage({
            Request: "StartService",
            Service: name
        });
        if (isLockdowndServiceResponse(resp)) {
            return {
                port: resp.Port,
                enableServiceSSL: !!resp.EnableServiceSSL
            };
        } else {
            throw new _serviceClient.ResponseError(`Error starting service ${name}`, resp);
        }
    }
    async startSession(pairRecord) {
        debug(`startSession: ${pairRecord}`);
        const resp = await this.protocolClient.sendMessage({
            Request: "StartSession",
            HostID: pairRecord.HostID,
            SystemBUID: pairRecord.SystemBUID
        });
        if (isLockdowndSessionResponse(resp)) {
            if (resp.EnableSessionSSL) {
                this.protocolClient.socket = new tls.TLSSocket(this.protocolClient.socket, {
                    secureContext: tls.createSecureContext({
                        // Avoid using `secureProtocol` fixing the socket to a single TLS version.
                        // Newer Node versions might not support older TLS versions.
                        // By using the default `minVersion` and `maxVersion` options,
                        // The socket will automatically use the appropriate TLS version.
                        // See: https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions
                        cert: pairRecord.RootCertificate,
                        key: pairRecord.RootPrivateKey
                    })
                });
                debug(`Socket upgraded to TLS connection`);
            }
        // TODO: save sessionID for StopSession?
        } else {
            throw new _serviceClient.ResponseError("Error starting session", resp);
        }
    }
    async getAllValues() {
        debug(`getAllValues`);
        const resp = await this.protocolClient.sendMessage({
            Request: "GetValue"
        });
        if (isLockdowndAllValuesResponse(resp)) {
            return resp.Value;
        } else {
            throw new _serviceClient.ResponseError("Error getting lockdown value", resp);
        }
    }
    async getValue(val) {
        debug(`getValue: ${val}`);
        const resp = await this.protocolClient.sendMessage({
            Request: "GetValue",
            Key: val
        });
        if (isLockdowndValueResponse(resp)) {
            return resp.Value;
        } else {
            throw new _serviceClient.ResponseError("Error getting lockdown value", resp);
        }
    }
    async queryType() {
        debug("queryType");
        const resp = await this.protocolClient.sendMessage({
            Request: "QueryType"
        });
        if (isLockdowndQueryTypeResponse(resp)) {
            return resp.Type;
        } else {
            throw new _serviceClient.ResponseError("Error getting lockdown query type", resp);
        }
    }
    async doHandshake(pairRecord) {
        debug("doHandshake");
        // if (await this.lockdownQueryType() !== 'com.apple.mobile.lockdown') {
        //   throw new CommandError('Invalid type received from lockdown handshake');
        // }
        // await this.getLockdownValue('ProductVersion');
        // TODO: validate pair and pair
        await this.startSession(pairRecord);
    }
}
exports.LockdowndClient = LockdowndClient;

//# sourceMappingURL=LockdowndClient.js.map