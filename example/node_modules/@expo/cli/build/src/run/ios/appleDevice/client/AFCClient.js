"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _debug = _interopRequireDefault(require("debug"));
var fs = _interopRequireWildcard(require("fs"));
var path = _interopRequireWildcard(require("path"));
var _util = require("util");
var _errors = require("../../../../utils/errors");
var _afcprotocol = require("../protocol/AFCProtocol");
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
const debug = (0, _debug).default("expo:apple-device:client:afc");
const MAX_OPEN_FILES = 240;
class AFCClient extends _serviceClient.ServiceClient {
    constructor(socket){
        super(socket, new _afcprotocol.AFCProtocolClient(socket));
        this.socket = socket;
    }
    async getFileInfo(path1) {
        debug(`getFileInfo: ${path1}`);
        const response = await this.protocolClient.sendMessage({
            operation: _afcprotocol.AFC_OPS.GET_FILE_INFO,
            data: toCString(path1)
        });
        debug(`getFileInfo:response: %O`, response);
        const strings = [];
        let currentString = "";
        const tokens = response.data;
        tokens.forEach((token)=>{
            if (token === 0) {
                strings.push(currentString);
                currentString = "";
            } else {
                currentString += String.fromCharCode(token);
            }
        });
        return strings;
    }
    async writeFile(fd, data) {
        debug(`writeFile: ${Array.prototype.toString.call(fd)} data size: ${data.length}`);
        const response = await this.protocolClient.sendMessage({
            operation: _afcprotocol.AFC_OPS.FILE_WRITE,
            data: fd,
            payload: data
        });
        debug(`writeFile:response:`, response);
        return response;
    }
    async openFile(path2) {
        debug(`openFile: ${path2}`);
        // mode + path + null terminator
        const data = Buffer.alloc(8 + path2.length + 1);
        // write mode
        data.writeUInt32LE(_afcprotocol.AFC_FILE_OPEN_FLAGS.WRONLY, 0);
        // then path to file
        toCString(path2).copy(data, 8);
        const response = await this.protocolClient.sendMessage({
            operation: _afcprotocol.AFC_OPS.FILE_OPEN,
            data
        });
        // debug(`openFile:response:`, response);
        if (response.operation === _afcprotocol.AFC_OPS.FILE_OPEN_RES) {
            return response.data;
        }
        throw new _errors.CommandError("APPLE_DEVICE_AFC", `There was an unknown error opening file ${path2}, response: ${Array.prototype.toString.call(response.data)}`);
    }
    async closeFile(fd) {
        debug(`closeFile fd: ${Array.prototype.toString.call(fd)}`);
        const response = await this.protocolClient.sendMessage({
            operation: _afcprotocol.AFC_OPS.FILE_CLOSE,
            data: fd
        });
        debug(`closeFile:response:`, response);
        return response;
    }
    async uploadFile(srcPath, destPath) {
        debug(`uploadFile: ${srcPath}, ${destPath}`);
        // read local file and get fd of destination
        const [srcFile, destFile] = await Promise.all([
            await (0, _util).promisify(fs.readFile)(srcPath),
            await this.openFile(destPath), 
        ]);
        try {
            await this.writeFile(destFile, srcFile);
            await this.closeFile(destFile);
        } catch (err) {
            await this.closeFile(destFile);
            throw err;
        }
    }
    async makeDirectory(path3) {
        debug(`makeDirectory: ${path3}`);
        const response = await this.protocolClient.sendMessage({
            operation: _afcprotocol.AFC_OPS.MAKE_DIR,
            data: toCString(path3)
        });
        debug(`makeDirectory:response:`, response);
        return response;
    }
    async uploadDirectory(srcPath, destPath) {
        debug(`uploadDirectory: ${srcPath}`);
        await this.makeDirectory(destPath);
        // AFC doesn't seem to give out more than 240 file handles,
        // so we delay any requests that would push us over until more open up
        let numOpenFiles = 0;
        const pendingFileUploads = [];
        const _this = this;
        return uploadDir(srcPath);
        async function uploadDir(dirPath) {
            const promises = [];
            for (const file of fs.readdirSync(dirPath)){
                const filePath = path.join(dirPath, file);
                const remotePath = path.join(destPath, path.relative(srcPath, filePath));
                if (fs.lstatSync(filePath).isDirectory()) {
                    promises.push(_this.makeDirectory(remotePath).then(()=>uploadDir(filePath)
                    ));
                } else {
                    // Create promise to add to promises array
                    // this way it can be resolved once a pending upload has finished
                    let resolve;
                    let reject;
                    const promise = new Promise((res, rej)=>{
                        resolve = res;
                        reject = rej;
                    });
                    promises.push(promise);
                    // wrap upload in a function in case we need to save it for later
                    const uploadFile = (tries = 0)=>{
                        numOpenFiles++;
                        _this.uploadFile(filePath, remotePath).then(()=>{
                            resolve();
                            numOpenFiles--;
                            const fn = pendingFileUploads.pop();
                            if (fn) {
                                fn();
                            }
                        }).catch((err)=>{
                            // Couldn't get fd for whatever reason, try again
                            // # of retries is arbitrary and can be adjusted
                            if (err.status === _afcprotocol.AFC_STATUS.NO_RESOURCES && tries < 10) {
                                debug(`Received NO_RESOURCES from AFC, retrying ${filePath} upload. ${tries}`);
                                uploadFile(tries++);
                            } else {
                                numOpenFiles--;
                                reject(err);
                            }
                        });
                    };
                    if (numOpenFiles < MAX_OPEN_FILES) {
                        uploadFile();
                    } else {
                        debug(`numOpenFiles >= ${MAX_OPEN_FILES}, adding to pending queue. Length: ${pendingFileUploads.length}`);
                        pendingFileUploads.push(uploadFile);
                    }
                }
            }
            await Promise.all(promises);
        }
    }
}
exports.AFCClient = AFCClient;
function toCString(s) {
    const buf = Buffer.alloc(s.length + 1);
    const len = buf.write(s);
    buf.writeUInt8(0, len);
    return buf;
}

//# sourceMappingURL=AFCClient.js.map