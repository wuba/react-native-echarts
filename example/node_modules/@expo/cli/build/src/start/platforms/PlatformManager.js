"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _config = require("@expo/config");
var _assert = _interopRequireDefault(require("assert"));
var _chalk = _interopRequireDefault(require("chalk"));
var _log = require("../../log");
var _rudderstackClient = require("../../utils/analytics/rudderstackClient");
var _errors = require("../../utils/errors");
var _link = require("../../utils/link");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:start:platforms:platformManager");
class PlatformManager {
    constructor(projectRoot, props){
        this.projectRoot = projectRoot;
        this.props = props;
    }
    /** Returns the project application identifier or asserts that one is not defined. Exposed for testing. */ _getAppIdResolver() {
        throw new _errors.UnimplementedError();
    }
    /**
   * Get the URL for users intending to launch the project in Expo Go.
   * The CLI will check if the project has a custom dev client and if the redirect page feature is enabled.
   * If both are true, the CLI will return the redirect page URL.
   */ async getExpoGoOrCustomRuntimeUrlAsync(deviceManager) {
        // Determine if the redirect page feature is enabled first since it's the cheapest to check.
        const redirectUrl = this.props.getRedirectUrl();
        if (redirectUrl) {
            // If the redirect page feature is enabled, check if the project has a resolvable native identifier.
            let applicationId;
            try {
                applicationId = await this._getAppIdResolver().getAppIdAsync();
            } catch  {
                _log.Log.warn(_chalk.default`\u203A Launching in Expo Go. If you want to use a ` + `development build, you need to create and install one first, or, if you already ` + _chalk.default`have a build, add {bold ios.bundleIdentifier} and {bold android.package} to ` + `this project's app config.\n${(0, _link).learnMore("https://docs.expo.dev/development/build/")}`);
            }
            if (applicationId) {
                debug(`Resolving launch URL: (appId: ${applicationId}, redirect URL: ${redirectUrl})`);
                // NOTE(EvanBacon): This adds considerable amount of time to the command, we should consider removing or memoizing it.
                // Finally determine if the target device has a custom dev client installed.
                if (await deviceManager.isAppInstalledAsync(applicationId)) {
                    return redirectUrl;
                } else {
                    // Log a warning if no development build is available on the device, but the
                    // interstitial page would otherwise be opened.
                    _log.Log.warn(_chalk.default`\u203A The {bold expo-dev-client} package is installed, but a development build is not ` + _chalk.default`installed on {bold ${deviceManager.name}}.\nLaunching in Expo Go. If you want to use a ` + `development build, you need to create and install one first.\n${(0, _link).learnMore("https://docs.expo.dev/development/build/")}`);
                }
            }
        }
        return this.props.getExpoGoUrl();
    }
    async openProjectInExpoGoAsync(resolveSettings = {}) {
        const deviceManager = await this.props.resolveDeviceAsync(resolveSettings);
        const url = await this.getExpoGoOrCustomRuntimeUrlAsync(deviceManager);
        deviceManager.logOpeningUrl(url);
        // TODO: Expensive, we should only do this once.
        const { exp  } = (0, _config).getConfig(this.projectRoot);
        const installedExpo = await deviceManager.ensureExpoGoAsync(exp.sdkVersion);
        deviceManager.activateWindowAsync();
        await deviceManager.openUrlAsync(url);
        await (0, _rudderstackClient).logEventAsync("Open Url on Device", {
            platform: this.props.platform,
            installedExpo
        });
        return {
            url
        };
    }
    async openProjectInCustomRuntimeAsync(resolveSettings = {}, props = {}) {
        debug(`open custom (${Object.entries(props).map(([k, v])=>`${k}: ${v}`
        ).join(", ")})`);
        let url = this.props.getCustomRuntimeUrl({
            scheme: props.scheme
        });
        debug(`Opening project in custom runtime: ${url} -- %O`, props);
        var _applicationId;
        // TODO: It's unclear why we do application id validation when opening with a URL
        const applicationId = (_applicationId = props.applicationId) != null ? _applicationId : await this._getAppIdResolver().getAppIdAsync();
        const deviceManager = await this.props.resolveDeviceAsync(resolveSettings);
        if (!await deviceManager.isAppInstalledAsync(applicationId)) {
            throw new _errors.CommandError(`No development build (${applicationId}) for this project is installed. ` + `Please make and install a development build on the device first.\n${(0, _link).learnMore("https://docs.expo.dev/development/build/")}`);
        }
        // TODO: Rethink analytics
        await (0, _rudderstackClient).logEventAsync("Open Url on Device", {
            platform: this.props.platform,
            installedExpo: false
        });
        if (!url) {
            url = this._resolveAlternativeLaunchUrl(applicationId, props);
        }
        deviceManager.logOpeningUrl(url);
        await deviceManager.activateWindowAsync();
        await deviceManager.openUrlAsync(url);
        return {
            url
        };
    }
    /** Launch the project on a device given the input runtime. */ async openAsync(options, resolveSettings = {}) {
        debug(`open (runtime: ${options.runtime}, platform: ${this.props.platform}, device: %O, shouldPrompt: ${resolveSettings.shouldPrompt})`, resolveSettings.device);
        if (options.runtime === "expo") {
            return this.openProjectInExpoGoAsync(resolveSettings);
        } else if (options.runtime === "web") {
            return this.openWebProjectAsync(resolveSettings);
        } else if (options.runtime === "custom") {
            return this.openProjectInCustomRuntimeAsync(resolveSettings, options.props);
        } else {
            throw new _errors.CommandError(`Invalid runtime target: ${options.runtime}`);
        }
    }
    /** Open the current web project (Webpack) in a device . */ async openWebProjectAsync(resolveSettings = {}) {
        const url = this.props.getDevServerUrl();
        (0, _assert).default(url, "Dev server is not running.");
        const deviceManager = await this.props.resolveDeviceAsync(resolveSettings);
        deviceManager.logOpeningUrl(url);
        await deviceManager.activateWindowAsync();
        await deviceManager.openUrlAsync(url);
        return {
            url
        };
    }
    /** If the launch URL cannot be determined (`custom` runtimes) then an alternative string can be provided to open the device. Often a device ID or activity to launch. Exposed for testing. */ _resolveAlternativeLaunchUrl(applicationId, props = {}) {
        throw new _errors.UnimplementedError();
    }
}
exports.PlatformManager = PlatformManager;

//# sourceMappingURL=PlatformManager.js.map