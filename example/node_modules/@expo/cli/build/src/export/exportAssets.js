"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveAssetBundlePatternsAsync = resolveAssetBundlePatternsAsync;
exports.exportAssetsAsync = exportAssetsAsync;
var _minimatch = _interopRequireDefault(require("minimatch"));
var _path = _interopRequireDefault(require("path"));
var Log = _interopRequireWildcard(require("../log"));
var _resolveAssets = require("../start/server/middleware/resolveAssets");
var _array = require("../utils/array");
var _saveAssets = require("./saveAssets");
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
const debug = require("debug")("expo:export:exportAssets");
async function resolveAssetBundlePatternsAsync(projectRoot, exp, assets) {
    var ref1;
    if (!((ref1 = exp.assetBundlePatterns) == null ? void 0 : ref1.length) || !assets.length) {
        delete exp.assetBundlePatterns;
        return exp;
    }
    // Convert asset patterns to a list of asset strings that match them.
    // Assets strings are formatted as `asset_<hash>.<type>` and represent
    // the name that the file will have in the app bundle. The `asset_` prefix is
    // needed because android doesn't support assets that start with numbers.
    const fullPatterns = exp.assetBundlePatterns.map((p)=>_path.default.join(projectRoot, p)
    );
    logPatterns(fullPatterns);
    const allBundledAssets = assets.map((asset)=>{
        const shouldBundle = shouldBundleAsset(asset, fullPatterns);
        if (shouldBundle) {
            var ref;
            debug(`${shouldBundle ? "Include" : "Exclude"} asset ${(ref = asset.files) == null ? void 0 : ref[0]}`);
            return asset.fileHashes.map((hash)=>"asset_" + hash + ("type" in asset && asset.type ? "." + asset.type : "")
            );
        }
        return [];
    }).flat();
    // The assets returned by the RN packager has duplicates so make sure we
    // only bundle each once.
    exp.bundledAssets = [
        ...new Set(allBundledAssets)
    ];
    delete exp.assetBundlePatterns;
    return exp;
}
function logPatterns(patterns) {
    // Only log the patterns in debug mode, if they aren't already defined in the app.json, then all files will be targeted.
    Log.log("\nProcessing asset bundle patterns:");
    patterns.forEach((p)=>Log.log("- " + p)
    );
}
function shouldBundleAsset(asset, patterns) {
    var ref;
    const file = (ref = asset.files) == null ? void 0 : ref[0];
    return !!("__packager_asset" in asset && asset.__packager_asset && file && patterns.some((pattern)=>(0, _minimatch).default(file, pattern)
    ));
}
async function exportAssetsAsync(projectRoot, { exp , outputDir , bundles  }) {
    var ref;
    const assets = (0, _array).uniqBy(Object.values(bundles).flatMap((bundle)=>bundle.assets
    ), (asset)=>asset.hash
    );
    if ((ref = assets[0]) == null ? void 0 : ref.fileHashes) {
        Log.log("Saving assets");
        await (0, _saveAssets).saveAssetsAsync(projectRoot, {
            assets,
            outputDir
        });
    }
    // Add google services file if it exists
    await (0, _resolveAssets).resolveGoogleServicesFile(projectRoot, exp);
    // Updates the manifest to reflect additional asset bundling + configs
    await resolveAssetBundlePatternsAsync(projectRoot, exp, assets);
    return {
        exp,
        assets
    };
}

//# sourceMappingURL=exportAssets.js.map