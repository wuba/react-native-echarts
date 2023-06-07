"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tryLaunchEmulator;
exports.getEmulators = void 0;
function _os() {
  const data = _interopRequireDefault(require("os"));
  _os = function () {
    return data;
  };
  return data;
}
function _execa() {
  const data = _interopRequireDefault(require("execa"));
  _execa = function () {
    return data;
  };
  return data;
}
var _adb = _interopRequireDefault(require("./adb"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const emulatorCommand = process.env.ANDROID_HOME ? `${process.env.ANDROID_HOME}/emulator/emulator` : 'emulator';
const getEmulators = () => {
  try {
    const emulatorsOutput = _execa().default.sync(emulatorCommand, ['-list-avds']).stdout;
    return emulatorsOutput.split(_os().default.EOL).filter(name => name !== '');
  } catch {
    return [];
  }
};
exports.getEmulators = getEmulators;
const launchEmulator = async (emulatorName, adbPath, port) => {
  const manualCommand = `${emulatorCommand} @${emulatorName}`;
  const cp = (0, _execa().default)(emulatorCommand, port ? [`@${emulatorName}`, '-port', `${port}`] : [`@${emulatorName}`], {
    detached: true,
    stdio: 'ignore'
  });
  cp.unref();
  const timeout = 30;
  return new Promise((resolve, reject) => {
    const bootCheckInterval = setInterval(async () => {
      const devices = _adb.default.getDevices(adbPath);
      const connected = port ? devices.find(d => d.includes(`${port}`)) : devices.length > 0;
      if (connected) {
        cleanup();
        resolve(true);
      }
    }, 1000);

    // Reject command after timeout
    const rejectTimeout = setTimeout(() => {
      stopWaitingAndReject(`It took too long to start and connect with Android emulator: ${emulatorName}. You can try starting the emulator manually from the terminal with: ${manualCommand}`);
    }, timeout * 1000);
    const cleanup = () => {
      clearTimeout(rejectTimeout);
      clearInterval(bootCheckInterval);
    };
    const stopWaitingAndReject = message => {
      cleanup();
      reject(new Error(message));
    };
    cp.on('error', ({
      message
    }) => stopWaitingAndReject(message));
    cp.on('exit', () => {
      stopWaitingAndReject(`The emulator (${emulatorName}) quit before it finished opening. You can try starting the emulator manually from the terminal with: ${manualCommand}`);
    });
  });
};
async function tryLaunchEmulator(adbPath, emulatorName, port) {
  const emulators = getEmulators();
  if (emulators.length > 0) {
    try {
      await launchEmulator(emulatorName ?? emulators[0], adbPath, port);
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error === null || error === void 0 ? void 0 : error.message
      };
    }
  }
  return {
    success: false,
    error: 'No emulators found as an output of `emulator -list-avds`'
  };
}

//# sourceMappingURL=tryLaunchEmulator.js.map