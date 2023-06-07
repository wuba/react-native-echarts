"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.wrapFetchWithCache = wrapFetchWithCache;
var _crypto = _interopRequireDefault(require("crypto"));
var _fs = _interopRequireDefault(require("fs"));
var _nodeFetch = require("node-fetch");
var _url = require("url");
var _response = require("./response");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const CACHE_VERSION = 3;
const lockPromiseForKey = {};
const unlockFunctionForKey = {};
/**
 * Take out a lock. When this function returns (asynchronously),
 * you have the lock.
 * @param {string} key - The key to lock on. Anyone else who
 *   tries to lock on the same key will need to wait for it to
 *   be unlocked.
 */ async function lock(key) {
    if (!lockPromiseForKey[key]) {
        lockPromiseForKey[key] = Promise.resolve();
    }
    const takeLockPromise = lockPromiseForKey[key];
    lockPromiseForKey[key] = takeLockPromise.then(()=>new Promise((fulfill)=>{
            unlockFunctionForKey[key] = fulfill;
        })
    );
    return takeLockPromise;
}
/**
 * Release a lock.
 * @param {string} key - The key to release the lock for.
 *   The next person in line will now be able to take out
 *   the lock for that key.
 */ function unlock(key) {
    if (unlockFunctionForKey[key]) {
        unlockFunctionForKey[key]();
        delete unlockFunctionForKey[key];
    }
}
function md5(str) {
    return _crypto.default.createHash("md5").update(str).digest("hex");
}
// Since the boundary in FormData is random,
// we ignore it for purposes of calculating
// the cache key.
function getFormDataCacheKey(formData) {
    const cacheKey = {
        ...formData
    };
    const boundary = formData.getBoundary();
    // @ts-expect-error
    delete cacheKey._boundary;
    const boundaryReplaceRegex = new RegExp(boundary, "g");
    // @ts-expect-error
    cacheKey._streams = cacheKey._streams.map((s)=>{
        if (typeof s === "string") {
            return s.replace(boundaryReplaceRegex, "");
        }
        return s;
    });
    return cacheKey;
}
function getBodyCacheKeyJson(body) {
    if (!body) {
        return body;
    }
    if (typeof body === "string") {
        return body;
    }
    if (body instanceof _url.URLSearchParams) {
        return body.toString();
    }
    if (body instanceof _fs.default.ReadStream) {
        return body.path;
    }
    if (body.toString && body.toString() === "[object FormData]") {
        return getFormDataCacheKey(body);
    }
    if (body instanceof Buffer) {
        return body.toString();
    }
    throw new Error("Unsupported body type. Supported body types are: string, number, undefined, null, url.URLSearchParams, fs.ReadStream, FormData");
}
function getRequestCacheKey(req) {
    return {
        cache: req.cache,
        credentials: req.credentials,
        destination: req.destination,
        headers: req.headers,
        integrity: req.integrity,
        method: req.method,
        redirect: req.redirect,
        referrer: req.referrer,
        referrerPolicy: req.referrerPolicy,
        url: req.url,
        body: getBodyCacheKeyJson(req.body)
    };
}
function getCacheKey(requestArguments) {
    const resource = requestArguments[0];
    const init = requestArguments[1] || {};
    const resourceCacheKeyJson = resource instanceof _nodeFetch.Request ? getRequestCacheKey(resource) : {
        url: resource
    };
    const initCacheKeyJson = {
        ...init
    };
    // @ts-ignore
    resourceCacheKeyJson.body = getBodyCacheKeyJson(resourceCacheKeyJson.body);
    initCacheKeyJson.body = getBodyCacheKeyJson(initCacheKeyJson.body);
    delete initCacheKeyJson.agent;
    return md5(JSON.stringify([
        resourceCacheKeyJson,
        initCacheKeyJson,
        CACHE_VERSION
    ]));
}
function wrapFetchWithCache(fetch, cache1) {
    async function getResponse(cache, url, init) {
        const cacheKey = getCacheKey([
            url,
            init
        ]);
        let cachedValue = await cache.get(cacheKey);
        const ejectSelfFromCache = ()=>cache.remove(cacheKey)
        ;
        if (cachedValue) {
            return new _response.NFCResponse(cachedValue.bodyStream, cachedValue.metaData, ejectSelfFromCache, true);
        }
        await lock(cacheKey);
        try {
            cachedValue = await cache.get(cacheKey);
            if (cachedValue) {
                return new _response.NFCResponse(cachedValue.bodyStream, cachedValue.metaData, ejectSelfFromCache, true);
            }
            const fetchResponse = await fetch(url, init);
            const serializedMeta = _response.NFCResponse.serializeMetaFromNodeFetchResponse(fetchResponse);
            const newlyCachedData = await cache.set(cacheKey, // @ts-expect-error
            fetchResponse.body, serializedMeta);
            return new _response.NFCResponse(newlyCachedData.bodyStream, newlyCachedData.metaData, ejectSelfFromCache, false);
        } finally{
            unlock(cacheKey);
        }
    }
    return (url, init)=>getResponse(cache1, url, init)
    ;
}

//# sourceMappingURL=wrapFetchWithCache.js.map