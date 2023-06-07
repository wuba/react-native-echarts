"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.downloadAppAsync = downloadAppAsync;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _stream = require("stream");
var _tempy = _interopRequireDefault(require("tempy"));
var _util = require("util");
var _client = require("../api/rest/client");
var _dir = require("./dir");
var _errors = require("./errors");
var _tar = require("./tar");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:utils:downloadAppAsync");
const TIMER_DURATION = 30000;
const pipeline = (0, _util).promisify(_stream.Stream.pipeline);
async function downloadAsync({ url , outputPath , cacheDirectory , onProgress  }) {
    let fetchInstance = _client.fetchAsync;
    if (cacheDirectory) {
        // Reconstruct the cached fetch since caching could be disabled.
        fetchInstance = (0, _client).createCachedFetch({
            // We'll use a 1 week cache for versions so older values get flushed out eventually.
            ttl: 1000 * 60 * 60 * 24 * 7,
            // Users can also nuke their `~/.expo` directory to clear the cache.
            cacheDirectory
        });
    }
    debug(`Downloading ${url} to ${outputPath}`);
    const res = await fetchInstance(url, {
        timeout: TIMER_DURATION,
        onProgress
    });
    if (!res.ok) {
        throw new _errors.CommandError("FILE_DOWNLOAD", `Unexpected response: ${res.statusText}. From url: ${url}`);
    }
    return pipeline(res.body, _fs.default.createWriteStream(outputPath));
}
async function downloadAppAsync({ url , outputPath , extract =false , cacheDirectory , onProgress  }) {
    if (extract) {
        // For iOS we download the ipa to a file then pass that file into the extractor.
        // In the future we should just pipe the `res.body -> tar.extract` directly.
        // I tried this and it created some weird errors where observing the data stream
        // would corrupt the file causing tar to fail with `TAR_BAD_ARCHIVE`.
        const tmpPath = _tempy.default.file({
            name: _path.default.basename(outputPath)
        });
        await downloadAsync({
            url,
            outputPath: tmpPath,
            cacheDirectory,
            onProgress
        });
        debug(`Extracting ${tmpPath} to ${outputPath}`);
        await (0, _dir).ensureDirectoryAsync(outputPath);
        await (0, _tar).extractAsync(tmpPath, outputPath);
    } else {
        await (0, _dir).ensureDirectoryAsync(_path.default.dirname(outputPath));
        await downloadAsync({
            url,
            outputPath,
            cacheDirectory,
            onProgress
        });
    }
}

//# sourceMappingURL=downloadAppAsync.js.map