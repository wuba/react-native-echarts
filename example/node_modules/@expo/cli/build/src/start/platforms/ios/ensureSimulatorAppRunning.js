"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ensureSimulatorAppRunningAsync = ensureSimulatorAppRunningAsync;
var osascript = _interopRequireWildcard(require("@expo/osascript"));
var _spawnAsync = _interopRequireDefault(require("@expo/spawn-async"));
var Log = _interopRequireWildcard(require("../../../log"));
var _delay = require("../../../utils/delay");
var _errors = require("../../../utils/errors");
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
async function ensureSimulatorAppRunningAsync(device, { maxWaitTime  } = {}) {
    if (await isSimulatorAppRunningAsync()) {
        return;
    }
    Log.log(`\u203A Opening the iOS simulator, this might take a moment.`);
    // In theory this would ensure the correct simulator is booted as well.
    // This isn't theory though, this is Xcode.
    await openSimulatorAppAsync(device);
    if (!await waitForSimulatorAppToStart({
        maxWaitTime
    })) {
        throw new _errors.CommandError("SIMULATOR_TIMEOUT", `Simulator app did not open fast enough. Try opening Simulator first, then running your app.`);
    }
}
async function waitForSimulatorAppToStart({ maxWaitTime  } = {}) {
    return (0, _delay).waitForActionAsync({
        interval: 50,
        maxWaitTime,
        action: isSimulatorAppRunningAsync
    });
}
// I think the app can be open while no simulators are booted.
async function isSimulatorAppRunningAsync() {
    try {
        const zeroMeansNo = (await osascript.execAsync('tell app "System Events" to count processes whose name is "Simulator"')).trim();
        if (zeroMeansNo === "0") {
            return false;
        }
    } catch (error) {
        if (error.message.includes("Application isn\u2019t running")) {
            return false;
        }
        throw error;
    }
    return true;
}
async function openSimulatorAppAsync(device) {
    const args = [
        "-a",
        "Simulator"
    ];
    if (device.udid) {
        // This has no effect if the app is already running.
        args.push("--args", "-CurrentDeviceUDID", device.udid);
    }
    await (0, _spawnAsync).default("open", args);
}

//# sourceMappingURL=ensureSimulatorAppRunning.js.map