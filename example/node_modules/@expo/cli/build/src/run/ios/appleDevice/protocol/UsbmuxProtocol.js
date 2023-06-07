"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.USBMUXD_HEADER_SIZE = void 0;
var _plist = _interopRequireDefault(require("@expo/plist"));
var _debug = _interopRequireDefault(require("debug"));
var _abstractProtocol = require("./AbstractProtocol");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = (0, _debug).default("expo:apple-device:protocol:usbmux");
const USBMUXD_HEADER_SIZE = 16;
exports.USBMUXD_HEADER_SIZE = USBMUXD_HEADER_SIZE;
class UsbmuxProtocolClient extends _abstractProtocol.ProtocolClient {
    constructor(socket){
        super(socket, new _abstractProtocol.ProtocolReaderFactory(UsbmuxProtocolReader), new UsbmuxProtocolWriter());
    }
}
exports.UsbmuxProtocolClient = UsbmuxProtocolClient;
class UsbmuxProtocolReader extends _abstractProtocol.PlistProtocolReader {
    constructor(callback){
        super(USBMUXD_HEADER_SIZE, callback);
    }
    parseHeader(data) {
        return data.readUInt32LE(0) - USBMUXD_HEADER_SIZE;
    }
    parseBody(data) {
        const resp = super.parseBody(data);
        debug(`Response: ${JSON.stringify(resp)}`);
        return resp;
    }
}
exports.UsbmuxProtocolReader = UsbmuxProtocolReader;
class UsbmuxProtocolWriter {
    useTag = 0;
    write(socket, msg) {
        // TODO Usbmux message type
        debug(`socket write: ${JSON.stringify(msg)}`);
        const { messageType , extraFields  } = msg;
        const plistMessage = _plist.default.build({
            BundleID: "dev.expo.native-run",
            ClientVersionString: "usbmux.js",
            MessageType: messageType,
            ProgName: "native-run",
            kLibUSBMuxVersion: 3,
            ...extraFields
        });
        const dataSize = plistMessage ? plistMessage.length : 0;
        const protocolVersion = 1;
        const messageCode = 8;
        const header = Buffer.alloc(USBMUXD_HEADER_SIZE);
        header.writeUInt32LE(USBMUXD_HEADER_SIZE + dataSize, 0);
        header.writeUInt32LE(protocolVersion, 4);
        header.writeUInt32LE(messageCode, 8);
        header.writeUInt32LE(this.useTag++, 12); // TODO
        socket.write(header);
        socket.write(plistMessage);
    }
}
exports.UsbmuxProtocolWriter = UsbmuxProtocolWriter;

//# sourceMappingURL=UsbmuxProtocol.js.map