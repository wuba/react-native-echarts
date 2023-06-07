"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getVersionedNativeModulesAsync = getVersionedNativeModulesAsync;
var _jsonFile = _interopRequireDefault(require("@expo/json-file"));
var _chalk = _interopRequireDefault(require("chalk"));
var _resolveFrom = _interopRequireDefault(require("resolve-from"));
var _getNativeModuleVersions = require("../../../api/getNativeModuleVersions");
var _settings = require("../../../api/settings");
var Log = _interopRequireWildcard(require("../../../log"));
var _errors = require("../../../utils/errors");
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
const debug = require("debug")("expo:doctor:dependencies:bundledNativeModules");
async function getVersionedNativeModulesAsync(projectRoot, sdkVersion) {
    if (sdkVersion !== "UNVERSIONED" && !_settings.APISettings.isOffline) {
        try {
            debug("Fetching bundled native modules from the server...");
            return await (0, _getNativeModuleVersions).getNativeModuleVersionsAsync(sdkVersion);
        } catch  {
            Log.warn(_chalk.default`Unable to reach Expo servers. Falling back to using the cached dependency map ({bold bundledNativeModules.json}) from the package "{bold expo}" installed in your project.`);
        }
    }
    debug("Fetching bundled native modules from the local JSON file...");
    return await getBundledNativeModulesAsync(projectRoot);
}
/**
 * Get the legacy static `bundledNativeModules.json` file
 * that's shipped with the version of `expo` that the project has installed.
 */ async function getBundledNativeModulesAsync(projectRoot) {
    // TODO: Revisit now that this code is in the `expo` package.
    const bundledNativeModulesPath = _resolveFrom.default.silent(projectRoot, "expo/bundledNativeModules.json");
    if (!bundledNativeModulesPath) {
        Log.log();
        throw new _errors.CommandError(_chalk.default`The dependency map {bold expo/bundledNativeModules.json} cannot be found, please ensure you have the package "{bold expo}" installed in your project.`);
    }
    return await _jsonFile.default.readAsync(bundledNativeModulesPath);
}

//# sourceMappingURL=bundledNativeModules.js.map