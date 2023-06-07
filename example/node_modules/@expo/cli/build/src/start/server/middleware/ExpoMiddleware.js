"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.disableResponseCache = disableResponseCache;
var _url = require("url");
var Log = _interopRequireWildcard(require("../../../log"));
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
class ExpoMiddleware {
    constructor(projectRoot, supportedPaths){
        this.projectRoot = projectRoot;
        this.supportedPaths = supportedPaths;
    }
    /**
   * Returns true when the middleware should handle the incoming server request.
   * Exposed for testing.
   */ _shouldHandleRequest(req) {
        if (!req.url) {
            return false;
        }
        const parsed = (0, _url).parse(req.url);
        // Strip the query params
        if (!parsed.pathname) {
            return false;
        }
        return this.supportedPaths.includes(parsed.pathname);
    }
    /** Create a server middleware handler. */ getHandler() {
        const internalMiddleware = async (req, res, next)=>{
            try {
                return await this.handleRequestAsync(req, res, next);
            } catch (error) {
                Log.exception(error);
                // 5xx = Server Error HTTP code
                res.statusCode = 500;
                if (typeof error === "object" && error !== null) {
                    res.end(JSON.stringify({
                        error: error.toString()
                    }));
                } else {
                    res.end(`Unexpected error: ${error}`);
                }
            }
        };
        const middleware = async (req, res, next)=>{
            if (!this._shouldHandleRequest(req)) {
                return next();
            }
            return internalMiddleware(req, res, next);
        };
        middleware.internal = internalMiddleware;
        return middleware;
    }
}
exports.ExpoMiddleware = ExpoMiddleware;
function disableResponseCache(res) {
    res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.setHeader("Expires", "-1");
    res.setHeader("Pragma", "no-cache");
    return res;
}

//# sourceMappingURL=ExpoMiddleware.js.map