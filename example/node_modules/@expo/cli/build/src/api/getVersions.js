"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getVersionsAsync = getVersionsAsync;
var _errors = require("../utils/errors");
var _client = require("./rest/client");
async function getVersionsAsync({ skipCache  } = {}) {
    // Reconstruct the cached fetch since caching could be disabled.
    const fetchAsync = (0, _client).createCachedFetch({
        skipCache,
        cacheDirectory: "versions-cache",
        // We'll use a 5 minute cache to ensure we stay relatively up to date.
        ttl: 1000 * 60 * 5
    });
    const results = await fetchAsync("versions/latest");
    if (!results.ok) {
        throw new _errors.CommandError("API", `Unexpected response when fetching version info from Expo servers: ${results.statusText}.`);
    }
    const json = await results.json();
    return json.data;
}

//# sourceMappingURL=getVersions.js.map