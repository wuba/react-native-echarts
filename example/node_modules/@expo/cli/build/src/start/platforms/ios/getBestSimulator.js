"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBestBootedSimulatorAsync = getBestBootedSimulatorAsync;
exports.getBestUnbootedSimulatorAsync = getBestUnbootedSimulatorAsync;
exports.getSelectableSimulatorsAsync = getSelectableSimulatorsAsync;
exports.getBestSimulatorAsync = getBestSimulatorAsync;
var _childProcess = require("child_process");
var _errors = require("../../../utils/errors");
var SimControl = _interopRequireWildcard(require("./simctl"));
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
const debug = require("debug")("expo:start:platforms:ios:getBestSimulator");
/**
 * Returns the default device stored in the Simulator.app settings.
 * This helps us to get the device that the user opened most recently regardless of which tool they used.
 */ function getDefaultSimulatorDeviceUDID() {
    try {
        const defaultDeviceUDID = (0, _childProcess).execSync(`defaults read com.apple.iphonesimulator CurrentDeviceUDID`, {
            stdio: "pipe"
        }).toString();
        return defaultDeviceUDID.trim();
    } catch  {
        return null;
    }
}
async function getBestBootedSimulatorAsync({ osType  } = {}) {
    const [simulatorOpenedByApp] = await SimControl.getBootedSimulatorsAsync();
    // This should prevent opening a second simulator in the chance that default
    // simulator doesn't match what the Simulator app would open by default.
    if ((simulatorOpenedByApp == null ? void 0 : simulatorOpenedByApp.udid) && (!osType || osType && simulatorOpenedByApp.osType === osType)) {
        debug(`First booted simulator: ${simulatorOpenedByApp == null ? void 0 : simulatorOpenedByApp.windowName}`);
        return simulatorOpenedByApp;
    }
    debug(`No booted simulator matching requirements (osType: ${osType}).`);
    return null;
}
async function getBestUnbootedSimulatorAsync({ osType  } = {}) {
    var ref;
    const defaultId = getDefaultSimulatorDeviceUDID();
    debug(`Default simulator ID: ${defaultId}`);
    if (defaultId && !osType) {
        return defaultId;
    }
    const simulators = await getSelectableSimulatorsAsync({
        osType
    });
    if (!simulators.length) {
        // TODO: Prompt to install the simulators
        throw new _errors.CommandError("UNSUPPORTED_OS_TYPE", `No ${osType || "iOS"} devices available in Simulator.app`);
    }
    // If the default udid is defined, then check to ensure its osType matches the required os.
    if (defaultId) {
        const defaultSimulator = simulators.find((device)=>device.udid === defaultId
        );
        if ((defaultSimulator == null ? void 0 : defaultSimulator.osType) === osType) {
            return defaultId;
        }
    }
    var ref1;
    // Return first selectable device.
    return (ref1 = (ref = simulators[0]) == null ? void 0 : ref.udid) != null ? ref1 : null;
}
async function getSelectableSimulatorsAsync({ osType ="iOS"  } = {}) {
    const simulators = await SimControl.getDevicesAsync();
    return simulators.filter((device)=>device.isAvailable && device.osType === osType
    );
}
async function getBestSimulatorAsync({ osType  }) {
    const simulatorOpenedByApp = await getBestBootedSimulatorAsync({
        osType
    });
    if (simulatorOpenedByApp) {
        return simulatorOpenedByApp.udid;
    }
    return await getBestUnbootedSimulatorAsync({
        osType
    });
}

//# sourceMappingURL=getBestSimulator.js.map