"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assertSdkRoot = assertSdkRoot;
var _assert = _interopRequireDefault(require("assert"));
var _fs = _interopRequireDefault(require("fs"));
var _os = _interopRequireDefault(require("os"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * The default Android SDK locations per platform.
 * @see https://developer.android.com/studio/run/emulator-commandline#filedir
 * @see https://developer.android.com/studio/intro/studio-config#optimize-studio-windows
 */ const ANDROID_DEFAULT_LOCATION = {
    darwin: _path.default.join(_os.default.homedir(), "Library", "Android", "sdk"),
    linux: _path.default.join(_os.default.homedir(), "Android", "sdk"),
    win32: _path.default.join(_os.default.homedir(), "AppData", "Local", "Android", "Sdk")
};
function assertSdkRoot() {
    if (process.env.ANDROID_HOME) {
        (0, _assert).default(_fs.default.existsSync(process.env.ANDROID_HOME), `Failed to resolve the Android SDK path. ANDROID_HOME is set to a non-existing path: ${process.env.ANDROID_HOME}`);
        return process.env.ANDROID_HOME;
    }
    if (process.env.ANDROID_SDK_ROOT) {
        (0, _assert).default(_fs.default.existsSync(process.env.ANDROID_SDK_ROOT), `Failed to resolve the Android SDK path. Deprecated ANDROID_SDK_ROOT is set to a non-existing path: ${process.env.ANDROID_SDK_ROOT}. Use ANDROID_HOME instead.`);
        return process.env.ANDROID_SDK_ROOT;
    }
    const defaultLocation = ANDROID_DEFAULT_LOCATION[process.platform];
    if (defaultLocation) {
        (0, _assert).default(_fs.default.existsSync(defaultLocation), `Failed to resolve the Android SDK path. Default install location not found: ${defaultLocation}. Use ANDROID_HOME to set the Android SDK location.`);
        return defaultLocation;
    }
    return null;
}

//# sourceMappingURL=AndroidSdk.js.map