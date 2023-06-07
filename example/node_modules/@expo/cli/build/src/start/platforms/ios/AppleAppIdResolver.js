"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _configPlugins = require("@expo/config-plugins");
var _plist = _interopRequireDefault(require("@expo/plist"));
var _fs = _interopRequireDefault(require("fs"));
var _appIdResolver = require("../AppIdResolver");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:start:platforms:ios:AppleAppIdResolver");
class AppleAppIdResolver extends _appIdResolver.AppIdResolver {
    constructor(projectRoot){
        super(projectRoot, "ios", "ios.bundleIdentifier");
    }
    /** @return `true` if the app has valid `*.pbxproj` file */ async hasNativeProjectAsync() {
        try {
            // Never returns nullish values.
            return !!_configPlugins.IOSConfig.Paths.getAllPBXProjectPaths(this.projectRoot).length;
        } catch (error) {
            debug("Expected error checking for native project:", error);
            return false;
        }
    }
    async resolveAppIdFromNativeAsync() {
        // Check xcode project
        try {
            const bundleId = _configPlugins.IOSConfig.BundleIdentifier.getBundleIdentifierFromPbxproj(this.projectRoot);
            if (bundleId) {
                return bundleId;
            }
        } catch (error) {
            debug("Expected error resolving the bundle identifier from the pbxproj:", error);
        }
        // Check Info.plist
        try {
            const infoPlistPath = _configPlugins.IOSConfig.Paths.getInfoPlistPath(this.projectRoot);
            const data = await _plist.default.parse(_fs.default.readFileSync(infoPlistPath, "utf8"));
            if (data.CFBundleIdentifier && !data.CFBundleIdentifier.startsWith("$(")) {
                return data.CFBundleIdentifier;
            }
        } catch (error1) {
            debug("Expected error resolving the bundle identifier from the project Info.plist:", error1);
        }
        return null;
    }
}
exports.AppleAppIdResolver = AppleAppIdResolver;

//# sourceMappingURL=AppleAppIdResolver.js.map