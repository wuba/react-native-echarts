"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLastDeveloperCodeSigningIdAsync = getLastDeveloperCodeSigningIdAsync;
exports.setLastDeveloperCodeSigningIdAsync = setLastDeveloperCodeSigningIdAsync;
var _userSettings = _interopRequireDefault(require("../../../api/user/UserSettings"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function getLastDeveloperCodeSigningIdAsync() {
    const { developmentCodeSigningId  } = await _userSettings.default.readAsync();
    return developmentCodeSigningId != null ? developmentCodeSigningId : null;
}
async function setLastDeveloperCodeSigningIdAsync(id) {
    await _userSettings.default.setAsync("developmentCodeSigningId", id).catch(()=>{});
}

//# sourceMappingURL=settings.js.map