"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveGoogleServicesFile = resolveGoogleServicesFile;
exports.getAssetFieldPathsForManifestAsync = getAssetFieldPathsForManifestAsync;
exports.resolveManifestAssets = resolveManifestAssets;
var _promises = _interopRequireDefault(require("fs/promises"));
var _path = _interopRequireDefault(require("path"));
var _getExpoSchema = require("../../../api/getExpoSchema");
var Log = _interopRequireWildcard(require("../../../log"));
var _dir = require("../../../utils/dir");
var _errors = require("../../../utils/errors");
var _obj = require("../../../utils/obj");
var _url = require("../../../utils/url");
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
async function resolveGoogleServicesFile(projectRoot, manifest) {
    var ref, ref1;
    if ((ref = manifest.android) == null ? void 0 : ref.googleServicesFile) {
        try {
            const contents = await _promises.default.readFile(_path.default.resolve(projectRoot, manifest.android.googleServicesFile), "utf8");
            manifest.android.googleServicesFile = contents;
        } catch  {
            Log.warn(`Could not parse Expo config: android.googleServicesFile: "${manifest.android.googleServicesFile}"`);
            // Delete the field so Expo Go doesn't attempt to read it.
            delete manifest.android.googleServicesFile;
        }
    }
    if ((ref1 = manifest.ios) == null ? void 0 : ref1.googleServicesFile) {
        try {
            const contents = await _promises.default.readFile(_path.default.resolve(projectRoot, manifest.ios.googleServicesFile), "base64");
            manifest.ios.googleServicesFile = contents;
        } catch  {
            Log.warn(`Could not parse Expo config: ios.googleServicesFile: "${manifest.ios.googleServicesFile}"`);
            // Delete the field so Expo Go doesn't attempt to read it.
            delete manifest.ios.googleServicesFile;
        }
    }
    return manifest;
}
async function getAssetFieldPathsForManifestAsync(manifest) {
    // String array like ["icon", "notification.icon", "loading.icon", "loading.backgroundImage", "ios.icon", ...]
    const sdkAssetFieldPaths = await (0, _getExpoSchema).getAssetSchemasAsync(manifest.sdkVersion);
    return sdkAssetFieldPaths.filter((assetSchema)=>(0, _obj).get(manifest, assetSchema)
    );
}
async function resolveManifestAssets(projectRoot, { manifest , resolver , strict  }) {
    try {
        // Asset fields that the user has set like ["icon", "splash.image"]
        const assetSchemas = await getAssetFieldPathsForManifestAsync(manifest);
        // Get the URLs
        const urls = await Promise.all(assetSchemas.map(async (manifestField)=>{
            const pathOrURL = (0, _obj).get(manifest, manifestField);
            // URL
            if ((0, _url).validateUrl(pathOrURL, {
                requireProtocol: true
            })) {
                return pathOrURL;
            }
            // File path
            if (await (0, _dir).fileExistsAsync(_path.default.resolve(projectRoot, pathOrURL))) {
                return await resolver(pathOrURL);
            }
            // Unknown
            const err = new _errors.CommandError("MANIFEST_ASSET", "Could not resolve local asset: " + pathOrURL);
            err.localAssetPath = pathOrURL;
            err.manifestField = manifestField;
            throw err;
        }));
        // Set the corresponding URL fields
        assetSchemas.forEach((manifestField, index)=>(0, _obj).set(manifest, `${manifestField}Url`, urls[index])
        );
    } catch (error) {
        if (error.localAssetPath) {
            Log.warn(`Unable to resolve asset "${error.localAssetPath}" from "${error.manifestField}" in your app.json or app.config.js`);
        } else {
            Log.warn(`Warning: Unable to resolve manifest assets. Icons and fonts might not work. ${error.message}.`);
        }
        if (strict) {
            throw new _errors.CommandError("MANIFEST_ASSET", "Failed to export manifest assets: " + error.message);
        }
    }
}

//# sourceMappingURL=resolveAssets.js.map