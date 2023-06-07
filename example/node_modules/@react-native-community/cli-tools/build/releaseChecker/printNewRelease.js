"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = printNewRelease;
function _chalk() {
  const data = _interopRequireDefault(require("chalk"));
  _chalk = function () {
    return data;
  };
  return data;
}
var _logger = _interopRequireDefault(require("../logger"));
var _releaseCacheManager = _interopRequireDefault(require("./releaseCacheManager"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Notifies the user that a newer version of React Native is available.
 */
function printNewRelease(name, latestRelease, currentVersion) {
  _logger.default.info(`React Native v${latestRelease.version} is now available (your project is running on v${currentVersion}).`);
  _logger.default.info(`Changelog: ${_chalk().default.dim.underline(latestRelease.changelogUrl)}`);
  _logger.default.info(`Diff: ${_chalk().default.dim.underline(latestRelease.diffUrl)}`);
  _logger.default.info(`For more info, check out "${_chalk().default.dim.underline('https://reactnative.dev/docs/upgrading')}".`);
  _releaseCacheManager.default.set(name, 'lastChecked', new Date().toISOString());
}

//# sourceMappingURL=printNewRelease.js.map