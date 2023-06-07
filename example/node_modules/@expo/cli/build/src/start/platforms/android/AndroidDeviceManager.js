"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _assert = _interopRequireDefault(require("assert"));
var _chalk = _interopRequireDefault(require("chalk"));
var Log = _interopRequireWildcard(require("../../../log"));
var _errors = require("../../../utils/errors");
var _url = require("../../../utils/url");
var _deviceManager = require("../DeviceManager");
var _expoGoInstaller = require("../ExpoGoInstaller");
var _activateWindow = require("./activateWindow");
var AndroidDebugBridge = _interopRequireWildcard(require("./adb"));
var _emulator = require("./emulator");
var _getDevices = require("./getDevices");
var _promptAndroidDevice = require("./promptAndroidDevice");
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
const EXPO_GO_APPLICATION_IDENTIFIER = "host.exp.exponent";
class AndroidDeviceManager extends _deviceManager.DeviceManager {
    static async resolveFromNameAsync(name) {
        const devices = await (0, _getDevices).getDevicesAsync();
        const device1 = devices.find((device)=>device.name === name
        );
        if (!device1) {
            throw new _errors.CommandError("Could not find device with name: " + name);
        }
        return AndroidDeviceManager.resolveAsync({
            device: device1,
            shouldPrompt: false
        });
    }
    static async resolveAsync({ device , shouldPrompt  } = {}) {
        if (device) {
            const manager = new AndroidDeviceManager(device);
            if (!await manager.attemptToStartAsync()) {
                throw new _errors.AbortCommandError();
            }
            return manager;
        }
        const devices = await (0, _getDevices).getDevicesAsync();
        const _device = shouldPrompt ? await (0, _promptAndroidDevice).promptForDeviceAsync(devices) : devices[0];
        return AndroidDeviceManager.resolveAsync({
            device: _device,
            shouldPrompt: false
        });
    }
    get name() {
        // TODO: Maybe strip `_` from the device name?
        return this.device.name;
    }
    get identifier() {
        var _pid;
        return (_pid = this.device.pid) != null ? _pid : "unknown";
    }
    async getAppVersionAsync(applicationId) {
        var ref;
        const info = await AndroidDebugBridge.getPackageInfoAsync(this.device, {
            appId: applicationId
        });
        const regex = /versionName=([0-9.]+)/;
        var ref1;
        return (ref1 = (ref = regex.exec(info)) == null ? void 0 : ref[1]) != null ? ref1 : null;
    }
    async attemptToStartAsync() {
        // TODO: Add a light-weight method for checking since a device could disconnect.
        if (!await AndroidDebugBridge.isDeviceBootedAsync(this.device)) {
            this.device = await (0, _emulator).startDeviceAsync(this.device);
        }
        if (this.device.isAuthorized === false) {
            AndroidDebugBridge.logUnauthorized(this.device);
            return null;
        }
        return this.device;
    }
    async startAsync() {
        const device = await this.attemptToStartAsync();
        (0, _assert).default(device, `Failed to boot emulator.`);
        return this.device;
    }
    async installAppAsync(binaryPath) {
        await AndroidDebugBridge.installAsync(this.device, {
            filePath: binaryPath
        });
    }
    async uninstallAppAsync(appId) {
        // we need to check if the app is installed, else we might bump into "Failure [DELETE_FAILED_INTERNAL_ERROR]"
        const isInstalled = await this.isAppInstalledAsync(appId);
        if (!isInstalled) {
            return;
        }
        try {
            await AndroidDebugBridge.uninstallAsync(this.device, {
                appId
            });
        } catch (e) {
            Log.error(`Could not uninstall app "${appId}" from your device, please uninstall it manually and try again.`);
            throw e;
        }
    }
    /**
   * @param launchActivity Activity to launch `[application identifier]/.[main activity name]`, ex: `com.bacon.app/.MainActivity`
   */ async launchActivityAsync(launchActivity) {
        try {
            return await AndroidDebugBridge.launchActivityAsync(this.device, {
                launchActivity
            });
        } catch (error) {
            let errorMessage = `Couldn't open Android app with activity "${launchActivity}" on device "${this.name}".`;
            if (error instanceof _errors.CommandError && error.code === "APP_NOT_INSTALLED") {
                errorMessage += `\nThe app might not be installed, try installing it with: ${_chalk.default.bold(`npx expo run:android -d ${this.name}`)}`;
            }
            errorMessage += _chalk.default.gray(`\n${error.message}`);
            error.message = errorMessage;
            throw error;
        }
    }
    async isAppInstalledAsync(applicationId) {
        return await AndroidDebugBridge.isPackageInstalledAsync(this.device, applicationId);
    }
    async openUrlAsync(url) {
        // Non-compliant URLs will be treated as application identifiers.
        if (!(0, _url).validateUrl(url, {
            requireProtocol: true
        })) {
            await this.launchActivityAsync(url);
            return;
        }
        const parsed = new URL(url);
        if (parsed.protocol === "exp:") {
            // NOTE(brentvatne): temporary workaround! launch Expo Go first, then
            // launch the project!
            // https://github.com/expo/expo/issues/7772
            // adb shell monkey -p host.exp.exponent -c android.intent.category.LAUNCHER 1
            // Note: this is not needed in Expo Development Client, it only applies to Expo Go
            await AndroidDebugBridge.openAppIdAsync({
                pid: this.device.pid
            }, {
                applicationId: EXPO_GO_APPLICATION_IDENTIFIER
            });
        }
        await AndroidDebugBridge.openUrlAsync({
            pid: this.device.pid
        }, {
            url
        });
    }
    async activateWindowAsync() {
        // Bring the emulator window to the front on macos devices.
        await (0, _activateWindow).activateWindowAsync(this.device);
    }
    async ensureExpoGoAsync(sdkVersion) {
        const installer = new _expoGoInstaller.ExpoGoInstaller("android", EXPO_GO_APPLICATION_IDENTIFIER, sdkVersion);
        return installer.ensureAsync(this);
    }
}
exports.AndroidDeviceManager = AndroidDeviceManager;

//# sourceMappingURL=AndroidDeviceManager.js.map