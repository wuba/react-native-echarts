"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _spawnAsync = _interopRequireDefault(require("@expo/spawn-async"));
var _promises = _interopRequireDefault(require("fs/promises"));
var Log = _interopRequireWildcard(require("../../../log"));
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
const ERROR_CODE = "XCODE_DEVELOPER_DISK_IMAGE";
async function getXcodePathAsync() {
    try {
        const { stdout  } = await (0, _spawnAsync).default("xcode-select", [
            "-p"
        ]);
        if (stdout) {
            return stdout.trim();
        }
    } catch (error) {
        Log.debug(`Could not find Xcode path: %O`, error);
    }
    throw new _prerequisite.PrerequisiteCommandError(ERROR_CODE, "Unable to locate Xcode.");
}
class XcodeDeveloperDiskImagePrerequisite extends _prerequisite.Prerequisite {
    static instance = new XcodeDeveloperDiskImagePrerequisite();
    async assertImplementation({ version  }) {
        const xcodePath = await getXcodePathAsync();
        // Like "11.2 (15C107)"
        const versions = await _promises.default.readdir(`${xcodePath}/Platforms/iPhoneOS.platform/DeviceSupport/`);
        const prefix = version.match(/\d+\.\d+/);
        if (prefix === null) {
            throw new _prerequisite.PrerequisiteCommandError(ERROR_CODE, `Invalid iOS version: ${version}`);
        }
        for (const directory of versions){
            if (directory.includes(prefix[0])) {
                return `${xcodePath}/Platforms/iPhoneOS.platform/DeviceSupport/${directory}/DeveloperDiskImage.dmg`;
            }
        }
        throw new _prerequisite.PrerequisiteCommandError(ERROR_CODE, `Unable to find Developer Disk Image path for SDK ${version}.`);
    }
}
exports.XcodeDeveloperDiskImagePrerequisite = XcodeDeveloperDiskImagePrerequisite;

//# sourceMappingURL=XcodeDeveloperDiskImagePrerequisite.js.map