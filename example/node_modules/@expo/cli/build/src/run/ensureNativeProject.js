"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ensureNativeProjectAsync = ensureNativeProjectAsync;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _clearNativeFolder = require("../prebuild/clearNativeFolder");
var _prebuildAsync = require("../prebuild/prebuildAsync");
var _profile = require("../utils/profile");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function ensureNativeProjectAsync(projectRoot, { platform , install  }) {
    // If the user has an empty android folder then the project won't build, this can happen when they delete the prebuild files in git.
    // Check to ensure most of the core files are in place, and prompt to remove the folder if they aren't.
    await (0, _profile).profile(_clearNativeFolder.promptToClearMalformedNativeProjectsAsync)(projectRoot, [
        platform
    ]);
    // If the project doesn't have native code, prebuild it...
    if (!_fs.default.existsSync(_path.default.join(projectRoot, platform))) {
        await (0, _prebuildAsync).prebuildAsync(projectRoot, {
            install: !!install,
            platforms: [
                platform
            ]
        });
    } else {
        return true;
    }
    return false;
}

//# sourceMappingURL=ensureNativeProject.js.map