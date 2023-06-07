"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _child_process() {
  const data = require("child_process");
  _child_process = function () {
    return data;
  };
  return data;
}
var _adb = _interopRequireDefault(require("./adb"));
var _getAdbPath = _interopRequireDefault(require("./getAdbPath"));
var _tryLaunchEmulator = require("./tryLaunchEmulator");
var _toPascalCase = require("./toPascalCase");
function _os() {
  const data = _interopRequireDefault(require("os"));
  _os = function () {
    return data;
  };
  return data;
}
function _prompts() {
  const data = _interopRequireDefault(require("prompts"));
  _prompts = function () {
    return data;
  };
  return data;
}
function _chalk() {
  const data = _interopRequireDefault(require("chalk"));
  _chalk = function () {
    return data;
  };
  return data;
}
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 *
 * @param deviceId string
 * @returns name of Android emulator
 */
function getEmulatorName(deviceId) {
  const adbPath = (0, _getAdbPath.default)();
  const buffer = (0, _child_process().execSync)(`${adbPath} -s ${deviceId} emu avd name`);

  // 1st line should get us emu name
  return buffer.toString().split(_os().default.EOL)[0].replace(/(\r\n|\n|\r)/gm, '').trim();
}

/**
 *
 * @param deviceId string
 * @returns Android device name in readable format
 */
function getPhoneName(deviceId) {
  const adbPath = (0, _getAdbPath.default)();
  const buffer = (0, _child_process().execSync)(`${adbPath} -s ${deviceId} shell getprop | grep ro.product.model`);
  return buffer.toString().replace(/\[ro\.product\.model\]:\s*\[(.*)\]/, '$1').trim();
}
async function promptForDeviceSelection(allDevices) {
  if (!allDevices.length) {
    throw new (_cliTools().CLIError)('No devices and/or emulators connected. Please create emulator with Android Studio or connect Android device.');
  }
  const {
    device
  } = await (0, _prompts().default)({
    type: 'select',
    name: 'device',
    message: 'Select the device / emulator you want to use',
    choices: allDevices.map(d => ({
      title: `${_chalk().default.bold(`${(0, _toPascalCase.toPascalCase)(d.type)}`)} ${_chalk().default.green(`${d.readableName}`)} (${d.connected ? 'connected' : 'disconnected'})`,
      value: d
    })),
    min: 1
  });
  return device;
}
async function listAndroidDevices() {
  const adbPath = (0, _getAdbPath.default)();
  const devices = _adb.default.getDevices(adbPath);
  let allDevices = [];
  devices.forEach(deviceId => {
    if (deviceId.includes('emulator')) {
      const emulatorData = {
        deviceId,
        readableName: getEmulatorName(deviceId),
        connected: true,
        type: 'emulator'
      };
      allDevices = [...allDevices, emulatorData];
    } else {
      const phoneData = {
        deviceId,
        readableName: getPhoneName(deviceId),
        type: 'phone',
        connected: true
      };
      allDevices = [...allDevices, phoneData];
    }
  });
  const emulators = (0, _tryLaunchEmulator.getEmulators)();

  // Find not booted ones:
  emulators.forEach(emulatorName => {
    // skip those already booted
    if (allDevices.some(device => device.readableName === emulatorName)) {
      return;
    }
    const emulatorData = {
      deviceId: undefined,
      readableName: emulatorName,
      type: 'emulator',
      connected: false
    };
    allDevices = [...allDevices, emulatorData];
  });
  const selectedDevice = await promptForDeviceSelection(allDevices);
  return selectedDevice;
}
var _default = listAndroidDevices;
exports.default = _default;

//# sourceMappingURL=listAndroidDevices.js.map