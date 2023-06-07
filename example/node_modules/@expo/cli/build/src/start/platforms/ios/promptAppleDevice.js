"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sortDefaultDeviceToBeginningAsync = sortDefaultDeviceToBeginningAsync;
exports.promptAppleDeviceAsync = promptAppleDeviceAsync;
var _chalk = _interopRequireDefault(require("chalk"));
var _prompts = require("../../../utils/prompts");
var _getBestSimulator = require("./getBestSimulator");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function sortDefaultDeviceToBeginningAsync(devices, osType) {
    const defaultId = await (0, _getBestSimulator).getBestSimulatorAsync({
        osType
    });
    if (defaultId) {
        let iterations = 0;
        while(devices[0].udid !== defaultId && iterations < devices.length){
            devices.push(devices.shift());
            iterations++;
        }
    }
    return devices;
}
async function promptAppleDeviceAsync(devices, osType) {
    devices = await sortDefaultDeviceToBeginningAsync(devices, osType);
    const results = await promptAppleDeviceInternalAsync(devices);
    return devices.find(({ udid  })=>results === udid
    );
}
async function promptAppleDeviceInternalAsync(devices) {
    // TODO: provide an option to add or download more simulators
    // TODO: Add support for physical devices too.
    const { value  } = await (0, _prompts).promptAsync({
        type: "autocomplete",
        name: "value",
        limit: 11,
        message: "Select a simulator",
        choices: devices.map((item)=>{
            const isActive = item.state === "Booted";
            const format = isActive ? _chalk.default.bold : (text)=>text
            ;
            return {
                title: `${format(item.name)} ${_chalk.default.dim(`(${item.osVersion})`)}`,
                value: item.udid
            };
        }),
        suggest: (0, _prompts).createSelectionFilter()
    });
    return value;
}

//# sourceMappingURL=promptAppleDevice.js.map