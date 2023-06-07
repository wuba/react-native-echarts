"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.promptForDeviceAsync = promptForDeviceAsync;
var _chalk = _interopRequireDefault(require("chalk"));
var _errors = require("../../../utils/errors");
var _prompts = require("../../../utils/prompts");
var _adb = require("./adb");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function nameStyleForDevice(device) {
    const isActive = device.isBooted;
    if (!isActive) {
        // Use no style changes for a disconnected device that is available to be opened.
        return (text)=>text
        ;
    }
    // A device that is connected and ready to be used should be bolded to match iOS.
    if (device.isAuthorized) {
        return _chalk.default.bold;
    }
    // Devices that are unauthorized and connected cannot be used, but they are connected so gray them out.
    return (text)=>_chalk.default.bold(_chalk.default.gray(text))
    ;
}
async function promptForDeviceAsync(devices) {
    // TODO: provide an option to add or download more simulators
    const { value  } = await (0, _prompts).promptAsync({
        type: "autocomplete",
        name: "value",
        limit: 11,
        message: "Select a device/emulator",
        choices: devices.map((item)=>{
            const format = nameStyleForDevice(item);
            const type = item.isAuthorized ? item.type : "unauthorized";
            return {
                title: `${format(item.name)} ${_chalk.default.dim(`(${type})`)}`,
                value: item.name
            };
        }),
        suggest: (0, _prompts).createSelectionFilter()
    });
    const device = devices.find(({ name  })=>name === value
    );
    if ((device == null ? void 0 : device.isAuthorized) === false) {
        (0, _adb).logUnauthorized(device);
        throw new _errors.AbortCommandError();
    }
    return device;
}

//# sourceMappingURL=promptAndroidDevice.js.map