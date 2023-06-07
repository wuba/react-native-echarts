"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _plist = _interopRequireDefault(require("@expo/plist"));
var _debug = _interopRequireDefault(require("debug"));
var _errors = require("../../../../utils/errors");
var _plist1 = require("../../../../utils/plist");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const BPLIST_MAGIC = Buffer.from("bplist00");
const debug = (0, _debug).default("expo:apple-device:protocol");
class ProtocolClientError extends _errors.CommandError {
    constructor(msg, error, protocolMessage){
        super(msg);
        this.error = error;
        this.protocolMessage = protocolMessage;
    }
}
exports.ProtocolClientError = ProtocolClientError;
class ProtocolReaderFactory {
    constructor(ProtocolReader1){
        this.ProtocolReader = ProtocolReader1;
    }
    create(callback) {
        return new this.ProtocolReader(callback);
    }
}
exports.ProtocolReaderFactory = ProtocolReaderFactory;
class ProtocolReader {
    constructor(headerSize, callback){
        this.headerSize = headerSize;
        this.callback = callback;
        this.buffer = Buffer.alloc(0);
        this.onData = this.onData.bind(this);
    }
    onData(data) {
        try {
            // if there's data, add it on to existing buffer
            this.buffer = data ? Buffer.concat([
                this.buffer,
                data
            ]) : this.buffer;
            // we haven't gotten the body length from the header yet
            if (!this.bodyLength) {
                if (this.buffer.length < this.headerSize) {
                    // partial header, wait for rest
                    return;
                }
                this.bodyLength = this.parseHeader(this.buffer);
                // move on to body
                this.buffer = this.buffer.slice(this.headerSize);
                if (!this.buffer.length) {
                    // only got header, wait for body
                    return;
                }
            }
            if (this.buffer.length < this.bodyLength) {
                // wait for rest of body
                return;
            }
            if (this.bodyLength === -1) {
                this.callback(this.parseBody(this.buffer));
                this.buffer = Buffer.alloc(0);
            } else {
                this.body = this.buffer.slice(0, this.bodyLength);
                this.bodyLength -= this.body.length;
                if (!this.bodyLength) {
                    this.callback(this.parseBody(this.body));
                }
                this.buffer = this.buffer.slice(this.body.length);
                // There are multiple messages here, call parse again
                if (this.buffer.length) {
                    this.onData();
                }
            }
        } catch (err) {
            this.callback(null, err);
        }
    }
}
exports.ProtocolReader = ProtocolReader;
class PlistProtocolReader extends ProtocolReader {
    parseBody(body) {
        if (BPLIST_MAGIC.compare(body, 0, 8) === 0) {
            return (0, _plist1).parsePlistBuffer(body);
        } else {
            return _plist.default.parse(body.toString("utf8"));
        }
    }
}
exports.PlistProtocolReader = PlistProtocolReader;
class ProtocolClient {
    constructor(socket, readerFactory, writer){
        this.socket = socket;
        this.readerFactory = readerFactory;
        this.writer = writer;
    }
    sendMessage(msg, callback) {
        const onError = (error)=>{
            debug("Unexpected protocol socket error encountered: %s", error);
            throw new ProtocolClientError(`Unexpected protocol error encountered: ${error.message}`, error, msg);
        };
        return new Promise((resolve, reject)=>{
            const reader = this.readerFactory.create(async (response, error)=>{
                if (error) {
                    reject(error);
                    return;
                }
                if (callback) {
                    callback(response, (value)=>{
                        this.socket.removeListener("data", reader.onData);
                        this.socket.removeListener("error", onError);
                        resolve(value);
                    }, reject);
                } else {
                    this.socket.removeListener("data", reader.onData);
                    this.socket.removeListener("error", onError);
                    resolve(response);
                }
            });
            this.socket.on("data", reader.onData);
            this.socket.on("error", onError);
            this.writer.write(this.socket, msg);
        });
    }
}
exports.ProtocolClient = ProtocolClient;

//# sourceMappingURL=AbstractProtocol.js.map