"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _path = _interopRequireDefault(require("path"));
var _send = _interopRequireDefault(require("send"));
var _url = require("url");
var _env = require("../../../utils/env");
var _resolvePlatform = require("./resolvePlatform");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:start:server:middleware:serveStatic");
class ServeStaticMiddleware {
    constructor(projectRoot){
        this.projectRoot = projectRoot;
    }
    getHandler() {
        const publicPath = _path.default.join(this.projectRoot, _env.env.EXPO_PUBLIC_FOLDER);
        debug(`Serving static files from:`, publicPath);
        const opts = {
            root: publicPath
        };
        return (req, res, next)=>{
            if (!(req == null ? void 0 : req.url) || req.method !== "GET" && req.method !== "HEAD") {
                return next();
            }
            const platform = (0, _resolvePlatform).parsePlatformHeader(req);
            // Currently this is web-only
            if (platform && platform !== "web") {
                return next();
            }
            const pathname = (0, _url).parse(req.url).pathname;
            if (!pathname) {
                return next();
            }
            debug(`Maybe serve static:`, pathname);
            const stream = (0, _send).default(req, pathname, opts);
            // add file listener for fallthrough
            let forwardError = false;
            stream.on("file", function onFile() {
                // once file is determined, always forward error
                forwardError = true;
            });
            // forward errors
            stream.on("error", function error(err) {
                if (forwardError || !(err.statusCode < 500)) {
                    next(err);
                    return;
                }
                next();
            });
            // pipe
            stream.pipe(res);
        };
    }
}
exports.ServeStaticMiddleware = ServeStaticMiddleware;

//# sourceMappingURL=ServeStaticMiddleware.js.map