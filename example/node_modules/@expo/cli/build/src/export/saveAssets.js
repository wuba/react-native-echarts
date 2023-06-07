"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.saveAssetsAsync = saveAssetsAsync;
var _path = _interopRequireDefault(require("path"));
var Log = _interopRequireWildcard(require("../log"));
var _array = require("../utils/array");
var _dir = require("../utils/dir");
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
const debug = require("debug")("expo:export:saveAssets");
function logAssetTask(projectRoot, action, pathName) {
    debug(`${action} ${pathName}`);
    const relativePath = pathName.replace(projectRoot, "");
    Log.log(`${action} ${relativePath}`);
}
function collectAssetPaths(assets) {
    // Collect paths by key, also effectively handles duplicates in the array
    const paths = {};
    assets.forEach((asset)=>{
        asset.files.forEach((path, index)=>{
            paths[asset.fileHashes[index]] = path;
        });
    });
    return paths;
}
async function saveAssetsAsync(projectRoot, { assets , outputDir  }) {
    // Collect paths by key, also effectively handles duplicates in the array
    const paths = collectAssetPaths(assets);
    // save files one chunk at a time
    for (const keys of (0, _array).chunk(Object.entries(paths), 5)){
        await Promise.all(keys.map(([key, pathName])=>{
            logAssetTask(projectRoot, "saving", pathName);
            // copy file over to assetPath
            return (0, _dir).copyAsync(pathName, _path.default.join(outputDir, "assets", key));
        }));
    }
    Log.log("Files successfully saved.");
}

//# sourceMappingURL=saveAssets.js.map