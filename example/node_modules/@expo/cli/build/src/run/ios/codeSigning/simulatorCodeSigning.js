"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.simulatorBuildRequiresCodeSigning = simulatorBuildRequiresCodeSigning;
var _configPlugins = require("@expo/config-plugins");
var _plist = _interopRequireDefault(require("@expo/plist"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:run:ios:codeSigning:simulator");
// NOTE(EvanBacon): These are entitlements that work in a simulator
// but still require the project to have development code signing setup.
// There may be more, but this is fine for now.
const ENTITLEMENTS_THAT_REQUIRE_CODE_SIGNING = [
    "com.apple.developer.associated-domains",
    "com.apple.developer.applesignin", 
];
function getEntitlements(projectRoot) {
    try {
        const entitlementsPath = _configPlugins.IOSConfig.Entitlements.getEntitlementsPath(projectRoot);
        if (!entitlementsPath || !_fs.default.existsSync(entitlementsPath)) {
            return null;
        }
        const entitlementsContents = _fs.default.readFileSync(entitlementsPath, "utf8");
        const entitlements = _plist.default.parse(entitlementsContents);
        return entitlements;
    } catch (error) {
        debug("Failed to read entitlements", error);
    }
    return null;
}
function simulatorBuildRequiresCodeSigning(projectRoot) {
    const entitlements = getEntitlements(projectRoot);
    if (!entitlements) {
        return false;
    }
    return ENTITLEMENTS_THAT_REQUIRE_CODE_SIGNING.some((entitlement)=>entitlement in entitlements
    );
}

//# sourceMappingURL=simulatorCodeSigning.js.map