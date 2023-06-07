"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _osascript = require("@expo/osascript");
var _spawnAsync = _interopRequireDefault(require("@expo/spawn-async"));
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
const debug = require("debug")("expo:doctor:apple:simulatorApp");
async function getSimulatorAppIdAsync() {
    try {
        return (await (0, _osascript).execAsync('id of app "Simulator"')).trim();
    } catch  {
    // This error may occur in CI where the users intends to install just the simulators but no Xcode.
    }
    return null;
}
class SimulatorAppPrerequisite extends _prerequisite.Prerequisite {
    static instance = new SimulatorAppPrerequisite();
    async assertImplementation() {
        const result = await getSimulatorAppIdAsync();
        if (!result) {
            // This error may occur in CI where the users intends to install just the simulators but no Xcode.
            throw new _prerequisite.PrerequisiteCommandError("SIMULATOR_APP", "Can't determine id of Simulator app; the Simulator is most likely not installed on this machine. Run `sudo xcode-select -s /Applications/Xcode.app`");
        }
        if (result !== "com.apple.iphonesimulator" && result !== "com.apple.CoreSimulator.SimulatorTrampoline") {
            throw new _prerequisite.PrerequisiteCommandError("SIMULATOR_APP", "Simulator is installed but is identified as '" + result + "'; don't know what that is.");
        }
        debug(`Simulator app id: ${result}`);
        try {
            // make sure we can run simctl
            await (0, _spawnAsync).default("xcrun", [
                "simctl",
                "help"
            ]);
        } catch (error) {
            Log.warn(`Unable to run simctl:\n${error.toString()}`);
            throw new _prerequisite.PrerequisiteCommandError("SIMCTL", "xcrun is not configured correctly. Ensure `sudo xcode-select --reset` works before running this command again.");
        }
    }
}
exports.SimulatorAppPrerequisite = SimulatorAppPrerequisite;

//# sourceMappingURL=SimulatorAppPrerequisite.js.map