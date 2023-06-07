"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAssetSchemasAsync = getAssetSchemasAsync;
var _fs = _interopRequireDefault(require("fs"));
var _jsonSchemaDerefSync = _interopRequireDefault(require("json-schema-deref-sync"));
var _path = _interopRequireDefault(require("path"));
var _env = require("../utils/env");
var _errors = require("../utils/errors");
var _client = require("./rest/client");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const schemaJson = {};
// TODO: Maybe move json-schema-deref-sync out of api (1.58MB -- lodash)
// https://packagephobia.com/result?p=json-schema-deref-sync
async function getSchemaAsync(sdkVersion) {
    const json = await getSchemaJSONAsync(sdkVersion);
    return (0, _jsonSchemaDerefSync).default(json.schema);
}
async function getAssetSchemasAsync(sdkVersion = "UNVERSIONED") {
    // If no SDK version is available then fall back to unversioned
    const schema = await getSchemaAsync(sdkVersion);
    const assetSchemas = [];
    const visit = (node, fieldPath)=>{
        if (node.meta && node.meta.asset) {
            assetSchemas.push(fieldPath);
        }
        const properties = node.properties;
        if (properties) {
            Object.keys(properties).forEach((property)=>visit(properties[property], `${fieldPath}${fieldPath.length > 0 ? "." : ""}${property}`)
            );
        }
    };
    visit(schema, "");
    return assetSchemas;
}
async function getSchemaJSONAsync(sdkVersion) {
    if (_env.env.EXPO_UNIVERSE_DIR) {
        return JSON.parse(_fs.default.readFileSync(_path.default.join(_env.env.EXPO_UNIVERSE_DIR, "server", "www", "xdl-schemas", "UNVERSIONED-schema.json")).toString());
    }
    if (!schemaJson[sdkVersion]) {
        try {
            schemaJson[sdkVersion] = await getConfigurationSchemaAsync(sdkVersion);
        } catch (e) {
            if (e.code === "INVALID_JSON") {
                throw new _errors.CommandError("INVALID_JSON", `Couldn't read schema from server`);
            }
            throw e;
        }
    }
    return schemaJson[sdkVersion];
}
async function getConfigurationSchemaAsync(sdkVersion) {
    // Reconstruct the cached fetch since caching could be disabled.
    const fetchAsync = (0, _client).createCachedFetch({
        cacheDirectory: "schema-cache",
        // We'll use a 1 week cache for versions so older versions get flushed out eventually.
        ttl: 1000 * 60 * 60 * 24 * 7
    });
    const response = await fetchAsync(`project/configuration/schema/${sdkVersion}`);
    const { data  } = await response.json();
    return data;
}

//# sourceMappingURL=getExpoSchema.js.map