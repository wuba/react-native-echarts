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
function _util() {
  const data = require("util");
  _util = function () {
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
function _cliPlatformIos() {
  const data = require("@react-native-community/cli-platform-ios");
  _cliPlatformIos = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const xcodeEnvFile = '.xcode.env';
const pathSeparator = '/';
function removeLastPathComponent(pathString) {
  const components = pathString.split(pathSeparator);
  components.splice(components.length - 1, 1);
  return components.join(pathSeparator);
}
function pathHasXcodeEnvFile(pathString) {
  const xcodeEnvPath = pathString + pathSeparator + xcodeEnvFile;
  return _fs().default.existsSync(xcodeEnvPath);
}
function pathDoesNotHaveXcodeEnvFile(pathString) {
  return !pathHasXcodeEnvFile(pathString);
}
var _default = {
  label: '.xcode.env',
  description: 'File to customize Xcode environment',
  getDiagnostics: async () => {
    const projectRoot = (0, _cliTools().findProjectRoot)();
    const allPathsHasXcodeEnvFile = (0, _cliPlatformIos().findPodfilePaths)(projectRoot).map(pathString => {
      const basePath = removeLastPathComponent(pathString);
      return pathHasXcodeEnvFile(basePath);
    }).reduce((previousValue, currentValue) => previousValue && currentValue);
    return {
      needsToBeFixed: !allPathsHasXcodeEnvFile
    };
  },
  runAutomaticFix: async ({
    loader
  }) => {
    try {
      loader.stop();
      const templateXcodeEnv = '_xcode.env';
      const projectRoot = (0, _cliTools().findProjectRoot)();
      const templateIosPath = (0, _cliTools().resolveNodeModuleDir)(projectRoot, 'react-native/template/ios');
      const src = templateIosPath + pathSeparator + templateXcodeEnv;
      const copyFileAsync = (0, _util().promisify)(_fs().default.copyFile);
      (0, _cliPlatformIos().findPodfilePaths)(projectRoot).map(removeLastPathComponent)
      // avoid overriding existing .xcode.env
      .filter(pathDoesNotHaveXcodeEnvFile).forEach(async pathString => {
        const destFilePath = pathString + pathSeparator + xcodeEnvFile;
        await copyFileAsync(src, destFilePath);
      });
      loader.succeed('.xcode.env file have been created!');
    } catch (e) {
      loader.fail(e);
    }
  }
};
exports.default = _default;

//# sourceMappingURL=xcodeEnv.js.map