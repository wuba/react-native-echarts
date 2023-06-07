"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.extractAsync = extractAsync;
var _spawnAsync = _interopRequireDefault(require("@expo/spawn-async"));
var _tar = _interopRequireDefault(require("tar"));
var Log = _interopRequireWildcard(require("../log"));
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
const debug = require("debug")("expo:utils:tar");
async function extractAsync(input, output) {
    try {
        if (process.platform !== "win32") {
            debug(`Extracting ${input} to ${output}`);
            await (0, _spawnAsync).default("tar", [
                "-xf",
                input,
                "-C",
                output
            ], {
                stdio: "inherit"
            });
            return;
        }
    } catch (error) {
        Log.warn(`Failed to extract tar using native tools, falling back on JS tar module. ${error.message}`);
    }
    debug(`Extracting ${input} to ${output} using JS tar module`);
    // tar node module has previously had problems with big files, and seems to
    // be slower, so only use it as a backup.
    await _tar.default.extract({
        file: input,
        cwd: output
    });
}

//# sourceMappingURL=tar.js.map