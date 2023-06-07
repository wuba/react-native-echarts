"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = build;
exports.options = exports.default = void 0;
exports.runPackager = runPackager;
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
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
var _getAndroidProject = require("../../config/getAndroidProject");
var _adb = _interopRequireDefault(require("../runAndroid/adb"));
var _getAdbPath = _interopRequireDefault(require("../runAndroid/getAdbPath"));
var _startServerInNewWindow = require("./startServerInNewWindow");
var _getTaskNames = require("../runAndroid/getTaskNames");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function runPackager(args, config) {
  if (!args.packager) {
    return;
  }
  const result = await (0, _cliTools().isPackagerRunning)(args.port);
  if (result === 'running') {
    _cliTools().logger.info('JS server already running.');
  } else if (result === 'unrecognized') {
    _cliTools().logger.warn('JS server not recognized, continuing with build...');
  } else {
    // result == 'not_running'
    _cliTools().logger.info('Starting JS server...');
    try {
      (0, _startServerInNewWindow.startServerInNewWindow)(args.port, args.terminal, config.reactNativePath);
    } catch (error) {
      _cliTools().logger.warn(`Failed to automatically start the packager server. Please run "react-native start" manually. Error details: ${error.message}`);
    }
  }
}
async function buildAndroid(_argv, config, args) {
  const androidProject = (0, _getAndroidProject.getAndroidProject)(config);
  if (args.variant) {
    _cliTools().logger.warn('"variant" flag is deprecated and will be removed in future release. Please switch to "mode" flag.');
  }
  if (args.tasks && args.mode) {
    _cliTools().logger.warn('Both "tasks" and "mode" parameters were passed to "build" command. Using "tasks" for building the app.');
  }
  let gradleArgs = (0, _getTaskNames.getTaskNames)(androidProject.appName, args.mode || args.variant, args.tasks, 'assemble');
  if (args.extraParams) {
    gradleArgs = [...gradleArgs, ...args.extraParams];
  }
  if (args.activeArchOnly) {
    const adbPath = (0, _getAdbPath.default)();
    const devices = _adb.default.getDevices(adbPath);
    const architectures = devices.map(device => {
      return _adb.default.getCPU(adbPath, device);
    }).filter((arch, index, array) => arch != null && array.indexOf(arch) === index);
    if (architectures.length > 0) {
      _cliTools().logger.info(`Detected architectures ${architectures.join(', ')}`);
      // `reactNativeDebugArchitectures` was renamed to `reactNativeArchitectures` in 0.68.
      // Can be removed when 0.67 no longer needs to be supported.
      gradleArgs.push('-PreactNativeDebugArchitectures=' + architectures.join(','));
      gradleArgs.push('-PreactNativeArchitectures=' + architectures.join(','));
    }
  }
  await runPackager(args, config);
  return build(gradleArgs, androidProject.sourceDir);
}
function build(gradleArgs, sourceDir) {
  process.chdir(sourceDir);
  const cmd = process.platform.startsWith('win') ? 'gradlew.bat' : './gradlew';
  _cliTools().logger.info('Building the app...');
  _cliTools().logger.debug(`Running command "${cmd} ${gradleArgs.join(' ')}"`);
  try {
    _execa().default.sync(cmd, gradleArgs, {
      stdio: 'inherit',
      cwd: sourceDir
    });
  } catch (error) {
    throw new (_cliTools().CLIError)('Failed to build the app.', error);
  }
}
const options = [{
  name: '--mode <string>',
  description: "Specify your app's build variant"
}, {
  name: '--variant <string>',
  description: "Specify your app's build variant. Deprecated! Use 'mode' instead"
}, {
  name: '--no-packager',
  description: 'Do not launch packager while building'
}, {
  name: '--port <number>',
  default: process.env.RCT_METRO_PORT || 8081,
  parse: Number
}, {
  name: '--terminal <string>',
  description: 'Launches the Metro Bundler in a new window using the specified terminal path.',
  default: (0, _cliTools().getDefaultUserTerminal)()
}, {
  name: '--tasks <list>',
  description: 'Run custom Gradle tasks. By default it\'s "assembleDebug". Will override passed mode and variant arguments.',
  parse: val => val.split(',')
}, {
  name: '--active-arch-only',
  description: 'Build native libraries only for the current device architecture for debug builds.',
  default: false
}, {
  name: '--extra-params <string>',
  description: 'Custom properties passed to gradle build command',
  parse: val => val.split(' ')
}];
exports.options = options;
var _default = {
  name: 'build-android',
  description: 'builds your app',
  func: buildAndroid,
  options: options
};
exports.default = _default;

//# sourceMappingURL=index.js.map