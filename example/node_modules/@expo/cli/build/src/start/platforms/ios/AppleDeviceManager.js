"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ensureSimulatorOpenAsync = ensureSimulatorOpenAsync;
var osascript = _interopRequireWildcard(require("@expo/osascript"));
var _assert = _interopRequireDefault(require("assert"));
var _chalk = _interopRequireDefault(require("chalk"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _delay = require("../../../utils/delay");
var _errors = require("../../../utils/errors");
var _plist = require("../../../utils/plist");
var _url = require("../../../utils/url");
var _deviceManager = require("../DeviceManager");
var _expoGoInstaller = require("../ExpoGoInstaller");
var _assertSystemRequirements = require("./assertSystemRequirements");
var _ensureSimulatorAppRunning = require("./ensureSimulatorAppRunning");
var _getBestSimulator = require("./getBestSimulator");
var _promptAppleDevice = require("./promptAppleDevice");
var SimControl = _interopRequireWildcard(require("./simctl"));
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
const debug = require("debug")("expo:start:platforms:ios:AppleDeviceManager");
const EXPO_GO_BUNDLE_IDENTIFIER = "host.exp.Exponent";
async function ensureSimulatorOpenAsync({ udid , osType  } = {}, tryAgain = true) {
    // Use a default simulator if none was specified
    if (!udid) {
        // If a simulator is open, side step the entire booting sequence.
        const simulatorOpenedByApp = await (0, _getBestSimulator).getBestBootedSimulatorAsync({
            osType
        });
        if (simulatorOpenedByApp) {
            return simulatorOpenedByApp;
        }
        // Otherwise, find the best possible simulator from user defaults and continue
        const bestUdid = await (0, _getBestSimulator).getBestUnbootedSimulatorAsync({
            osType
        });
        if (!bestUdid) {
            throw new _errors.CommandError("No simulators found.");
        }
        udid = bestUdid;
    }
    const bootedDevice = await (0, _delay).waitForActionAsync({
        action: ()=>{
            // Just for the type check.
            (0, _assert).default(udid);
            return SimControl.bootAsync({
                udid
            });
        }
    });
    if (!bootedDevice) {
        // Give it a second chance, this might not be needed but it could potentially lead to a better UX on slower devices.
        if (tryAgain) {
            return await ensureSimulatorOpenAsync({
                udid,
                osType
            }, false);
        }
        // TODO: We should eliminate all needs for a timeout error, it's bad UX to get an error about the simulator not starting while the user can clearly see it starting on their slow computer.
        throw new _errors.CommandError("SIMULATOR_TIMEOUT", `Simulator didn't boot fast enough. Try opening Simulator first, then running your app.`);
    }
    return bootedDevice;
}
class AppleDeviceManager extends _deviceManager.DeviceManager {
    static assertSystemRequirementsAsync = _assertSystemRequirements.assertSystemRequirementsAsync;
    static async resolveAsync({ device , shouldPrompt  } = {}) {
        if (shouldPrompt) {
            const devices = await (0, _getBestSimulator).getSelectableSimulatorsAsync(device);
            device = await (0, _promptAppleDevice).promptAppleDeviceAsync(devices, device == null ? void 0 : device.osType);
        }
        const booted = await ensureSimulatorOpenAsync(device);
        return new AppleDeviceManager(booted);
    }
    get name() {
        return this.device.name;
    }
    get identifier() {
        return this.device.udid;
    }
    async getAppVersionAsync(appId) {
        return await SimControl.getInfoPlistValueAsync(this.device, {
            appId,
            key: "CFBundleShortVersionString"
        });
    }
    async startAsync() {
        return ensureSimulatorOpenAsync({
            osType: this.device.osType,
            udid: this.device.udid
        });
    }
    async launchApplicationIdAsync(appId) {
        try {
            const result = await SimControl.openAppIdAsync(this.device, {
                appId
            });
            if (result.status === 0) {
                await this.activateWindowAsync();
            } else {
                throw new _errors.CommandError(result.stderr);
            }
        } catch (error) {
            let errorMessage = `Couldn't open iOS app with ID "${appId}" on device "${this.name}".`;
            if (error instanceof _errors.CommandError && error.code === "APP_NOT_INSTALLED") {
                if (appId === EXPO_GO_BUNDLE_IDENTIFIER) {
                    errorMessage = `Couldn't open Expo Go app on device "${this.name}". Please install.`;
                } else {
                    errorMessage += `\nThe app might not be installed, try installing it with: ${_chalk.default.bold(`expo run:ios -d ${this.device.udid}`)}`;
                }
            }
            if (error.stderr) {
                errorMessage += _chalk.default.gray(`\n${error.stderr}`);
            } else if (error.message) {
                errorMessage += _chalk.default.gray(`\n${error.message}`);
            }
            throw new _errors.CommandError(errorMessage);
        }
    }
    async installAppAsync(filePath) {
        await SimControl.installAsync(this.device, {
            filePath
        });
        await this.waitForAppInstalledAsync(await this.getApplicationIdFromBundle(filePath));
    }
    async getApplicationIdFromBundle(filePath) {
        debug("getApplicationIdFromBundle:", filePath);
        const builtInfoPlistPath = _path.default.join(filePath, "Info.plist");
        if (_fs.default.existsSync(builtInfoPlistPath)) {
            const { CFBundleIdentifier  } = await (0, _plist).parsePlistAsync(builtInfoPlistPath);
            debug("getApplicationIdFromBundle: using built Info.plist", CFBundleIdentifier);
            return CFBundleIdentifier;
        }
        debug("getApplicationIdFromBundle: no Info.plist found");
        return EXPO_GO_BUNDLE_IDENTIFIER;
    }
    async waitForAppInstalledAsync(applicationId) {
        while(true){
            if (await this.isAppInstalledAsync(applicationId)) {
                return true;
            }
            await (0, _delay).delayAsync(100);
        }
    }
    async uninstallAppAsync(appId) {
        await SimControl.uninstallAsync(this.device, {
            appId
        });
    }
    async isAppInstalledAsync(appId) {
        return !!await SimControl.getContainerPathAsync(this.device, {
            appId
        });
    }
    async openUrlAsync(url) {
        // Non-compliant URLs will be treated as application identifiers.
        if (!(0, _url).validateUrl(url, {
            requireProtocol: true
        })) {
            return await this.launchApplicationIdAsync(url);
        }
        try {
            await SimControl.openUrlAsync(this.device, {
                url
            });
        } catch (error) {
            // 194 means the device does not conform to a given URL, in this case we'll assume that the desired app is not installed.
            if (error.status === 194) {
                // An error was encountered processing the command (domain=NSOSStatusErrorDomain, code=-10814):
                // The operation couldn’t be completed. (OSStatus error -10814.)
                //
                // This can be thrown when no app conforms to the URI scheme that we attempted to open.
                throw new _errors.CommandError("APP_NOT_INSTALLED", `Device ${this.device.name} (${this.device.udid}) has no app to handle the URI: ${url}`);
            }
            throw error;
        }
    }
    async activateWindowAsync() {
        await (0, _ensureSimulatorAppRunning).ensureSimulatorAppRunningAsync(this.device);
        // TODO: Focus the individual window
        await osascript.execAsync(`tell application "Simulator" to activate`);
    }
    async ensureExpoGoAsync(sdkVersion) {
        const installer = new _expoGoInstaller.ExpoGoInstaller("ios", EXPO_GO_BUNDLE_IDENTIFIER, sdkVersion);
        return installer.ensureAsync(this);
    }
}
exports.AppleDeviceManager = AppleDeviceManager;

//# sourceMappingURL=AppleDeviceManager.js.map