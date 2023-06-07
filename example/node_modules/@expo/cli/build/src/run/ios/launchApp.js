"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.launchAppAsync = launchAppAsync;
var _chalk = _interopRequireDefault(require("chalk"));
var _path = _interopRequireDefault(require("path"));
var _appleDeviceManager = require("../../start/platforms/ios/AppleDeviceManager");
var _simctlLogging = require("../../start/platforms/ios/simctlLogging");
var _plist = require("../../utils/plist");
var _profile = require("../../utils/profile");
var XcodeBuild = _interopRequireWildcard(require("./XcodeBuild"));
var _installOnDeviceAsync = require("./appleDevice/installOnDeviceAsync");
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
async function launchAppAsync(binaryPath, manager, props) {
    const appId = await (0, _profile).profile(getBundleIdentifierForBinaryAsync)(binaryPath);
    if (!props.isSimulator) {
        await (0, _profile).profile(_installOnDeviceAsync.installOnDeviceAsync)({
            bundleIdentifier: appId,
            bundle: binaryPath,
            appDeltaDirectory: (0, _installOnDeviceAsync).getAppDeltaDirectory(appId),
            udid: props.device.udid,
            deviceName: props.device.name
        });
        return;
    }
    XcodeBuild.logPrettyItem(_chalk.default`{bold Installing} on ${props.device.name}`);
    const device = await _appleDeviceManager.AppleDeviceManager.resolveAsync({
        device: props.device
    });
    await device.installAppAsync(binaryPath);
    XcodeBuild.logPrettyItem(_chalk.default`{bold Opening} on ${device.name} {dim (${appId})}`);
    if (props.shouldStartBundler) {
        await _simctlLogging.SimulatorLogStreamer.getStreamer(device.device, {
            appId
        }).attachAsync();
    }
    await manager.getDefaultDevServer().openCustomRuntimeAsync("simulator", {
        applicationId: appId
    }, {
        device
    });
}
async function getBundleIdentifierForBinaryAsync(binaryPath) {
    const builtInfoPlistPath = _path.default.join(binaryPath, "Info.plist");
    const { CFBundleIdentifier  } = await (0, _plist).parsePlistAsync(builtInfoPlistPath);
    return CFBundleIdentifier;
}

//# sourceMappingURL=launchApp.js.map