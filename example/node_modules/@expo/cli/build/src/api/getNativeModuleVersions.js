"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getNativeModuleVersionsAsync = getNativeModuleVersionsAsync;
var _errors = require("../utils/errors");
var _client = require("./rest/client");
async function getNativeModuleVersionsAsync(sdkVersion) {
    const fetchAsync = (0, _client).createCachedFetch({
        cacheDirectory: "native-modules-cache",
        // 1 minute cache
        ttl: 1000 * 60 * 1
    });
    const results = await fetchAsync(`sdks/${sdkVersion}/native-modules`);
    if (!results.ok) {
        throw new _errors.CommandError("API", `Unexpected response when fetching version info from Expo servers: ${results.statusText}.`);
    }
    const { data  } = await results.json();
    if (!data.length) {
        throw new _errors.CommandError("VERSIONS", "The bundled native module list from the Expo API is empty");
    }
    return fromBundledNativeModuleList(data);
}
function fromBundledNativeModuleList(list) {
    return list.reduce((acc, i)=>{
        acc[i.npmPackage] = i.versionRange;
        return acc;
    }, {});
}

//# sourceMappingURL=getNativeModuleVersions.js.map