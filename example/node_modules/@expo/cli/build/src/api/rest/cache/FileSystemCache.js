"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _cacache = _interopRequireDefault(require("cacache"));
var _stream = require("stream");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getBodyAndMetaKeys(key) {
    return [
        `${key}body`,
        `${key}meta`
    ];
}
class FileSystemCache {
    constructor(options){
        this.options = options;
    }
    async get(key) {
        const [, metaKey] = getBodyAndMetaKeys(key);
        const metaInfo = await _cacache.default.get.info(this.options.cacheDirectory, metaKey);
        if (!metaInfo) {
            return undefined;
        }
        const metaBuffer = await _cacache.default.get.byDigest(this.options.cacheDirectory, metaInfo.integrity);
        const metaData = JSON.parse(metaBuffer);
        const { bodyStreamIntegrity , empty , expiration  } = metaData;
        delete metaData.bodyStreamIntegrity;
        delete metaData.empty;
        delete metaData.expiration;
        if (expiration && expiration < Date.now()) {
            return undefined;
        }
        const bodyStream = empty ? _stream.Readable.from(Buffer.alloc(0)) : _cacache.default.get.stream.byDigest(this.options.cacheDirectory, bodyStreamIntegrity);
        return {
            bodyStream,
            metaData
        };
    }
    remove(key) {
        const [bodyKey, metaKey] = getBodyAndMetaKeys(key);
        return Promise.all([
            _cacache.default.rm.entry(this.options.cacheDirectory, bodyKey),
            _cacache.default.rm.entry(this.options.cacheDirectory, metaKey), 
        ]);
    }
    async set(key, bodyStream, metaData) {
        const [bodyKey, metaKey] = getBodyAndMetaKeys(key);
        const metaCopy = {
            ...metaData
        };
        if (typeof this.options.ttl === "number") {
            metaCopy.expiration = Date.now() + this.options.ttl;
        }
        try {
            metaCopy.bodyStreamIntegrity = await new Promise((fulfill, reject)=>{
                bodyStream.pipe(_cacache.default.put.stream(this.options.cacheDirectory, bodyKey)).on("integrity", (i)=>fulfill(i)
                ).on("error", (e)=>{
                    reject(e);
                });
            });
        } catch (err) {
            if (err.code !== "ENODATA") {
                throw err;
            }
            metaCopy.empty = true;
        }
        const metaBuffer = Buffer.from(JSON.stringify(metaCopy));
        await _cacache.default.put(this.options.cacheDirectory, metaKey, metaBuffer);
        const cachedData = await this.get(key);
        return cachedData;
    }
}
exports.FileSystemCache = FileSystemCache;

//# sourceMappingURL=FileSystemCache.js.map