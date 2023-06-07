"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.whichEmulator = whichEmulator;
exports.listAvdsAsync = listAvdsAsync;
exports.startDeviceAsync = startDeviceAsync;
exports.EMULATOR_MAX_WAIT_TIMEOUT = void 0;
var _spawnAsync = _interopRequireDefault(require("@expo/spawn-async"));
var _chalk = _interopRequireDefault(require("chalk"));
var _childProcess = require("child_process");
var _os = _interopRequireDefault(require("os"));
var Log = _interopRequireWildcard(require("../../../log"));
var _errors = require("../../../utils/errors");
var _exit = require("../../../utils/exit");
var _adb = require("./adb");
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
const EMULATOR_MAX_WAIT_TIMEOUT = 60 * 1000 * 3;
exports.EMULATOR_MAX_WAIT_TIMEOUT = EMULATOR_MAX_WAIT_TIMEOUT;
function whichEmulator() {
    // https://developer.android.com/studio/command-line/variables
    // TODO: Add ANDROID_SDK_ROOT support as well https://github.com/expo/expo/pull/16516#discussion_r820037917
    if (process.env.ANDROID_HOME) {
        return `${process.env.ANDROID_HOME}/emulator/emulator`;
    }
    return "emulator";
}
async function listAvdsAsync() {
    try {
        const { stdout  } = await (0, _spawnAsync).default(whichEmulator(), [
            "-list-avds"
        ]);
        return stdout.split(_os.default.EOL).filter(Boolean).map((name)=>({
                name,
                type: "emulator",
                // unsure from this
                isBooted: false,
                isAuthorized: true
            })
        );
    } catch  {
        return [];
    }
}
async function startDeviceAsync(device, { timeout =EMULATOR_MAX_WAIT_TIMEOUT , interval =1000  } = {}) {
    Log.log(`\u203A Opening emulator ${_chalk.default.bold(device.name)}`);
    // Start a process to open an emulator
    const emulatorProcess = (0, _childProcess).spawn(whichEmulator(), [
        `@${device.name}`
    ], {
        stdio: "ignore",
        detached: true
    });
    emulatorProcess.unref();
    return new Promise((resolve, reject)=>{
        const waitTimer = setInterval(async ()=>{
            try {
                const bootedDevices = await (0, _adb).getAttachedDevicesAsync();
                const connected = bootedDevices.find(({ name  })=>name === device.name
                );
                if (connected) {
                    const isBooted = await (0, _adb).isBootAnimationCompleteAsync(connected.pid);
                    if (isBooted) {
                        stopWaiting();
                        resolve(connected);
                    }
                }
            } catch (error) {
                stopWaiting();
                reject(error);
            }
        }, interval);
        // Reject command after timeout
        const maxTimer = setTimeout(()=>{
            const manualCommand = `${whichEmulator()} @${device.name}`;
            stopWaitingAndReject(`It took too long to start the Android emulator: ${device.name}. You can try starting the emulator manually from the terminal with: ${manualCommand}`);
        }, timeout);
        const stopWaiting = ()=>{
            clearTimeout(maxTimer);
            clearInterval(waitTimer);
            removeExitHook();
        };
        const stopWaitingAndReject = (message)=>{
            stopWaiting();
            reject(new Error(message));
        };
        const removeExitHook = (0, _exit).installExitHooks((signal)=>{
            stopWaiting();
            emulatorProcess.kill(signal);
            reject(new _errors.AbortCommandError());
        });
        emulatorProcess.on("error", ({ message  })=>stopWaitingAndReject(message)
        );
        emulatorProcess.on("exit", ()=>{
            const manualCommand = `${whichEmulator()} @${device.name}`;
            stopWaitingAndReject(`The emulator (${device.name}) quit before it finished opening. You can try starting the emulator manually from the terminal with: ${manualCommand}`);
        });
    });
}

//# sourceMappingURL=emulator.js.map