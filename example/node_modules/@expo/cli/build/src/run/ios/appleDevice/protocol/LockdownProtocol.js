"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isLockdownResponse = isLockdownResponse;
exports.isLockdownErrorResponse = isLockdownErrorResponse;
exports.LOCKDOWN_HEADER_SIZE = void 0;
var _plist = _interopRequireDefault(require("@expo/plist"));
var _debug = _interopRequireDefault(require("debug"));
var _errors = require("../../../../utils/errors");
var _abstractProtocol = require("./AbstractProtocol");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = (0, _debug).default("expo:apple-device:protocol:lockdown");
const LOCKDOWN_HEADER_SIZE = 4;
exports.LOCKDOWN_HEADER_SIZE = LOCKDOWN_HEADER_SIZE;
function isDefined(val) {
    return typeof val !== "undefined";
}
function isLockdownResponse(resp) {
    return isDefined(resp.Status);
}
function isLockdownErrorResponse(resp) {
    return isDefined(resp.Error);
}
class LockdownProtocolClient extends _abstractProtocol.ProtocolClient {
    constructor(socket){
        super(socket, new _abstractProtocol.ProtocolReaderFactory(LockdownProtocolReader), new LockdownProtocolWriter());
    }
}
exports.LockdownProtocolClient = LockdownProtocolClient;
class LockdownProtocolReader extends _abstractProtocol.PlistProtocolReader {
    constructor(callback){
        super(LOCKDOWN_HEADER_SIZE, callback);
    }
    parseHeader(data) {
        return data.readUInt32BE(0);
    }
    parseBody(data) {
        const resp = super.parseBody(data);
        debug(`Response: ${JSON.stringify(resp)}`);
        if (isLockdownErrorResponse(resp)) {
            if (resp.Error === "DeviceLocked") {
                throw new _errors.CommandError("APPLE_DEVICE_LOCKED", "Device is currently locked.");
            }
            if (resp.Error === "InvalidService") {
                let errorMessage = `${resp.Error}: ${resp.Service} (request: ${resp.Request})`;
                if (resp.Service === "com.apple.debugserver") {
                    errorMessage += "\nTry reconnecting your device. You can also debug service logs with `export DEBUG=expo:xdl:ios:*`";
                }
                throw new _errors.CommandError("APPLE_DEVICE_LOCKDOWN", errorMessage);
            }
            throw new _errors.CommandError("APPLE_DEVICE_LOCKDOWN", resp.Error);
        }
        return resp;
    }
}
exports.LockdownProtocolReader = LockdownProtocolReader;
class LockdownProtocolWriter {
    write(socket, plistData) {
        debug(`socket write: ${JSON.stringify(plistData)}`);
        const plistMessage = _plist.default.build(plistData);
        const header = Buffer.alloc(LOCKDOWN_HEADER_SIZE);
        header.writeUInt32BE(plistMessage.length, 0);
        socket.write(header);
        socket.write(plistMessage);
    }
}
exports.LockdownProtocolWriter = LockdownProtocolWriter;

//# sourceMappingURL=LockdownProtocol.js.map