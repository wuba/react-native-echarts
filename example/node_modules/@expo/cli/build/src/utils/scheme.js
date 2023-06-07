"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSchemesForIosAsync = getSchemesForIosAsync;
exports.getSchemesForAndroidAsync = getSchemesForAndroidAsync;
exports.getOptionalDevClientSchemeAsync = getOptionalDevClientSchemeAsync;
var _config = require("@expo/config");
var _configPlugins = require("@expo/config-plugins");
var _getInfoPlistPath = require("@expo/config-plugins/build/ios/utils/getInfoPlistPath");
var _plist = _interopRequireDefault(require("@expo/plist"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _resolveFrom = _interopRequireDefault(require("resolve-from"));
var Log = _interopRequireWildcard(require("../log"));
var _clearNativeFolder = require("../prebuild/clearNativeFolder");
var _array = require("./array");
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
const debug = require("debug")("expo:utils:scheme");
// sort longest to ensure uniqueness.
// this might be undesirable as it causes the QR code to be longer.
function sortLongest(obj) {
    return obj.sort((a, b)=>b.length - a.length
    );
}
/**
 * Resolve the scheme for the dev client using two methods:
 *   - filter on known Expo schemes, starting with `exp+`, avoiding 3rd party schemes.
 *   - filter on longest to ensure uniqueness.
 */ function resolveExpoOrLongestScheme(schemes) {
    const expoOnlySchemes = schemes.filter((scheme)=>scheme.startsWith("exp+")
    );
    return expoOnlySchemes.length > 0 ? sortLongest(expoOnlySchemes) : sortLongest(schemes);
}
async function getSchemesForIosAsync(projectRoot) {
    try {
        const infoPlistBuildProperty = (0, _getInfoPlistPath).getInfoPlistPathFromPbxproj(projectRoot);
        debug(`ios application Info.plist path:`, infoPlistBuildProperty);
        if (infoPlistBuildProperty) {
            const configPath = _path.default.join(projectRoot, "ios", infoPlistBuildProperty);
            const rawPlist = _fs.default.readFileSync(configPath, "utf8");
            const plistObject = _plist.default.parse(rawPlist);
            const schemes = _configPlugins.IOSConfig.Scheme.getSchemesFromPlist(plistObject);
            debug(`ios application schemes:`, schemes);
            return resolveExpoOrLongestScheme(schemes);
        }
    } catch (error) {
        debug(`expected error collecting ios application schemes for the main target:`, error);
    }
    // No ios folder or some other error
    return [];
}
async function getSchemesForAndroidAsync(projectRoot) {
    try {
        const configPath = await _configPlugins.AndroidConfig.Paths.getAndroidManifestAsync(projectRoot);
        const manifest = await _configPlugins.AndroidConfig.Manifest.readAndroidManifestAsync(configPath);
        const schemes = await _configPlugins.AndroidConfig.Scheme.getSchemesFromManifest(manifest);
        debug(`android application schemes:`, schemes);
        return resolveExpoOrLongestScheme(schemes);
    } catch (error) {
        debug(`expected error collecting android application schemes for the main activity:`, error);
        // No android folder or some other error
        return [];
    }
}
// TODO: Revisit and test after run code is merged.
async function getManagedDevClientSchemeAsync(projectRoot) {
    const { exp  } = (0, _config).getConfig(projectRoot);
    try {
        const getDefaultScheme = require((0, _resolveFrom).default(projectRoot, "expo-dev-client/getDefaultScheme"));
        const scheme = getDefaultScheme(exp);
        return scheme;
    } catch  {
        Log.warn("\nDevelopment build: Unable to get the default URI scheme for the project. Please make sure the expo-dev-client package is installed.");
        return null;
    }
}
async function getOptionalDevClientSchemeAsync(projectRoot) {
    const [hasIos, hasAndroid] = await Promise.all([
        (0, _clearNativeFolder).hasRequiredIOSFilesAsync(projectRoot),
        (0, _clearNativeFolder).hasRequiredAndroidFilesAsync(projectRoot), 
    ]);
    const [ios, android] = await Promise.all([
        getSchemesForIosAsync(projectRoot),
        getSchemesForAndroidAsync(projectRoot), 
    ]);
    // Allow managed projects
    if (!hasIos && !hasAndroid) {
        return getManagedDevClientSchemeAsync(projectRoot);
    }
    let matching;
    // Allow for only one native project to exist.
    if (!hasIos) {
        matching = android[0];
    } else if (!hasAndroid) {
        matching = ios[0];
    } else {
        [matching] = (0, _array).intersecting(ios, android);
    }
    return matching != null ? matching : null;
}

//# sourceMappingURL=scheme.js.map