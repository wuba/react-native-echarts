"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createBundlesAsync = createBundlesAsync;
var _config = require("@expo/config");
var Log = _interopRequireWildcard(require("../log"));
var _resolveEntryPoint = require("../start/server/middleware/resolveEntryPoint");
var _forkBundleAsync = require("./fork-bundleAsync");
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
async function createBundlesAsync(projectRoot, publishOptions = {}, bundleOptions) {
    const { exp  } = (0, _config).getConfig(projectRoot, {
        skipSDKVersionRequirement: true
    });
    const bundles = await (0, _forkBundleAsync).bundleAsync(projectRoot, exp, {
        // If not legacy, ignore the target option to prevent warnings from being thrown.
        resetCache: publishOptions.resetCache,
        maxWorkers: publishOptions.maxWorkers,
        logger: {
            info (tag, message) {
                Log.log(message);
            },
            error (tag, message) {
                Log.error(message);
            }
        },
        quiet: false
    }, bundleOptions.platforms.map((platform)=>({
            platform,
            entryPoint: (0, _resolveEntryPoint).resolveEntryPoint(projectRoot, platform),
            dev: bundleOptions.dev
        })
    ));
    // { ios: bundle, android: bundle }
    return bundleOptions.platforms.reduce((prev, platform, index)=>({
            ...prev,
            [platform]: bundles[index]
        })
    , {});
}

//# sourceMappingURL=createBundles.js.map