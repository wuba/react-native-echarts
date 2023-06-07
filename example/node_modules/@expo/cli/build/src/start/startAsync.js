"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startAsync = startAsync;
var _config = require("@expo/config");
var _chalk = _interopRequireDefault(require("chalk"));
var Log = _interopRequireWildcard(require("../log"));
var _getDevClientProperties = _interopRequireDefault(require("../utils/analytics/getDevClientProperties"));
var _rudderstackClient = require("../utils/analytics/rudderstackClient");
var _exit = require("../utils/exit");
var _interactive = require("../utils/interactive");
var _profile = require("../utils/profile");
var _validateDependenciesVersions = require("./doctor/dependencies/validateDependenciesVersions");
var _typeScriptProjectPrerequisite = require("./doctor/typescript/TypeScriptProjectPrerequisite");
var _webSupportProjectPrerequisite = require("./doctor/web/WebSupportProjectPrerequisite");
var _startInterface = require("./interface/startInterface");
var _resolveOptions = require("./resolveOptions");
var _devServerManager = require("./server/DevServerManager");
var _openPlatforms = require("./server/openPlatforms");
var _platformBundlers = require("./server/platformBundlers");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
async function getMultiBundlerStartOptions(projectRoot, { forceManifestType , ...options }, settings, platformBundlers) {
    var _privateKeyPath;
    const commonOptions = {
        mode: options.dev ? "development" : "production",
        devClient: options.devClient,
        forceManifestType,
        privateKeyPath: (_privateKeyPath = options.privateKeyPath) != null ? _privateKeyPath : undefined,
        https: options.https,
        maxWorkers: options.maxWorkers,
        resetDevServer: options.clear,
        minify: options.minify,
        location: {
            hostType: options.host,
            scheme: options.scheme
        }
    };
    const multiBundlerSettings = await (0, _resolveOptions).resolvePortsAsync(projectRoot, options, settings);
    const optionalBundlers = {
        ...platformBundlers
    };
    // In the default case, we don't want to start multiple bundlers since this is
    // a bit slower. Our priority (for legacy) is native platforms.
    if (!options.web) {
        delete optionalBundlers["web"];
    }
    const bundlers = [
        ...new Set(Object.values(optionalBundlers))
    ];
    const multiBundlerStartOptions = bundlers.map((bundler)=>{
        const port = bundler === "webpack" ? multiBundlerSettings.webpackPort : multiBundlerSettings.metroPort;
        return {
            type: bundler,
            options: {
                ...commonOptions,
                port
            }
        };
    });
    return [
        commonOptions,
        multiBundlerStartOptions
    ];
}
async function startAsync(projectRoot, options, settings) {
    Log.log(_chalk.default.gray(`Starting project at ${projectRoot}`));
    const { exp , pkg  } = (0, _profile).profile(_config.getConfig)(projectRoot);
    const platformBundlers = (0, _platformBundlers).getPlatformBundlers(exp);
    if (!options.forceManifestType) {
        var ref;
        const easUpdatesUrlRegex = /^https:\/\/(staging-)?u\.expo\.dev/;
        const isEasUpdatesUrl = ((ref = exp.updates) == null ? void 0 : ref.url) ? easUpdatesUrlRegex.test(exp.updates.url) : false;
        options.forceManifestType = isEasUpdatesUrl ? "expo-updates" : "classic";
    }
    const [defaultOptions, startOptions] = await getMultiBundlerStartOptions(projectRoot, options, settings, platformBundlers);
    const devServerManager = new _devServerManager.DevServerManager(projectRoot, defaultOptions);
    // Validations
    if (options.web || settings.webOnly) {
        await devServerManager.ensureProjectPrerequisiteAsync(_webSupportProjectPrerequisite.WebSupportProjectPrerequisite);
    }
    await devServerManager.ensureProjectPrerequisiteAsync(_typeScriptProjectPrerequisite.TypeScriptProjectPrerequisite);
    if (!settings.webOnly && !options.devClient) {
        await (0, _profile).profile(_validateDependenciesVersions.validateDependenciesVersionsAsync)(projectRoot, exp, pkg);
    }
    // Some tracking thing
    if (options.devClient) {
        await trackAsync(projectRoot, exp);
    }
    await (0, _profile).profile(devServerManager.startAsync.bind(devServerManager))(startOptions);
    // Open project on devices.
    await (0, _profile).profile(_openPlatforms.openPlatformsAsync)(devServerManager, options);
    // Present the Terminal UI.
    if ((0, _interactive).isInteractive()) {
        var _platforms;
        await (0, _profile).profile(_startInterface.startInterfaceAsync)(devServerManager, {
            platforms: (_platforms = exp.platforms) != null ? _platforms : [
                "ios",
                "android",
                "web"
            ]
        });
    } else {
        var ref1;
        // Display the server location in CI...
        const url = (ref1 = devServerManager.getDefaultDevServer()) == null ? void 0 : ref1.getDevServerUrl();
        if (url) {
            Log.log(_chalk.default`Waiting on {underline ${url}}`);
        }
    }
    // Final note about closing the server.
    const logLocation = settings.webOnly ? "in the browser console" : "below";
    Log.log(_chalk.default`Logs for your project will appear ${logLocation}.${(0, _interactive).isInteractive() ? _chalk.default.dim(` Press Ctrl+C to exit.`) : ""}`);
}
async function trackAsync(projectRoot, exp) {
    await (0, _rudderstackClient).logEventAsync("dev client start command", {
        status: "started",
        ...(0, _getDevClientProperties).default(projectRoot, exp)
    });
    (0, _exit).installExitHooks(async ()=>{
        await (0, _rudderstackClient).logEventAsync("dev client start command", {
            status: "finished",
            ...(0, _getDevClientProperties).default(projectRoot, exp)
        });
    // UnifiedAnalytics.flush();
    });
}

//# sourceMappingURL=startAsync.js.map