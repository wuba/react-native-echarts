"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveLaunchPropsAsync = resolveLaunchPropsAsync;
var _configPlugins = require("@expo/config-plugins");
var _androidAppIdResolver = require("../../start/platforms/android/AndroidAppIdResolver");
var _errors = require("../../utils/errors");
async function getMainActivityAsync(projectRoot) {
    const filePath = await _configPlugins.AndroidConfig.Paths.getAndroidManifestAsync(projectRoot);
    const androidManifest = await _configPlugins.AndroidConfig.Manifest.readAndroidManifestAsync(filePath);
    // Assert MainActivity defined.
    const activity = await _configPlugins.AndroidConfig.Manifest.getRunnableActivity(androidManifest);
    if (!activity) {
        throw new _errors.CommandError("ANDROID_MALFORMED", `${filePath} is missing a runnable activity element.`);
    }
    // Often this is ".MainActivity"
    return activity.$["android:name"];
}
async function resolveLaunchPropsAsync(projectRoot) {
    // Often this is ".MainActivity"
    const mainActivity = await getMainActivityAsync(projectRoot);
    const packageName = await new _androidAppIdResolver.AndroidAppIdResolver(projectRoot).getAppIdFromNativeAsync();
    const launchActivity = `${packageName}/${mainActivity}`;
    return {
        mainActivity,
        launchActivity,
        packageName
    };
}

//# sourceMappingURL=resolveLaunchProps.js.map