"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveDeviceAsync = resolveDeviceAsync;
var _androidDeviceManager = require("../../start/platforms/android/AndroidDeviceManager");
var _hints = require("../hints");
const debug = require("debug")("expo:android:resolveDevice");
async function resolveDeviceAsync(device) {
    if (!device) {
        const manager = await _androidDeviceManager.AndroidDeviceManager.resolveAsync();
        debug(`Resolved default device (name: ${manager.device.name}, pid: ${manager.device.pid})`);
        return manager;
    }
    debug(`Resolving device from argument: ${device}`);
    const manager = device === true ? await _androidDeviceManager.AndroidDeviceManager.resolveAsync({
        shouldPrompt: true
    }) : await _androidDeviceManager.AndroidDeviceManager.resolveFromNameAsync(device);
    (0, _hints).logDeviceArgument(manager.device.name);
    return manager;
}

//# sourceMappingURL=resolveDevice.js.map