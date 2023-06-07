"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveDeviceAsync = resolveDeviceAsync;
exports.isSimulatorDevice = isSimulatorDevice;
var Log = _interopRequireWildcard(require("../../../log"));
var _appleDeviceManager = require("../../../start/platforms/ios/AppleDeviceManager");
var _assertSystemRequirements = require("../../../start/platforms/ios/assertSystemRequirements");
var _promptAppleDevice = require("../../../start/platforms/ios/promptAppleDevice");
var SimControl = _interopRequireWildcard(require("../../../start/platforms/ios/simctl"));
var _errors = require("../../../utils/errors");
var _profile = require("../../../utils/profile");
var _hints = require("../../hints");
var AppleDevice = _interopRequireWildcard(require("../appleDevice/AppleDevice"));
var _promptDevice = require("./promptDevice");
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
/** Get a list of devices (called destinations) that are connected to the host machine. Filter by `osType` if defined. */ async function getDevicesAsync({ osType  } = {}) {
    const connectedDevices = await AppleDevice.getConnectedDevicesAsync();
    const simulators = await (0, _promptAppleDevice).sortDefaultDeviceToBeginningAsync(await (0, _profile).profile(SimControl.getDevicesAsync)(), osType);
    const devices = [
        ...connectedDevices,
        ...simulators
    ];
    // If osType is defined, then filter out ineligible simulators.
    // Only do this inside of the device selection so users who pass the entire device udid can attempt to select any simulator (even if it's invalid).
    return osType ? filterDevicesForOsType(devices, osType) : devices;
}
/** @returns a list of devices, filtered by the provided `osType`. */ function filterDevicesForOsType(devices, osType) {
    return devices.filter((device)=>!("osType" in device) || device.osType === osType
    );
}
async function resolveDeviceAsync(device, { osType  } = {}) {
    await (0, _assertSystemRequirements).assertSystemRequirementsAsync();
    if (!device) {
        /** Finds the first possible device and returns in a booted state. */ const manager = await _appleDeviceManager.AppleDeviceManager.resolveAsync({
            device: {
                osType
            }
        });
        Log.debug(`Resolved default device (name: ${manager.device.name}, udid: ${manager.device.udid}, osType: ${osType})`);
        return manager.device;
    }
    const devices = await getDevicesAsync({
        osType
    });
    const resolved = device === true ? await (0, _promptDevice).promptDeviceAsync(devices) : findDeviceFromSearchValue(devices, device.toLowerCase());
    return ensureBootedAsync(resolved);
}
function isSimulatorDevice(device) {
    return !("deviceType" in device) || device.deviceType.startsWith("com.apple.CoreSimulator.SimDeviceType.");
}
/** @returns device matching the `searchValue` against name or UDID. */ function findDeviceFromSearchValue(devices, searchValue) {
    const device1 = devices.find((device)=>device.udid.toLowerCase() === searchValue || device.name.toLowerCase() === searchValue
    );
    if (!device1) {
        throw new _errors.CommandError("BAD_ARGS", `No device UDID or name matching "${searchValue}"`);
    }
    return device1;
}
/** Ensures the device is booted if it's a simulator. */ async function ensureBootedAsync(device) {
    // --device with no props after
    (0, _hints).logDeviceArgument(device.udid);
    if (isSimulatorDevice(device)) {
        return (0, _appleDeviceManager).ensureSimulatorOpenAsync({
            udid: device.udid
        });
    }
    return device;
}

//# sourceMappingURL=resolveDevice.js.map