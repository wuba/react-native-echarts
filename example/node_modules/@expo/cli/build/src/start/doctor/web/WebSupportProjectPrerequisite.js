"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isWebPlatformExcluded = isWebPlatformExcluded;
var _config = require("@expo/config");
var _chalk = _interopRequireDefault(require("chalk"));
var Log = _interopRequireWildcard(require("../../../log"));
var _env = require("../../../utils/env");
var _platformBundlers = require("../../server/platformBundlers");
var _prerequisite = require("../Prerequisite");
var _ensureDependenciesAsync = require("../dependencies/ensureDependenciesAsync");
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
const debug = require("debug")("expo:doctor:webSupport");
class WebSupportProjectPrerequisite extends _prerequisite.ProjectPrerequisite {
    /** Ensure a project that hasn't explicitly disabled web support has all the required packages for running in the browser. */ async assertImplementation() {
        if (_env.env.EXPO_NO_WEB_SETUP) {
            Log.warn("Skipping web setup: EXPO_NO_WEB_SETUP is enabled.");
            return;
        }
        debug("Ensuring web support is setup");
        const result = await this._shouldSetupWebSupportAsync();
        // Ensure web packages are installed
        await this._ensureWebDependenciesInstalledAsync({
            exp: result.exp
        });
    }
    /** Exposed for testing. */ async _shouldSetupWebSupportAsync() {
        const config = (0, _config).getConfig(this.projectRoot);
        // Detect if the 'web' string is purposefully missing from the platforms array.
        if (isWebPlatformExcluded(config.rootConfig)) {
            // Get exact config description with paths.
            const configName = (0, _config).getProjectConfigDescriptionWithPaths(this.projectRoot, config);
            throw new _prerequisite.PrerequisiteCommandError("WEB_SUPPORT", _chalk.default`Skipping web setup: {bold "web"} is not included in the project ${configName} {bold "platforms"} array.`);
        }
        return config;
    }
    /** Exposed for testing. */ async _ensureWebDependenciesInstalledAsync({ exp  }) {
        const requiredPackages = [
            // use react-native-web/package.json to skip node module cache issues when the user installs
            // the package and attempts to resolve the module in the same process.
            {
                file: "react-native-web/package.json",
                pkg: "react-native-web"
            },
            {
                file: "react-dom/package.json",
                pkg: "react-dom"
            }, 
        ];
        const bundler = (0, _platformBundlers).getPlatformBundlers(exp).web;
        // Only include webpack-config if bundler is webpack.
        if (bundler === "webpack") {
            requiredPackages.push(// `webpack` and `webpack-dev-server` should be installed in the `@expo/webpack-config`
            {
                file: "@expo/webpack-config/package.json",
                pkg: "@expo/webpack-config",
                dev: true
            });
        }
        try {
            return await (0, _ensureDependenciesAsync).ensureDependenciesAsync(this.projectRoot, {
                // This never seems to work when prompting, installing, and running -- instead just inform the user to run the install command and try again.
                skipPrompt: true,
                exp,
                installMessage: `It looks like you're trying to use web support but don't have the required dependencies installed.`,
                warningMessage: _chalk.default`If you're not using web, please ensure you remove the {bold "web"} string from the platforms array in the project Expo config.`,
                requiredPackages
            });
        } catch (error) {
            // Reset the cached check so we can re-run the check if the user re-runs the command by pressing 'w' in the Terminal UI.
            this.resetAssertion();
            throw error;
        }
    }
}
exports.WebSupportProjectPrerequisite = WebSupportProjectPrerequisite;
function isWebPlatformExcluded(rootConfig) {
    var ref, ref1, ref2;
    // Detect if the 'web' string is purposefully missing from the platforms array.
    const isWebExcluded = Array.isArray((ref = rootConfig.expo) == null ? void 0 : ref.platforms) && !!((ref1 = rootConfig.expo) == null ? void 0 : ref1.platforms.length) && !((ref2 = rootConfig.expo) == null ? void 0 : ref2.platforms.includes("web"));
    return isWebExcluded;
}

//# sourceMappingURL=WebSupportProjectPrerequisite.js.map