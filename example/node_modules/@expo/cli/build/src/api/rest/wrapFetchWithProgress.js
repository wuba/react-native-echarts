"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.wrapFetchWithProgress = wrapFetchWithProgress;
var Log = _interopRequireWildcard(require("../../log"));
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
const debug = require("debug")("expo:api:fetch:progress");
function wrapFetchWithProgress(fetch) {
    return (url, init)=>{
        return fetch(url, init).then((res)=>{
            if (res.ok && (init == null ? void 0 : init.onProgress)) {
                const totalDownloadSize = res.headers.get("Content-Length");
                const total = Number(totalDownloadSize);
                debug(`Download size: ${totalDownloadSize}`);
                if (!totalDownloadSize || isNaN(total) || total < 0) {
                    Log.warn('Progress callback not supported for network request because "Content-Length" header missing or invalid in response from URL:', url.toString());
                    return res;
                }
                let length = 0;
                debug(`Starting progress animation for ${url}`);
                res.body.on("data", (chunk)=>{
                    length += Buffer.byteLength(chunk);
                    onProgress();
                });
                res.body.on("end", ()=>{
                    debug(`Finished progress animation for ${url}`);
                    onProgress();
                });
                const onProgress = ()=>{
                    const progress = length / total || 0;
                    init.onProgress == null ? void 0 : init.onProgress({
                        progress,
                        total,
                        loaded: length
                    });
                };
            }
            return res;
        });
    };
}

//# sourceMappingURL=wrapFetchWithProgress.js.map