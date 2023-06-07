"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LoadingEndpoint = void 0;
var _config = require("@expo/config");
var _updates = require("@expo/config-plugins/build/utils/Updates");
var _promises = require("fs/promises");
var _path = _interopRequireDefault(require("path"));
var _resolveFrom = _interopRequireDefault(require("resolve-from"));
var _expoMiddleware = require("./ExpoMiddleware");
var _resolvePlatform = require("./resolvePlatform");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:start:server:middleware:interstitialPage");
const LoadingEndpoint = "/_expo/loading";
exports.LoadingEndpoint = LoadingEndpoint;
class InterstitialPageMiddleware extends _expoMiddleware.ExpoMiddleware {
    constructor(projectRoot, options = {
        scheme: null
    }){
        super(projectRoot, [
            LoadingEndpoint
        ]);
        this.options = options;
    }
    /** Get the template HTML page and inject values. */ async _getPageAsync({ appName , projectVersion  }) {
        var // Production: This will resolve when installed in the project.
        ref;
        const templatePath = (ref = _resolveFrom.default.silent(this.projectRoot, "expo/static/loading-page/index.html")) != null ? ref : // Development: This will resolve when testing locally.
        _path.default.resolve(__dirname, "../../../../../static/loading-page/index.html");
        let content = (await (0, _promises).readFile(templatePath)).toString("utf-8");
        content = content.replace(/{{\s*AppName\s*}}/, appName);
        content = content.replace(/{{\s*Path\s*}}/, this.projectRoot);
        var _scheme;
        content = content.replace(/{{\s*Scheme\s*}}/, (_scheme = this.options.scheme) != null ? _scheme : "Unknown");
        content = content.replace(/{{\s*ProjectVersionType\s*}}/, `${projectVersion.type === "sdk" ? "SDK" : "Runtime"} version`);
        var _version;
        content = content.replace(/{{\s*ProjectVersion\s*}}/, (_version = projectVersion.version) != null ? _version : "Undetected");
        return content;
    }
    /** Get settings for the page from the project config. */ _getProjectOptions(platform) {
        (0, _resolvePlatform).assertRuntimePlatform(platform);
        const { exp  } = (0, _config).getConfig(this.projectRoot);
        const { appName  } = (0, _config).getNameFromConfig(exp);
        const runtimeVersion = (0, _updates).getRuntimeVersionNullable(exp, platform);
        var _sdkVersion;
        const sdkVersion = (_sdkVersion = exp.sdkVersion) != null ? _sdkVersion : null;
        return {
            appName: appName != null ? appName : "App",
            projectVersion: sdkVersion && !runtimeVersion ? {
                type: "sdk",
                version: sdkVersion
            } : {
                type: "runtime",
                version: runtimeVersion
            }
        };
    }
    async handleRequestAsync(req, res) {
        res = (0, _expoMiddleware).disableResponseCache(res);
        res.setHeader("Content-Type", "text/html");
        var ref;
        const platform = (ref = (0, _resolvePlatform).parsePlatformHeader(req)) != null ? ref : (0, _resolvePlatform).resolvePlatformFromUserAgentHeader(req);
        (0, _resolvePlatform).assertMissingRuntimePlatform(platform);
        (0, _resolvePlatform).assertRuntimePlatform(platform);
        const { appName , projectVersion  } = this._getProjectOptions(platform);
        debug(`Create loading page. (platform: ${platform}, appName: ${appName}, projectVersion: ${projectVersion.version}, type: ${projectVersion.type})`);
        const content = await this._getPageAsync({
            appName,
            projectVersion
        });
        res.end(content);
    }
}
exports.InterstitialPageMiddleware = InterstitialPageMiddleware;

//# sourceMappingURL=InterstitialPageMiddleware.js.map