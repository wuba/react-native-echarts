"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AFC_FILE_OPEN_FLAGS = exports.AFC_STATUS = exports.AFC_OPS = exports.AFC_HEADER_SIZE = exports.AFC_MAGIC = void 0;
var _debug = _interopRequireDefault(require("debug"));
var _errors = require("../../../../utils/errors");
var _abstractProtocol = require("./AbstractProtocol");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = (0, _debug).default("expo:apple-device:protocol:afc");
const AFC_MAGIC = "CFA6LPAA";
exports.AFC_MAGIC = AFC_MAGIC;
const AFC_HEADER_SIZE = 40;
exports.AFC_HEADER_SIZE = AFC_HEADER_SIZE;
var AFC_OPS;
exports.AFC_OPS = AFC_OPS;
(function(AFC_OPS) {
    AFC_OPS[AFC_OPS[/**
   * Invalid
   */ "INVALID"] = 0] = "INVALID";
    AFC_OPS[AFC_OPS[/**
   * Status
   */ "STATUS"] = 1] = "STATUS";
    AFC_OPS[AFC_OPS[/**
   * Data
   */ "DATA"] = 2] = "DATA";
    AFC_OPS[AFC_OPS[/**
   * ReadDir
   */ "READ_DIR"] = 3] = "READ_DIR";
    AFC_OPS[AFC_OPS[/**
   * ReadFile
   */ "READ_FILE"] = 4] = "READ_FILE";
    AFC_OPS[AFC_OPS[/**
   * WriteFile
   */ "WRITE_FILE"] = 5] = "WRITE_FILE";
    AFC_OPS[AFC_OPS[/**
   * WritePart
   */ "WRITE_PART"] = 6] = "WRITE_PART";
    AFC_OPS[AFC_OPS[/**
   * TruncateFile
   */ "TRUNCATE"] = 7] = "TRUNCATE";
    AFC_OPS[AFC_OPS[/**
   * RemovePath
   */ "REMOVE_PATH"] = 8] = "REMOVE_PATH";
    AFC_OPS[AFC_OPS[/**
   * MakeDir
   */ "MAKE_DIR"] = 9] = "MAKE_DIR";
    AFC_OPS[AFC_OPS[/**
   * GetFileInfo
   */ "GET_FILE_INFO"] = 10] = "GET_FILE_INFO";
    AFC_OPS[AFC_OPS[/**
   * GetDeviceInfo
   */ "GET_DEVINFO"] = 11] = "GET_DEVINFO";
    AFC_OPS[AFC_OPS[/**
   * WriteFileAtomic (tmp file+rename)
   */ "WRITE_FILE_ATOM"] = 12] = "WRITE_FILE_ATOM";
    AFC_OPS[AFC_OPS[/**
   * FileRefOpen
   */ "FILE_OPEN"] = 13] = "FILE_OPEN";
    AFC_OPS[AFC_OPS[/**
   * FileRefOpenResult
   */ "FILE_OPEN_RES"] = 14] = "FILE_OPEN_RES";
    AFC_OPS[AFC_OPS[/**
   * FileRefRead
   */ "FILE_READ"] = 15] = "FILE_READ";
    AFC_OPS[AFC_OPS[/**
   * FileRefWrite
   */ "FILE_WRITE"] = 16] = "FILE_WRITE";
    AFC_OPS[AFC_OPS[/**
   * FileRefSeek
   */ "FILE_SEEK"] = 17] = "FILE_SEEK";
    AFC_OPS[AFC_OPS[/**
   * FileRefTell
   */ "FILE_TELL"] = 18] = "FILE_TELL";
    AFC_OPS[AFC_OPS[/**
   * FileRefTellResult
   */ "FILE_TELL_RES"] = 19] = "FILE_TELL_RES";
    AFC_OPS[AFC_OPS[/**
   * FileRefClose
   */ "FILE_CLOSE"] = 20] = "FILE_CLOSE";
    AFC_OPS[AFC_OPS[/**
   * FileRefSetFileSize (ftruncate)
   */ "FILE_SET_SIZE"] = 21] = "FILE_SET_SIZE";
    AFC_OPS[AFC_OPS[/**
   * GetConnectionInfo
   */ "GET_CON_INFO"] = 22] = "GET_CON_INFO";
    AFC_OPS[AFC_OPS[/**
   * SetConnectionOptions
   */ "SET_CON_OPTIONS"] = 23] = "SET_CON_OPTIONS";
    AFC_OPS[AFC_OPS[/**
   * RenamePath
   */ "RENAME_PATH"] = 24] = "RENAME_PATH";
    AFC_OPS[AFC_OPS[/**
   * SetFSBlockSize (0x800000)
   */ "SET_FS_BS"] = 25] = "SET_FS_BS";
    AFC_OPS[AFC_OPS[/**
   * SetSocketBlockSize (0x800000)
   */ "SET_SOCKET_BS"] = 26] = "SET_SOCKET_BS";
    AFC_OPS[AFC_OPS[/**
   * FileRefLock
   */ "FILE_LOCK"] = 27] = "FILE_LOCK";
    AFC_OPS[AFC_OPS[/**
   * MakeLink
   */ "MAKE_LINK"] = 28] = "MAKE_LINK";
    AFC_OPS[AFC_OPS[/**
   * GetFileHash
   */ "GET_FILE_HASH"] = 29] = "GET_FILE_HASH";
    AFC_OPS[AFC_OPS[/**
   * SetModTime
   */ "SET_FILE_MOD_TIME"] = 30] = "SET_FILE_MOD_TIME";
    AFC_OPS[AFC_OPS[/**
   * GetFileHashWithRange
   */ "GET_FILE_HASH_RANGE"] = 31] = "GET_FILE_HASH_RANGE";
    AFC_OPS[AFC_OPS[// iOS 6+
    /**
   * FileRefSetImmutableHint
   */ "FILE_SET_IMMUTABLE_HINT"] = 32] = "FILE_SET_IMMUTABLE_HINT";
    AFC_OPS[AFC_OPS[/**
   * GetSizeOfPathContents
   */ "GET_SIZE_OF_PATH_CONTENTS"] = 33] = "GET_SIZE_OF_PATH_CONTENTS";
    AFC_OPS[AFC_OPS[/**
   * RemovePathAndContents
   */ "REMOVE_PATH_AND_CONTENTS"] = 34] = "REMOVE_PATH_AND_CONTENTS";
    AFC_OPS[AFC_OPS[/**
   * DirectoryEnumeratorRefOpen
   */ "DIR_OPEN"] = 35] = "DIR_OPEN";
    AFC_OPS[AFC_OPS[/**
   * DirectoryEnumeratorRefOpenResult
   */ "DIR_OPEN_RESULT"] = 36] = "DIR_OPEN_RESULT";
    AFC_OPS[AFC_OPS[/**
   * DirectoryEnumeratorRefRead
   */ "DIR_READ"] = 37] = "DIR_READ";
    AFC_OPS[AFC_OPS[/**
   * DirectoryEnumeratorRefClose
   */ "DIR_CLOSE"] = 38] = "DIR_CLOSE";
    AFC_OPS[AFC_OPS[// iOS 7+
    /**
   * FileRefReadWithOffset
   */ "FILE_READ_OFFSET"] = 39] = "FILE_READ_OFFSET";
    AFC_OPS[AFC_OPS[/**
   * FileRefWriteWithOffset
   */ "FILE_WRITE_OFFSET"] = 40] = "FILE_WRITE_OFFSET";
})(AFC_OPS || (exports.AFC_OPS = AFC_OPS = {}));
var AFC_STATUS;
exports.AFC_STATUS = AFC_STATUS;
(function(AFC_STATUS) {
    AFC_STATUS[AFC_STATUS["SUCCESS"] = 0] = "SUCCESS";
    AFC_STATUS[AFC_STATUS["UNKNOWN_ERROR"] = 1] = "UNKNOWN_ERROR";
    AFC_STATUS[AFC_STATUS["OP_HEADER_INVALID"] = 2] = "OP_HEADER_INVALID";
    AFC_STATUS[AFC_STATUS["NO_RESOURCES"] = 3] = "NO_RESOURCES";
    AFC_STATUS[AFC_STATUS["READ_ERROR"] = 4] = "READ_ERROR";
    AFC_STATUS[AFC_STATUS["WRITE_ERROR"] = 5] = "WRITE_ERROR";
    AFC_STATUS[AFC_STATUS["UNKNOWN_PACKET_TYPE"] = 6] = "UNKNOWN_PACKET_TYPE";
    AFC_STATUS[AFC_STATUS["INVALID_ARG"] = 7] = "INVALID_ARG";
    AFC_STATUS[AFC_STATUS["OBJECT_NOT_FOUND"] = 8] = "OBJECT_NOT_FOUND";
    AFC_STATUS[AFC_STATUS["OBJECT_IS_DIR"] = 9] = "OBJECT_IS_DIR";
    AFC_STATUS[AFC_STATUS["PERM_DENIED"] = 10] = "PERM_DENIED";
    AFC_STATUS[AFC_STATUS["SERVICE_NOT_CONNECTED"] = 11] = "SERVICE_NOT_CONNECTED";
    AFC_STATUS[AFC_STATUS["OP_TIMEOUT"] = 12] = "OP_TIMEOUT";
    AFC_STATUS[AFC_STATUS["TOO_MUCH_DATA"] = 13] = "TOO_MUCH_DATA";
    AFC_STATUS[AFC_STATUS["END_OF_DATA"] = 14] = "END_OF_DATA";
    AFC_STATUS[AFC_STATUS["OP_NOT_SUPPORTED"] = 15] = "OP_NOT_SUPPORTED";
    AFC_STATUS[AFC_STATUS["OBJECT_EXISTS"] = 16] = "OBJECT_EXISTS";
    AFC_STATUS[AFC_STATUS["OBJECT_BUSY"] = 17] = "OBJECT_BUSY";
    AFC_STATUS[AFC_STATUS["NO_SPACE_LEFT"] = 18] = "NO_SPACE_LEFT";
    AFC_STATUS[AFC_STATUS["OP_WOULD_BLOCK"] = 19] = "OP_WOULD_BLOCK";
    AFC_STATUS[AFC_STATUS["IO_ERROR"] = 20] = "IO_ERROR";
    AFC_STATUS[AFC_STATUS["OP_INTERRUPTED"] = 21] = "OP_INTERRUPTED";
    AFC_STATUS[AFC_STATUS["OP_IN_PROGRESS"] = 22] = "OP_IN_PROGRESS";
    AFC_STATUS[AFC_STATUS["INTERNAL_ERROR"] = 23] = "INTERNAL_ERROR";
    AFC_STATUS[AFC_STATUS["MUX_ERROR"] = 30] = "MUX_ERROR";
    AFC_STATUS[AFC_STATUS["NO_MEM"] = 31] = "NO_MEM";
    AFC_STATUS[AFC_STATUS["NOT_ENOUGH_DATA"] = 32] = "NOT_ENOUGH_DATA";
    AFC_STATUS[AFC_STATUS["DIR_NOT_EMPTY"] = 33] = "DIR_NOT_EMPTY";
    AFC_STATUS[AFC_STATUS["FORCE_SIGNED_TYPE"] = -1] = "FORCE_SIGNED_TYPE";
})(AFC_STATUS || (exports.AFC_STATUS = AFC_STATUS = {}));
var AFC_FILE_OPEN_FLAGS;
exports.AFC_FILE_OPEN_FLAGS = AFC_FILE_OPEN_FLAGS;
(function(AFC_FILE_OPEN_FLAGS) {
    AFC_FILE_OPEN_FLAGS[AFC_FILE_OPEN_FLAGS[/**
   * r (O_RDONLY)
   */ "RDONLY"] = 1] = "RDONLY";
    AFC_FILE_OPEN_FLAGS[AFC_FILE_OPEN_FLAGS[/**
   * r+ (O_RDWR | O_CREAT)
   */ "RW"] = 2] = "RW";
    AFC_FILE_OPEN_FLAGS[AFC_FILE_OPEN_FLAGS[/**
   * w (O_WRONLY | O_CREAT | O_TRUNC)
   */ "WRONLY"] = 3] = "WRONLY";
    AFC_FILE_OPEN_FLAGS[AFC_FILE_OPEN_FLAGS[/**
   * w+ (O_RDWR | O_CREAT  | O_TRUNC)
   */ "WR"] = 4] = "WR";
    AFC_FILE_OPEN_FLAGS[AFC_FILE_OPEN_FLAGS[/**
   * a (O_WRONLY | O_APPEND | O_CREAT)
   */ "APPEND"] = 5] = "APPEND";
    AFC_FILE_OPEN_FLAGS[AFC_FILE_OPEN_FLAGS[/**
   * a+ (O_RDWR | O_APPEND | O_CREAT)
   */ "RDAPPEND"] = 6] = "RDAPPEND";
})(AFC_FILE_OPEN_FLAGS || (exports.AFC_FILE_OPEN_FLAGS = AFC_FILE_OPEN_FLAGS = {}));
function isAFCResponse(resp) {
    return AFC_OPS[resp.operation] !== undefined && resp.id !== undefined && resp.data !== undefined;
}
function isStatusResponse(resp) {
    return isAFCResponse(resp) && resp.operation === 1;
}
function isErrorStatusResponse(resp) {
    return isStatusResponse(resp) && resp.data !== 0;
}
class AFCInternalError extends Error {
    constructor(msg, requestId){
        super(msg);
        this.requestId = requestId;
    }
}
class AFCError extends Error {
    constructor(msg, status){
        super(msg);
        this.status = status;
    }
}
exports.AFCError = AFCError;
class AFCProtocolClient extends _abstractProtocol.ProtocolClient {
    requestId = 0;
    requestCallbacks = {};
    constructor(socket){
        super(socket, new _abstractProtocol.ProtocolReaderFactory(AFCProtocolReader), new AFCProtocolWriter());
        const reader = this.readerFactory.create((resp, err)=>{
            if (err && err instanceof AFCInternalError) {
                this.requestCallbacks[err.requestId](resp, err);
            } else if (isErrorStatusResponse(resp)) {
                this.requestCallbacks[resp.id](resp, new AFCError(AFC_STATUS[resp.data], resp.data));
            } else {
                this.requestCallbacks[resp.id](resp);
            }
        });
        socket.on("data", reader.onData);
    }
    sendMessage(msg) {
        return new Promise((resolve, reject)=>{
            const requestId = this.requestId++;
            this.requestCallbacks[requestId] = async (resp, err)=>{
                if (err) {
                    reject(err);
                    return;
                }
                if (isAFCResponse(resp)) {
                    resolve(resp);
                } else {
                    reject(new _errors.CommandError("APPLE_DEVICE_AFC", "Malformed AFC response"));
                }
            };
            this.writer.write(this.socket, {
                ...msg,
                requestId
            });
        });
    }
}
exports.AFCProtocolClient = AFCProtocolClient;
class AFCProtocolReader extends _abstractProtocol.ProtocolReader {
    constructor(callback){
        super(AFC_HEADER_SIZE, callback);
    }
    parseHeader(data) {
        const magic = data.slice(0, 8).toString("ascii");
        if (magic !== AFC_MAGIC) {
            throw new AFCInternalError(`Invalid AFC packet received (magic != ${AFC_MAGIC})`, data.readUInt32LE(24));
        }
        // technically these are uint64
        this.header = {
            magic,
            totalLength: data.readUInt32LE(8),
            headerLength: data.readUInt32LE(16),
            requestId: data.readUInt32LE(24),
            operation: data.readUInt32LE(32)
        };
        debug(`parse header: ${JSON.stringify(this.header)}`);
        if (this.header.headerLength < AFC_HEADER_SIZE) {
            throw new AFCInternalError("Invalid AFC header", this.header.requestId);
        }
        return this.header.totalLength - AFC_HEADER_SIZE;
    }
    parseBody(data) {
        const body = {
            operation: this.header.operation,
            id: this.header.requestId,
            data
        };
        if (isStatusResponse(body)) {
            const status = data.readUInt32LE(0);
            debug(`${AFC_OPS[this.header.operation]} response: ${AFC_STATUS[status]}`);
            body.data = status;
        } else if (data.length <= 8) {
            debug(`${AFC_OPS[this.header.operation]} response: ${Array.prototype.toString.call(body)}`);
        } else {
            debug(`${AFC_OPS[this.header.operation]} response length: ${data.length} bytes`);
        }
        return body;
    }
}
exports.AFCProtocolReader = AFCProtocolReader;
class AFCProtocolWriter {
    write(socket, msg) {
        const { data , payload , operation , requestId  } = msg;
        const dataLength = data ? data.length : 0;
        const payloadLength = payload ? payload.length : 0;
        const header = Buffer.alloc(AFC_HEADER_SIZE);
        const magic = Buffer.from(AFC_MAGIC);
        magic.copy(header);
        header.writeUInt32LE(AFC_HEADER_SIZE + dataLength + payloadLength, 8);
        header.writeUInt32LE(AFC_HEADER_SIZE + dataLength, 16);
        header.writeUInt32LE(requestId, 24);
        header.writeUInt32LE(operation, 32);
        socket.write(header);
        socket.write(data);
        if (data.length <= 8) {
            debug(`socket write, header: { requestId: ${requestId}, operation: ${AFC_OPS[operation]}}, body: ${Array.prototype.toString.call(data)}`);
        } else {
            debug(`socket write, header: { requestId: ${requestId}, operation: ${AFC_OPS[operation]}}, body: ${data.length} bytes`);
        }
        debug(`socket write, bytes written ${header.length} (header), ${data.length} (body)`);
        if (payload) {
            socket.write(payload);
        }
    }
}
exports.AFCProtocolWriter = AFCProtocolWriter;

//# sourceMappingURL=AFCProtocol.js.map