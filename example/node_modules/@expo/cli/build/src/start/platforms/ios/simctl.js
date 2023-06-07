"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isOSType = isOSType;
exports.getContainerPathAsync = getContainerPathAsync;
exports.getInfoPlistValueAsync = getInfoPlistValueAsync;
exports.openUrlAsync = openUrlAsync;
exports.openAppIdAsync = openAppIdAsync;
exports.bootAsync = bootAsync;
exports.getBootedSimulatorsAsync = getBootedSimulatorsAsync;
exports.isDeviceBootedAsync = isDeviceBootedAsync;
exports.bootDeviceAsync = bootDeviceAsync;
exports.installAsync = installAsync;
exports.uninstallAsync = uninstallAsync;
exports.getDevicesAsync = getDevicesAsync;
exports.simctlAsync = simctlAsync;
var _spawnAsync = _interopRequireDefault(require("@expo/spawn-async"));
var Log = _interopRequireWildcard(require("../../../log"));
var _errors = require("../../../utils/errors");
var _xcrun = require("./xcrun");
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
function isOSType(value) {
    if (!value || typeof value !== "string") return false;
    const knownTypes = [
        "iOS",
        "tvOS",
        "watchOS",
        "macOS"
    ];
    if (!knownTypes.includes(value)) {
        Log.warn(`Unknown OS type: ${value}. Expected one of: ${knownTypes.join(", ")}`);
    }
    return true;
}
async function getContainerPathAsync(device, { appId  }) {
    try {
        const { stdout  } = await simctlAsync([
            "get_app_container",
            resolveId(device),
            appId
        ]);
        return stdout.trim();
    } catch (error) {
        var ref;
        if ((ref = error.stderr) == null ? void 0 : ref.match(/No such file or directory/)) {
            return null;
        }
        throw error;
    }
}
async function getInfoPlistValueAsync(device, { appId , key  }) {
    const containerPath = await getContainerPathAsync(device, {
        appId
    });
    if (containerPath) {
        try {
            const { output  } = await (0, _spawnAsync).default("defaults", [
                "read",
                `${containerPath}/Info`,
                key
            ], {
                stdio: "pipe"
            });
            return output.join("\n").trim();
        } catch  {
            return null;
        }
    }
    return null;
}
async function openUrlAsync(device, options) {
    try {
        // Skip logging since this is likely to fail.
        await simctlAsync([
            "openurl",
            resolveId(device),
            options.url
        ]);
    } catch (error) {
        var ref;
        if (!((ref = error.stderr) == null ? void 0 : ref.match(/Unable to lookup in current state: Shut/))) {
            throw error;
        }
        // If the device was in a weird in-between state ("Shutting Down" or "Shutdown"), then attempt to reboot it and try again.
        // This can happen when quitting the Simulator app, and immediately pressing `i` to reopen the project.
        // First boot the simulator
        await bootDeviceAsync({
            udid: resolveId(device)
        });
        // Finally, try again...
        return await openUrlAsync(device, options);
    }
}
async function openAppIdAsync(device, options) {
    const results = await openAppIdInternalAsync(device, options);
    // Similar to 194, this is a conformance issue which indicates that the given device has no app that can handle our launch request.
    if (results.status === 4) {
        throw new _errors.CommandError("APP_NOT_INSTALLED", results.stderr);
    }
    return results;
}
async function openAppIdInternalAsync(device, options) {
    try {
        return await simctlAsync([
            "launch",
            resolveId(device),
            options.appId
        ]);
    } catch (error) {
        if ("status" in error) {
            return error;
        }
        throw error;
    }
}
async function bootAsync(device) {
    await bootDeviceAsync(device);
    return isDeviceBootedAsync(device);
}
async function getBootedSimulatorsAsync() {
    const simulatorDeviceInfo = await getRuntimesAsync("devices");
    return Object.values(simulatorDeviceInfo.devices).flatMap((runtime)=>runtime.filter((device)=>device.state === "Booted"
        )
    );
}
async function isDeviceBootedAsync(device) {
    // Simulators can be booted even if the app isn't running :(
    const devices = await getBootedSimulatorsAsync();
    if (device.udid) {
        var ref;
        return (ref = devices.find((bootedDevice)=>bootedDevice.udid === device.udid
        )) != null ? ref : null;
    }
    var ref1;
    return (ref1 = devices[0]) != null ? ref1 : null;
}
async function bootDeviceAsync(device) {
    try {
        // Skip logging since this is likely to fail.
        await simctlAsync([
            "boot",
            device.udid
        ]);
    } catch (error) {
        var ref;
        if (!((ref = error.stderr) == null ? void 0 : ref.match(/Unable to boot device in current state: Booted/))) {
            throw error;
        }
    }
}
async function installAsync(device, options) {
    return simctlAsync([
        "install",
        resolveId(device),
        options.filePath
    ]);
}
async function uninstallAsync(device, options) {
    return simctlAsync([
        "uninstall",
        resolveId(device),
        options.appId
    ]);
}
function parseSimControlJSONResults(input) {
    try {
        return JSON.parse(input);
    } catch (error) {
        // Nov 15, 2020: Observed this can happen when opening the simulator and the simulator prompts the user to update the xcode command line tools.
        // Unexpected token I in JSON at position 0
        if (error.message.includes("Unexpected token")) {
            Log.error(`Apple's simctl returned malformed JSON:\n${input}`);
        }
        throw error;
    }
}
/** Get all runtime devices given a certain type. */ async function getRuntimesAsync(type, query) {
    const result = await simctlAsync([
        "list",
        type,
        "--json",
        query
    ]);
    const info = parseSimControlJSONResults(result.stdout);
    for (const runtime of Object.keys(info.devices)){
        // Given a string like 'com.apple.CoreSimulator.SimRuntime.tvOS-13-4'
        const runtimeSuffix = runtime.split("com.apple.CoreSimulator.SimRuntime.").pop();
        // Create an array [tvOS, 13, 4]
        const [osType, ...osVersionComponents] = runtimeSuffix.split("-");
        // Join the end components [13, 4] -> '13.4'
        const osVersion = osVersionComponents.join(".");
        const sims = info.devices[runtime];
        for (const device of sims){
            device.runtime = runtime;
            device.osVersion = osVersion;
            device.windowName = `${device.name} (${osVersion})`;
            device.osType = osType;
        }
    }
    return info;
}
async function getDevicesAsync() {
    const simulatorDeviceInfo = await getRuntimesAsync("devices");
    return Object.values(simulatorDeviceInfo.devices).flat();
}
async function simctlAsync(args, options) {
    return (0, _xcrun).xcrunAsync([
        "simctl",
        ...args
    ], options);
}
function resolveId(device) {
    var _udid;
    return (_udid = device.udid) != null ? _udid : "booted";
}

//# sourceMappingURL=simctl.js.map