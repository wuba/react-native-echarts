"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _envinfo() {
  const data = _interopRequireDefault(require("envinfo"));
  _envinfo = function () {
    return data;
  };
  return data;
}
function _os() {
  const data = require("os");
  _os = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function getEnvironmentInfo(json = true) {
  const options = {
    json,
    showNotFound: true
  };
  let packages = ['react', 'react-native', '@react-native-community/cli'];
  const outOfTreePlatforms = {
    darwin: 'react-native-macos',
    win32: 'react-native-windows'
  };
  const outOfTreePlatformPackage = outOfTreePlatforms[(0, _os().platform)()];
  if (outOfTreePlatformPackage) {
    packages.push(outOfTreePlatformPackage);
  }
  const info = await _envinfo().default.run({
    System: ['OS', 'CPU', 'Memory', 'Shell'],
    Binaries: ['Node', 'Yarn', 'npm', 'Watchman'],
    IDEs: ['Xcode', 'Android Studio', 'Visual Studio'],
    Managers: ['CocoaPods'],
    Languages: ['Java'],
    SDKs: ['iOS SDK', 'Android SDK', 'Windows SDK'],
    npmPackages: packages,
    npmGlobalPackages: ['*react-native*']
  }, options);
  if (options.json) {
    return JSON.parse(info);
  }
  return info.trim();
}
var _default = getEnvironmentInfo;
exports.default = _default;

//# sourceMappingURL=envinfo.js.map