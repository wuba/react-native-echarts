"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _fs() {
  const data = _interopRequireDefault(require("fs"));
  _fs = function () {
    return data;
  };
  return data;
}
var _adb = _interopRequireDefault(require("./adb"));
var _runOnAllDevices = _interopRequireDefault(require("./runOnAllDevices"));
var _tryRunAdbReverse = _interopRequireDefault(require("./tryRunAdbReverse"));
var _tryLaunchAppOnDevice = _interopRequireDefault(require("./tryLaunchAppOnDevice"));
var _tryInstallAppOnDevice = _interopRequireDefault(require("./tryInstallAppOnDevice"));
var _getAdbPath = _interopRequireDefault(require("./getAdbPath"));
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
var _getAndroidProject = require("../../config/getAndroidProject");
var _listAndroidDevices = _interopRequireDefault(require("./listAndroidDevices"));
var _tryLaunchEmulator = _interopRequireDefault(require("./tryLaunchEmulator"));
function _chalk() {
  const data = _interopRequireDefault(require("chalk"));
  _chalk = function () {
    return data;
  };
  return data;
}
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
var _buildAndroid = require("../buildAndroid");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Starts the app on a connected Android emulator or device.
 */
async function runAndroid(_argv, config, args) {
  if (args.binaryPath) {
    if (args.tasks) {
      throw new (_cliTools().CLIError)('binary-path and tasks were specified, but they are not compatible. Specify only one');
    }
    args.binaryPath = _path().default.isAbsolute(args.binaryPath) ? args.binaryPath : _path().default.join(config.root, args.binaryPath);
    if (args.binaryPath && !_fs().default.existsSync(args.binaryPath)) {
      throw new (_cliTools().CLIError)('binary-path was specified, but the file was not found.');
    }
  }
  const androidProject = (0, _getAndroidProject.getAndroidProject)(config);
  await (0, _buildAndroid.runPackager)(args, config);
  return buildAndRun(args, androidProject);
}
const defaultPort = 5552;
async function getAvailableDevicePort(port = defaultPort) {
  /**
   * The default value is 5554 for the first virtual device instance running on your machine. A virtual device normally occupies a pair of adjacent ports: a console port and an adb port. The console of the first virtual device running on a particular machine uses console port 5554 and adb port 5555. Subsequent instances use port numbers increasing by two. For example, 5556/5557, 5558/5559, and so on. The range is 5554 to 5682, allowing for 64 concurrent virtual devices.
   */
  const adbPath = (0, _getAdbPath.default)();
  const devices = _adb.default.getDevices(adbPath);
  if (port > 5682) {
    throw new (_cliTools().CLIError)('Failed to launch emulator...');
  }
  if (devices.some(d => d.includes(port.toString()))) {
    return await getAvailableDevicePort(port + 2);
  }
  return port;
}

// Builds the app and runs it on a connected emulator / device.
async function buildAndRun(args, androidProject) {
  process.chdir(androidProject.sourceDir);
  const cmd = process.platform.startsWith('win') ? 'gradlew.bat' : './gradlew';
  const adbPath = (0, _getAdbPath.default)();
  if (args.listDevices) {
    if (args.deviceId) {
      _cliTools().logger.warn('Both "deviceId" and "list-devices" parameters were passed to "run" command. We will list available devices and let you choose from one');
    }
    const device = await (0, _listAndroidDevices.default)();
    if (!device) {
      throw new (_cliTools().CLIError)('Failed to select device, please try to run app without "list-devices" command.');
    }
    if (device.connected) {
      return runOnSpecificDevice({
        ...args,
        deviceId: device.deviceId
      }, adbPath, androidProject);
    }
    const port = await getAvailableDevicePort();
    const emulator = `emulator-${port}`;
    _cliTools().logger.info('Launching emulator...');
    const result = await (0, _tryLaunchEmulator.default)(adbPath, device.readableName, port);
    if (result.success) {
      _cliTools().logger.info('Successfully launched emulator.');
      return runOnSpecificDevice({
        ...args,
        deviceId: emulator
      }, adbPath, androidProject);
    }
    throw new (_cliTools().CLIError)(`Failed to launch emulator. Reason: ${_chalk().default.dim(result.error || '')}`);
  }
  if (args.deviceId) {
    return runOnSpecificDevice(args, adbPath, androidProject);
  } else {
    return (0, _runOnAllDevices.default)(args, cmd, adbPath, androidProject);
  }
}
function runOnSpecificDevice(args, adbPath, androidProject) {
  const devices = _adb.default.getDevices(adbPath);
  const {
    deviceId
  } = args;
  if (devices.length > 0 && deviceId) {
    if (devices.indexOf(deviceId) !== -1) {
      // using '-x lint' in order to ignore linting errors while building the apk
      let gradleArgs = ['build', '-x', 'lint'];
      if (args.extraParams) {
        gradleArgs = [...gradleArgs, ...args.extraParams];
      }
      if (args.port) {
        gradleArgs.push(`-PreactNativeDevServerPort=${args.port}`);
      }
      if (args.activeArchOnly) {
        const architecture = _adb.default.getCPU(adbPath, deviceId);
        if (architecture !== null) {
          _cliTools().logger.info(`Detected architecture ${architecture}`);
          // `reactNativeDebugArchitectures` was renamed to `reactNativeArchitectures` in 0.68.
          // Can be removed when 0.67 no longer needs to be supported.
          gradleArgs.push(`-PreactNativeDebugArchitectures=${architecture}`);
          gradleArgs.push(`-PreactNativeArchitectures=${architecture}`);
        }
      }
      if (!args.binaryPath) {
        (0, _buildAndroid.build)(gradleArgs, androidProject.sourceDir);
      }
      installAndLaunchOnDevice(args, deviceId, adbPath, androidProject);
    } else {
      _cliTools().logger.error(`Could not find device with the id: "${deviceId}". Please choose one of the following:`, ...devices);
    }
  } else {
    _cliTools().logger.error('No Android device or emulator connected.');
  }
}
function installAndLaunchOnDevice(args, selectedDevice, adbPath, androidProject) {
  (0, _tryRunAdbReverse.default)(args.port, selectedDevice);
  (0, _tryInstallAppOnDevice.default)(args, adbPath, selectedDevice, androidProject);
  (0, _tryLaunchAppOnDevice.default)(selectedDevice, androidProject.packageName, adbPath, args);
}
var _default = {
  name: 'run-android',
  description: 'builds your app and starts it on a connected Android emulator or device',
  func: runAndroid,
  options: [..._buildAndroid.options, {
    name: '--appId <string>',
    description: 'Specify an applicationId to launch after build. If not specified, `package` from AndroidManifest.xml will be used.',
    default: ''
  }, {
    name: '--appIdSuffix <string>',
    description: 'Specify an applicationIdSuffix to launch after build.',
    default: ''
  }, {
    name: '--main-activity <string>',
    description: 'Name of the activity to start',
    default: 'MainActivity'
  }, {
    name: '--deviceId <string>',
    description: 'builds your app and starts it on a specific device/simulator with the ' + 'given device id (listed by running "adb devices" on the command line).'
  }, {
    name: '--list-devices',
    description: 'Lists all available Android devices and simulators and let you choose one to run the app',
    default: false
  }, {
    name: '--binary-path <string>',
    description: 'Path relative to project root where pre-built .apk binary lives.'
  }]
};
exports.default = _default;

//# sourceMappingURL=index.js.map