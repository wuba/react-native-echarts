"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _debug = _interopRequireDefault(require("debug"));
var path = _interopRequireWildcard(require("path"));
var _gdbprotocol = require("../protocol/GDBProtocol");
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
const debug = (0, _debug).default("expo:apple-device:client:debugserver");
class DebugserverClient extends _serviceClient.ServiceClient {
    constructor(socket){
        super(socket, new _gdbprotocol.GDBProtocolClient(socket));
        this.socket = socket;
    }
    async setMaxPacketSize(size) {
        return this.sendCommand("QSetMaxPacketSize:", [
            size.toString()
        ]);
    }
    async setWorkingDir(workingDir) {
        return this.sendCommand("QSetWorkingDir:", [
            workingDir
        ]);
    }
    async checkLaunchSuccess() {
        return this.sendCommand("qLaunchSuccess", []);
    }
    async attachByName(name) {
        const hexName = Buffer.from(name).toString("hex");
        return this.sendCommand(`vAttachName;${hexName}`, []);
    }
    async continue() {
        return this.sendCommand("c", []);
    }
    halt() {
        // ^C
        debug("Sending ^C to debugserver");
        return this.protocolClient.socket.write("\x03");
    }
    async kill() {
        debug(`kill`);
        const msg = {
            cmd: "k",
            args: []
        };
        return this.protocolClient.sendMessage(msg, (resp, resolve)=>{
            debug(`kill:response: ${resp}`);
            this.protocolClient.socket.write("+");
            const parts = resp.split(";");
            for (const part of parts){
                if (part.includes("description")) {
                    // description:{hex encoded message like: "Terminated with signal 9"}
                    resolve(Buffer.from(part.split(":")[1], "hex").toString("ascii"));
                }
            }
        });
    }
    // TODO support app args
    // https://sourceware.org/gdb/onlinedocs/gdb/Packets.html#Packets
    // A arglen,argnum,arg,
    async launchApp(appPath, executableName) {
        const fullPath = path.join(appPath, executableName);
        const hexAppPath = Buffer.from(fullPath).toString("hex");
        const appCommand = `A${hexAppPath.length},0,${hexAppPath}`;
        return this.sendCommand(appCommand, []);
    }
    async sendCommand(cmd, args) {
        const msg = {
            cmd,
            args
        };
        debug(`Sending command: ${cmd}, args: ${args}`);
        const resp = await this.protocolClient.sendMessage(msg);
        // we need to ACK as well
        this.protocolClient.socket.write("+");
        return resp;
    }
}
exports.DebugserverClient = DebugserverClient;

//# sourceMappingURL=DebugserverClient.js.map