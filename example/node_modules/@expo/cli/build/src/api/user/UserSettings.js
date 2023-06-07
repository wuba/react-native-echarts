"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _getUserState = require("@expo/config/build/getUserState");
var _jsonFile = _interopRequireDefault(require("@expo/json-file"));
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/** Return the user cache directory. */ function getDirectory() {
    return (0, _getUserState).getExpoHomeDirectory();
}
function getFilePath() {
    return (0, _getUserState).getUserStatePath();
}
function userSettingsJsonFile() {
    return new _jsonFile.default(getFilePath(), {
        ensureDir: true,
        jsonParseErrorDefault: {},
        cantReadFileDefault: {}
    });
}
async function setSessionAsync(sessionData) {
    await UserSettings.setAsync("auth", sessionData, {
        default: {},
        ensureDir: true
    });
}
function getSession() {
    try {
        var ref;
        var ref1;
        return (ref1 = (ref = _jsonFile.default.read((0, _getUserState).getUserStatePath())) == null ? void 0 : ref.auth) != null ? ref1 : null;
    } catch (error) {
        if (error.code === "ENOENT") {
            return null;
        }
        throw error;
    }
}
function getAccessToken() {
    var _EXPO_TOKEN;
    return (_EXPO_TOKEN = process.env.EXPO_TOKEN) != null ? _EXPO_TOKEN : null;
}
// returns an anonymous, unique identifier for a user on the current computer
async function getAnonymousIdentifierAsync() {
    const settings = await userSettingsJsonFile();
    let id = await settings.getAsync("uuid", null);
    if (!id) {
        id = _crypto.default.randomUUID();
        await settings.setAsync("uuid", id);
    }
    return id;
}
const UserSettings = Object.assign(userSettingsJsonFile(), {
    getSession,
    setSessionAsync,
    getAccessToken,
    getDirectory,
    getFilePath,
    userSettingsJsonFile,
    getAnonymousIdentifierAsync
});
var _default = UserSettings;
exports.default = _default;

//# sourceMappingURL=UserSettings.js.map