"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _execa() {
  const data = _interopRequireDefault(require("execa"));
  _execa = function () {
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
async function runBundleInstall(loader) {
  try {
    loader.start('Installing Bundler');
    await (0, _execa().default)('bundle', ['install']);
  } catch (error) {
    loader.fail();
    _cliTools().logger.error(error.stderr || error.stdout);
    throw new Error('Looks like your iOS environment is not properly set. Please go to https://reactnative.dev/docs/next/environment-setup and follow the React Native CLI QuickStart guide for macOS and iOS.');
  }
  loader.succeed();
}
var _default = runBundleInstall;
exports.default = _default;

//# sourceMappingURL=runBundleInstall.js.map