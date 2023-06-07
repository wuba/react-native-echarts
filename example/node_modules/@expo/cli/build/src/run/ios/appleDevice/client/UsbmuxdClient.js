"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _plist = _interopRequireDefault(require("@expo/plist"));
var _debug = _interopRequireDefault(require("debug"));
var _net = require("net");
var _errors = require("../../../../utils/errors");
var _plist1 = require("../../../../utils/plist");
var _usbmuxProtocol = require("../protocol/UsbmuxProtocol");
var _serviceClient = require("./ServiceClient");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = (0, _debug).default("expo:apple-device:client:usbmuxd");
function isUsbmuxdConnectResponse(resp) {
    return resp.MessageType === "Result" && resp.Number !== undefined;
}
function isUsbmuxdDeviceResponse(resp) {
    return resp.DeviceList !== undefined;
}
function isUsbmuxdPairRecordResponse(resp) {
    return resp.PairRecordData !== undefined;
}
class UsbmuxdClient extends _serviceClient.ServiceClient {
    constructor(socket){
        super(socket, new _usbmuxProtocol.UsbmuxProtocolClient(socket));
        this.socket = socket;
    }
    static connectUsbmuxdSocket() {
        debug("connectUsbmuxdSocket");
        if (process.platform === "win32") {
            return (0, _net).connect({
                port: 27015,
                host: "localhost"
            });
        } else {
            return (0, _net).connect({
                path: "/var/run/usbmuxd"
            });
        }
    }
    async connect(device, port) {
        debug(`connect: ${device.DeviceID} on port ${port}`);
        debug(`connect:device: %O`, device);
        const response = await this.protocolClient.sendMessage({
            messageType: "Connect",
            extraFields: {
                DeviceID: device.DeviceID,
                PortNumber: htons(port)
            }
        });
        debug(`connect:device:response: %O`, response);
        if (isUsbmuxdConnectResponse(response) && response.Number === 0) {
            return this.protocolClient.socket;
        } else {
            throw new _serviceClient.ResponseError(`There was an error connecting to the USB connected device (id: ${device.DeviceID}, port: ${port})`, response);
        }
    }
    async getDevices() {
        debug("getDevices");
        const resp = await this.protocolClient.sendMessage({
            messageType: "ListDevices"
        });
        if (isUsbmuxdDeviceResponse(resp)) {
            return resp.DeviceList;
        } else {
            throw new _serviceClient.ResponseError("Invalid response from getDevices", resp);
        }
    }
    async getDevice(udid) {
        debug(`getDevice ${udid ? "udid: " + udid : ""}`);
        const devices = await this.getDevices();
        if (!devices.length) {
            throw new _errors.CommandError("APPLE_DEVICE_USBMUXD", "No devices found");
        }
        if (!udid) {
            return devices[0];
        }
        for (const device of devices){
            if (device.Properties && device.Properties.SerialNumber === udid) {
                return device;
            }
        }
        throw new _errors.CommandError("APPLE_DEVICE_USBMUXD", `No device found (udid: ${udid})`);
    }
    async readPairRecord(udid) {
        debug(`readPairRecord: ${udid}`);
        const resp = await this.protocolClient.sendMessage({
            messageType: "ReadPairRecord",
            extraFields: {
                PairRecordID: udid
            }
        });
        if (isUsbmuxdPairRecordResponse(resp)) {
            // the pair record can be created as a binary plist
            const BPLIST_MAGIC = Buffer.from("bplist00");
            if (BPLIST_MAGIC.compare(resp.PairRecordData, 0, 8) === 0) {
                debug("Binary plist pair record detected.");
                return (0, _plist1).parsePlistBuffer(resp.PairRecordData)[0];
            } else {
                // TODO: use parsePlistBuffer
                return _plist.default.parse(resp.PairRecordData.toString()); // TODO: type guard
            }
        } else {
            throw new _serviceClient.ResponseError(`There was an error reading pair record for device (udid: ${udid})`, resp);
        }
    }
}
exports.UsbmuxdClient = UsbmuxdClient;
function htons(n) {
    return (n & 255) << 8 | n >> 8 & 255;
}

//# sourceMappingURL=UsbmuxdClient.js.map