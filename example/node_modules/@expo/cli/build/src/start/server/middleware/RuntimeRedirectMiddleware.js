"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _url = require("url");
var Log = _interopRequireWildcard(require("../../../log"));
var _expoMiddleware = require("./ExpoMiddleware");
var _resolvePlatform = require("./resolvePlatform");
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
const debug = require("debug")("expo:start:server:middleware:runtimeRedirect");
class RuntimeRedirectMiddleware extends _expoMiddleware.ExpoMiddleware {
    constructor(projectRoot, options){
        super(projectRoot, [
            "/_expo/link"
        ]);
        this.projectRoot = projectRoot;
        this.options = options;
    }
    async handleRequestAsync(req, res) {
        const { query  } = (0, _url).parse(req.url, true);
        const isDevClient = query["choice"] === "expo-dev-client";
        var ref;
        const platform = (ref = (0, _resolvePlatform).parsePlatformHeader(req)) != null ? ref : (0, _resolvePlatform).resolvePlatformFromUserAgentHeader(req);
        (0, _resolvePlatform).assertMissingRuntimePlatform(platform);
        (0, _resolvePlatform).assertRuntimePlatform(platform);
        const runtime = isDevClient ? "custom" : "expo";
        debug(`props:`, {
            platform,
            runtime
        });
        this.options.onDeepLink({
            runtime,
            platform
        });
        const redirect = this.options.getLocation({
            runtime
        });
        if (!redirect) {
            Log.warn(`[redirect middleware]: Unable to determine redirect location for runtime '${runtime}' and platform '${platform}'`);
            res.statusCode = 404;
            res.end();
            return;
        }
        debug("Redirect ->", redirect);
        res.setHeader("Location", redirect);
        // Disable caching
        (0, _expoMiddleware).disableResponseCache(res);
        // 'Temporary Redirect'
        res.statusCode = 307;
        res.end();
    }
}
exports.RuntimeRedirectMiddleware = RuntimeRedirectMiddleware;

//# sourceMappingURL=RuntimeRedirectMiddleware.js.map