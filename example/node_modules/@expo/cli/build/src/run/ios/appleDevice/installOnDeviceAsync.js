"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAppDeltaDirectory = getAppDeltaDirectory;
exports.installOnDeviceAsync = installOnDeviceAsync;
var _chalk = _interopRequireDefault(require("chalk"));
var _os = _interopRequireDefault(require("os"));
var _path = _interopRequireDefault(require("path"));
var _dir = require("../../../utils/dir");
var _errors = require("../../../utils/errors");
var _interactive = require("../../../utils/interactive");
var _ora = require("../../../utils/ora");
var _prompts = require("../../../utils/prompts");
var AppleDevice = _interopRequireWildcard(require("./AppleDevice"));
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
function getAppDeltaDirectory(bundleId) {
    // TODO: Maybe use .expo folder instead for debugging
    // TODO: Reuse existing folder from xcode?
    const deltaFolder = _path.default.join(_os.default.tmpdir(), "ios", "app-delta", bundleId);
    (0, _dir).ensureDirectory(deltaFolder);
    return deltaFolder;
}
async function installOnDeviceAsync(props) {
    const { bundle , bundleIdentifier , appDeltaDirectory , udid , deviceName  } = props;
    let indicator;
    try {
        // TODO: Connect for logs
        await AppleDevice.runOnDevice({
            udid,
            appPath: bundle,
            bundleId: bundleIdentifier,
            waitForApp: false,
            deltaPath: appDeltaDirectory,
            onProgress ({ status , isComplete , progress  }) {
                if (!indicator) {
                    indicator = (0, _ora).ora(status).start();
                }
                indicator.text = `${_chalk.default.bold(status)} ${progress}%`;
                if (isComplete) {
                    indicator.succeed();
                }
            }
        });
    } catch (error) {
        if (indicator) {
            indicator.fail();
        }
        if (error.code === "APPLE_DEVICE_LOCKED") {
            var ref;
            // Get the app name from the binary path.
            const appName = (ref = _path.default.basename(bundle).split(".")[0]) != null ? ref : "app";
            if ((0, _interactive).isInteractive() && await (0, _prompts).confirmAsync({
                message: `Cannot launch ${appName} because the device is locked. Unlock ${deviceName} to continue...`,
                initial: true
            })) {
                return installOnDeviceAsync(props);
            }
            throw new _errors.CommandError(`Cannot launch ${appName} on ${deviceName} because the device is locked.`);
        }
        throw error;
    }
}

//# sourceMappingURL=installOnDeviceAsync.js.map