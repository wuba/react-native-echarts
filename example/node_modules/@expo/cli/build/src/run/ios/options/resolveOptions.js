"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveOptionsAsync = resolveOptionsAsync;
var _simctl = require("../../../start/platforms/ios/simctl");
var _resolveBundlerProps = require("../../resolveBundlerProps");
var _resolveDevice = require("./resolveDevice");
var _resolveNativeScheme = require("./resolveNativeScheme");
var _resolveXcodeProject = require("./resolveXcodeProject");
async function resolveOptionsAsync(projectRoot, options) {
    const xcodeProject = (0, _resolveXcodeProject).resolveXcodeProject(projectRoot);
    const bundlerProps = await (0, _resolveBundlerProps).resolveBundlerPropsAsync(projectRoot, options);
    // Resolve the scheme before the device so we can filter devices based on
    // whichever scheme is selected (i.e. don't present TV devices if the scheme cannot be run on a TV).
    const { osType , name: scheme  } = await (0, _resolveNativeScheme).resolveNativeSchemePropsAsync(projectRoot, options, xcodeProject);
    // Resolve the device based on the provided device id or prompt
    // from a list of devices (connected or simulated) that are filtered by the scheme.
    const device = await (0, _resolveDevice).resolveDeviceAsync(options.device, {
        // It's unclear if there's any value to asserting that we haven't hardcoded the os type in the CLI.
        osType: (0, _simctl).isOSType(osType) ? osType : undefined
    });
    const isSimulator = (0, _resolveDevice).isSimulatorDevice(device);
    // Use the configuration or `Debug` if none is provided.
    const configuration = options.configuration || "Debug";
    // This optimization skips resetting the Metro cache needlessly.
    // The cache is reset in `../node_modules/react-native/scripts/react-native-xcode.sh` when the
    // project is running in Debug and built onto a physical device. It seems that this is done because
    // the script is run from Xcode and unaware of the CLI instance.
    const shouldSkipInitialBundling = configuration === "Debug" && !isSimulator;
    return {
        ...bundlerProps,
        projectRoot,
        isSimulator,
        xcodeProject,
        device,
        configuration,
        shouldSkipInitialBundling,
        buildCache: options.buildCache !== false,
        scheme
    };
}

//# sourceMappingURL=resolveOptions.js.map