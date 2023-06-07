"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.runAndroidAsync = runAndroidAsync;
var _path = _interopRequireDefault(require("path"));
var _log = require("../../log");
var _gradle = require("../../start/platforms/android/gradle");
var _scheme = require("../../utils/scheme");
var _ensureNativeProject = require("../ensureNativeProject");
var _hints = require("../hints");
var _startBundler = require("../startBundler");
var _resolveInstallApkName = require("./resolveInstallApkName");
var _resolveOptions = require("./resolveOptions");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:run:android");
async function runAndroidAsync(projectRoot, { install , ...options }) {
    var ref;
    await (0, _ensureNativeProject).ensureNativeProjectAsync(projectRoot, {
        platform: "android",
        install
    });
    const props = await (0, _resolveOptions).resolveOptionsAsync(projectRoot, options);
    debug("Package name: " + props.packageName);
    _log.Log.log("\u203A Building app...");
    const androidProjectRoot = _path.default.join(projectRoot, "android");
    await (0, _gradle).assembleAsync(androidProjectRoot, {
        variant: props.variant,
        port: props.port,
        appName: props.appName,
        buildCache: props.buildCache
    });
    const manager = await (0, _startBundler).startBundlerAsync(projectRoot, {
        port: props.port,
        // If a scheme is specified then use that instead of the package name.
        scheme: (ref = await (0, _scheme).getSchemesForAndroidAsync(projectRoot)) == null ? void 0 : ref[0],
        headless: !props.shouldStartBundler
    });
    await installAppAsync(androidProjectRoot, props);
    await manager.getDefaultDevServer().openCustomRuntimeAsync("emulator", {
        applicationId: props.packageName
    }, {
        device: props.device.device
    });
    if (props.shouldStartBundler) {
        (0, _hints).logProjectLogsLocation();
    }
}
async function installAppAsync(androidProjectRoot, props) {
    // Find the APK file path
    const apkFile = await (0, _resolveInstallApkName).resolveInstallApkNameAsync(props.device.device, props);
    if (apkFile) {
        // Attempt to install the APK from the file path
        const binaryPath = _path.default.join(props.apkVariantDirectory, apkFile);
        debug("Installing:", binaryPath);
        await props.device.installAppAsync(binaryPath);
    } else {
        // If we cannot resolve the APK file path then we can attempt to install using Gradle.
        // This offers more advanced resolution that we may not have first class support for.
        _log.Log.log("\u203A Failed to locate binary file, installing with Gradle...");
        var _variant, _appName;
        await (0, _gradle).installAsync(androidProjectRoot, {
            variant: (_variant = props.variant) != null ? _variant : "debug",
            appName: (_appName = props.appName) != null ? _appName : "app",
            port: props.port
        });
    }
}

//# sourceMappingURL=runAndroidAsync.js.map