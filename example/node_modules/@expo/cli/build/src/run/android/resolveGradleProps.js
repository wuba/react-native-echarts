"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveGradleProps = resolveGradleProps;
var _path = _interopRequireDefault(require("path"));
var _errors = require("../../utils/errors");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function assertVariant(variant) {
    if (variant && typeof variant !== "string") {
        throw new _errors.CommandError("BAD_ARGS", "--variant must be a string");
    }
    return variant != null ? variant : "debug";
}
function resolveGradleProps(projectRoot, options) {
    const variant = assertVariant(options.variant);
    // NOTE(EvanBacon): Why would this be different? Can we get the different name?
    const appName = "app";
    const apkDirectory = _path.default.join(projectRoot, "android", appName, "build", "outputs", "apk");
    // buildDeveloperTrust -> build, developer, trust (where developer, and trust are flavors).
    // This won't work for non-standard flavor names like "myFlavor" would be treated as "my", "flavor".
    const [buildType, ...flavors] = variant.split(/(?=[A-Z])/).map((v)=>v.toLowerCase()
    );
    const apkVariantDirectory = _path.default.join(apkDirectory, ...flavors, buildType);
    return {
        appName,
        buildType,
        flavors,
        apkVariantDirectory
    };
}

//# sourceMappingURL=resolveGradleProps.js.map