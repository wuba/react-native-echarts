"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasAdbReverseAsync = hasAdbReverseAsync;
exports.startAdbReverseAsync = startAdbReverseAsync;
exports.stopAdbReverseAsync = stopAdbReverseAsync;
var Log = _interopRequireWildcard(require("../../../log"));
var _exit = require("../../../utils/exit");
var _androidSdk = require("./AndroidSdk");
var _adb = require("./adb");
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
const debug = require("debug")("expo:start:platforms:android:adbReverse");
let removeExitHook = null;
function hasAdbReverseAsync() {
    try {
        return !!(0, _androidSdk).assertSdkRoot();
    } catch (error) {
        debug("Failed to resolve the Android SDK path, skipping ADB: %s", error.message);
        return false;
    }
}
async function startAdbReverseAsync(ports) {
    // Install cleanup automatically...
    removeExitHook = (0, _exit).installExitHooks(()=>{
        stopAdbReverseAsync(ports);
    });
    const devices = await (0, _adb).getAttachedDevicesAsync();
    for (const device of devices){
        for (const port of ports){
            if (!await adbReverseAsync(device, port)) {
                debug(`Failed to start reverse port ${port} on device "${device.name}"`);
                return false;
            }
        }
    }
    return true;
}
async function stopAdbReverseAsync(ports) {
    removeExitHook == null ? void 0 : removeExitHook();
    const devices = await (0, _adb).getAttachedDevicesAsync();
    for (const device of devices){
        for (const port of ports){
            await adbReverseRemoveAsync(device, port);
        }
    }
}
async function adbReverseAsync(device, port) {
    if (!device.isAuthorized) {
        (0, _adb).logUnauthorized(device);
        return false;
    }
    try {
        await (0, _adb).getServer().runAsync((0, _adb).adbArgs(device.pid, "reverse", `tcp:${port}`, `tcp:${port}`));
        return true;
    } catch (error) {
        Log.warn(`[ADB] Couldn't reverse port ${port}: ${error.message}`);
        return false;
    }
}
async function adbReverseRemoveAsync(device, port) {
    if (!device.isAuthorized) {
        return false;
    }
    try {
        await (0, _adb).getServer().runAsync((0, _adb).adbArgs(device.pid, "reverse", "--remove", `tcp:${port}`));
        return true;
    } catch (error) {
        // Don't send this to warn because we call this preemptively sometimes
        debug(`Could not unforward port ${port}: ${error.message}`);
        return false;
    }
}

//# sourceMappingURL=adbReverse.js.map