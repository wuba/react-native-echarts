"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createMetadataJson = createMetadataJson;
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function createMetadataJson({ bundles , fileNames  }) {
    // Build metadata.json
    return {
        version: 0,
        bundler: "metro",
        fileMetadata: Object.entries(bundles).reduce((metadata, [platform, bundle])=>{
            return {
                ...metadata,
                [platform]: {
                    // Get the filename for each platform's bundle.
                    bundle: _path.default.join("bundles", fileNames[platform]),
                    // Collect all of the assets and convert them to the serial format.
                    assets: bundle.assets.map((asset)=>{
                        var // Each asset has multiple hashes which we convert and then flatten.
                        ref;
                        return (ref = asset.fileHashes) == null ? void 0 : ref.map((hash)=>({
                                path: _path.default.join("assets", hash),
                                ext: asset.type
                            })
                        );
                    }).filter(Boolean).flat()
                }
            };
        }, {})
    };
}

//# sourceMappingURL=createMetadataJson.js.map