"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.runIosAsync = runIosAsync;
var _chalk = _interopRequireDefault(require("chalk"));
var Log = _interopRequireWildcard(require("../../log"));
var _cocoapods = require("../../utils/cocoapods");
var _profile = require("../../utils/profile");
var _scheme = require("../../utils/scheme");
var _ensureNativeProject = require("../ensureNativeProject");
var _hints = require("../hints");
var _startBundler = require("../startBundler");
var XcodeBuild = _interopRequireWildcard(require("./XcodeBuild"));
var _launchApp = require("./launchApp");
var _resolveOptions = require("./options/resolveOptions");
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
async function runIosAsync(projectRoot, options) {
    var ref;
    assertPlatform();
    const install = !!options.install;
    if (await (0, _ensureNativeProject).ensureNativeProjectAsync(projectRoot, {
        platform: "ios",
        install
    }) && install) {
        await (0, _cocoapods).maybePromptToSyncPodsAsync(projectRoot);
    }
    // Resolve the CLI arguments into useable options.
    const props = await (0, _resolveOptions).resolveOptionsAsync(projectRoot, options);
    // Spawn the `xcodebuild` process to create the app binary.
    const buildOutput = await XcodeBuild.buildAsync(props);
    // Find the path to the built app binary, this will be used to install the binary
    // on a device.
    const binaryPath = await (0, _profile).profile(XcodeBuild.getAppBinaryPath)(buildOutput);
    // Start the dev server which creates all of the required info for
    // launching the app on a simulator.
    const manager = await (0, _startBundler).startBundlerAsync(projectRoot, {
        port: props.port,
        headless: !props.shouldStartBundler,
        // If a scheme is specified then use that instead of the package name.
        scheme: (ref = await (0, _scheme).getSchemesForIosAsync(projectRoot)) == null ? void 0 : ref[0]
    });
    // Install and launch the app binary on a device.
    await (0, _launchApp).launchAppAsync(binaryPath, manager, {
        isSimulator: props.isSimulator,
        device: props.device,
        shouldStartBundler: props.shouldStartBundler
    });
    // Log the location of the JS logs for the device.
    if (props.shouldStartBundler) {
        (0, _hints).logProjectLogsLocation();
    }
}
function assertPlatform() {
    if (process.platform !== "darwin") {
        Log.exit(_chalk.default`iOS apps can only be built on macOS devices. Use {cyan eas build -p ios} to build in the cloud.`);
    }
}

//# sourceMappingURL=runIosAsync.js.map