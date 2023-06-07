"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _debug = _interopRequireDefault(require("debug"));
var fs = _interopRequireWildcard(require("fs"));
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
const debug = (0, _debug).default("expo:apple-device:client:mobile_image_mounter");
function isMIMUploadCompleteResponse(resp) {
    return resp.Status === "Complete";
}
function isMIMUploadReceiveBytesResponse(resp) {
    return resp.Status === "ReceiveBytesAck";
}
class MobileImageMounterClient extends _serviceClient.ServiceClient {
    constructor(socket){
        super(socket, new _lockdownProtocol.LockdownProtocolClient(socket));
    }
    async mountImage(imagePath, imageSig) {
        debug(`mountImage: ${imagePath}`);
        const resp = await this.protocolClient.sendMessage({
            Command: "MountImage",
            ImagePath: imagePath,
            ImageSignature: imageSig,
            ImageType: "Developer"
        });
        if (!(0, _lockdownProtocol).isLockdownResponse(resp) || resp.Status !== "Complete") {
            throw new _serviceClient.ResponseError(`There was an error mounting ${imagePath} on device`, resp);
        }
    }
    async uploadImage(imagePath, imageSig) {
        debug(`uploadImage: ${imagePath}`);
        const imageSize = fs.statSync(imagePath).size;
        return this.protocolClient.sendMessage({
            Command: "ReceiveBytes",
            ImageSize: imageSize,
            ImageSignature: imageSig,
            ImageType: "Developer"
        }, (resp, resolve, reject)=>{
            if (isMIMUploadReceiveBytesResponse(resp)) {
                const imageStream = fs.createReadStream(imagePath);
                imageStream.pipe(this.protocolClient.socket, {
                    end: false
                });
                imageStream.on("error", (err)=>reject(err)
                );
            } else if (isMIMUploadCompleteResponse(resp)) {
                resolve();
            } else {
                reject(new _serviceClient.ResponseError(`There was an error uploading image ${imagePath} to the device`, resp));
            }
        });
    }
    async lookupImage() {
        debug("lookupImage");
        return this.protocolClient.sendMessage({
            Command: "LookupImage",
            ImageType: "Developer"
        });
    }
}
exports.MobileImageMounterClient = MobileImageMounterClient;

//# sourceMappingURL=MobileImageMounterClient.js.map