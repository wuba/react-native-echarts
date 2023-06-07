"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _spawnAsync = _interopRequireDefault(require("@expo/spawn-async"));
var _prerequisite = require("./Prerequisite");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class SecurityBinPrerequisite extends _prerequisite.Prerequisite {
    static instance = new SecurityBinPrerequisite();
    async assertImplementation() {
        try {
            // make sure we can run security
            await (0, _spawnAsync).default("which", [
                "security"
            ]);
        } catch  {
            throw new _prerequisite.PrerequisiteCommandError("SECURITY_BIN", "Cannot code sign project because the CLI `security` is not available on your computer.\nPlease ensure it's installed and try again.");
        }
    }
}
exports.SecurityBinPrerequisite = SecurityBinPrerequisite;

//# sourceMappingURL=SecurityBinPrerequisite.js.map