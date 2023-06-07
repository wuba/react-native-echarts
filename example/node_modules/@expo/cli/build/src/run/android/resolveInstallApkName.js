"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveInstallApkNameAsync = resolveInstallApkNameAsync;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _adb = require("../../start/platforms/android/adb");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:run:android:resolveInstallApkName");
async function resolveInstallApkNameAsync(device, { appName , buildType , flavors , apkVariantDirectory  }) {
    const availableCPUs = await (0, _adb).getDeviceABIsAsync(device);
    availableCPUs.push(_adb.DeviceABI.universal);
    debug("Supported ABIs: " + availableCPUs.join(", "));
    debug("Searching for APK: " + apkVariantDirectory);
    // Check for cpu specific builds first
    for (const availableCPU of availableCPUs){
        const apkName = getApkFileName(appName, buildType, flavors, availableCPU);
        const apkPath = _path.default.join(apkVariantDirectory, apkName);
        debug("Checking for APK at:", apkPath);
        if (_fs.default.existsSync(apkPath)) {
            return apkName;
        }
    }
    // Otherwise use the default apk named after the variant: app-debug.apk
    const apkName = getApkFileName(appName, buildType, flavors);
    const apkPath = _path.default.join(apkVariantDirectory, apkName);
    debug("Checking for fallback APK at:", apkPath);
    if (_fs.default.existsSync(apkPath)) {
        return apkName;
    }
    return null;
}
function getApkFileName(appName, buildType, flavors, cpuArch) {
    let apkName = `${appName}-`;
    if (flavors) {
        apkName += flavors.reduce((rest, flavor)=>`${rest}${flavor}-`
        , "");
    }
    if (cpuArch) {
        apkName += `${cpuArch}-`;
    }
    apkName += `${buildType}.apk`;
    return apkName;
}

//# sourceMappingURL=resolveInstallApkName.js.map