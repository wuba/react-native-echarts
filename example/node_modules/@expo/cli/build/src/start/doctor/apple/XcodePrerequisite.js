"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getXcodeVersionAsync = void 0;
var _childProcess = require("child_process");
var _semver = _interopRequireDefault(require("semver"));
var Log = _interopRequireWildcard(require("../../../log"));
var _errors = require("../../../utils/errors");
var _profile = require("../../../utils/profile");
var _prompts = require("../../../utils/prompts");
var _prerequisite = require("../Prerequisite");
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
const debug = require("debug")("expo:doctor:apple:xcode");
// Based on the RN docs (Aug 2020).
const MIN_XCODE_VERSION = 9.4;
const APP_STORE_ID = "497799835";
const SUGGESTED_XCODE_VERSION = `${MIN_XCODE_VERSION}.0`;
const promptToOpenAppStoreAsync = async (message)=>{
    // This prompt serves no purpose accept informing the user what to do next, we could just open the App Store but it could be confusing if they don't know what's going on.
    const confirm = await (0, _prompts).confirmAsync({
        initial: true,
        message
    });
    if (confirm) {
        Log.log(`Going to the App Store, re-run Expo CLI when Xcode has finished installing.`);
        openAppStore(APP_STORE_ID);
    }
};
const getXcodeVersionAsync = ()=>{
    try {
        var ref;
        const last = (ref = (0, _childProcess).execSync("xcodebuild -version", {
            stdio: "pipe"
        }).toString().match(/^Xcode (\d+\.\d+)/)) == null ? void 0 : ref[1];
        // Convert to a semver string
        if (last) {
            const version = `${last}.0`;
            if (!_semver.default.valid(version)) {
                // Not sure why this would happen, if it does we should add a more confident error message.
                Log.error(`Xcode version is in an unknown format: ${version}`);
                return false;
            }
            return version;
        }
        // not sure what's going on
        Log.error("Unable to check Xcode version. Command ran successfully but no version number was found.");
    } catch  {
    // not installed
    }
    return null;
};
exports.getXcodeVersionAsync = getXcodeVersionAsync;
/**
 * Open a link to the App Store. Just link in mobile apps, **never** redirect without prompting first.
 *
 * @param appId
 */ function openAppStore(appId) {
    const link = getAppStoreLink(appId);
    (0, _childProcess).execSync(`open ${link}`, {
        stdio: "ignore"
    });
}
function getAppStoreLink(appId) {
    if (process.platform === "darwin") {
        // TODO: Is there ever a case where the macappstore isn't available on mac?
        return `macappstore://itunes.apple.com/app/id${appId}`;
    }
    return `https://apps.apple.com/us/app/id${appId}`;
}
class XcodePrerequisite extends _prerequisite.Prerequisite {
    static instance = new XcodePrerequisite();
    /**
   * Ensure Xcode is installed and recent enough to be used with Expo.
   */ async assertImplementation() {
        const version = (0, _profile).profile(getXcodeVersionAsync)();
        debug(`Xcode version: ${version}`);
        if (!version) {
            // Almost certainly Xcode isn't installed.
            await promptToOpenAppStoreAsync(`Xcode must be fully installed before you can continue. Continue to the App Store?`);
            throw new _errors.AbortCommandError();
        }
        if (_semver.default.lt(version, SUGGESTED_XCODE_VERSION)) {
            // Xcode version is too old.
            await promptToOpenAppStoreAsync(`Xcode (${version}) needs to be updated to at least version ${MIN_XCODE_VERSION}. Continue to the App Store?`);
            throw new _errors.AbortCommandError();
        }
    }
}
exports.XcodePrerequisite = XcodePrerequisite;

//# sourceMappingURL=XcodePrerequisite.js.map