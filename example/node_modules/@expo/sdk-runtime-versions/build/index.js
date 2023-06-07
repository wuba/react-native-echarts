"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSDKVersionRuntimeVersion = exports.getSDKVersionFromRuntimeVersion = exports.getRuntimeVersionForSDKVersion = exports.RUNTIME_VERSION_PREFIX = void 0;
exports.RUNTIME_VERSION_PREFIX = 'exposdk:';
function getRuntimeVersionForSDKVersion(sdkVersion) {
    return "" + exports.RUNTIME_VERSION_PREFIX + sdkVersion;
}
exports.getRuntimeVersionForSDKVersion = getRuntimeVersionForSDKVersion;
function getSDKVersionFromRuntimeVersion(runtimeVersion) {
    var regexMatches = /^exposdk:(\d+\.\d+\.\d+)$/.exec(runtimeVersion);
    if (!regexMatches || regexMatches.length < 2) {
        return undefined;
    }
    return regexMatches[1];
}
exports.getSDKVersionFromRuntimeVersion = getSDKVersionFromRuntimeVersion;
function isSDKVersionRuntimeVersion(runtimeVersion) {
    return getSDKVersionFromRuntimeVersion(runtimeVersion) !== undefined;
}
exports.isSDKVersionRuntimeVersion = isSDKVersionRuntimeVersion;
//# sourceMappingURL=index.js.map