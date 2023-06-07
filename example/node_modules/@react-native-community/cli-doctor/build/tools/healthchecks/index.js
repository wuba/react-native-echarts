"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHealthchecks = exports.HEALTHCHECK_TYPES = void 0;
var _nodeJS = _interopRequireDefault(require("./nodeJS"));
var _packageManagers = require("./packageManagers");
var _jdk = _interopRequireDefault(require("./jdk"));
var _watchman = _interopRequireDefault(require("./watchman"));
var _androidHomeEnvVariable = _interopRequireDefault(require("./androidHomeEnvVariable"));
var _androidStudio = _interopRequireDefault(require("./androidStudio"));
var _androidSDK = _interopRequireDefault(require("./androidSDK"));
var _androidNDK = _interopRequireDefault(require("./androidNDK"));
var _xcode = _interopRequireDefault(require("./xcode"));
var _cocoaPods = _interopRequireDefault(require("./cocoaPods"));
var _iosDeploy = _interopRequireDefault(require("./iosDeploy"));
function _cliConfig() {
  const data = _interopRequireDefault(require("@react-native-community/cli-config"));
  _cliConfig = function () {
    return data;
  };
  return data;
}
var _xcodeEnv = _interopRequireDefault(require("./xcodeEnv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const HEALTHCHECK_TYPES = {
  ERROR: 'ERROR',
  WARNING: 'WARNING'
};
exports.HEALTHCHECK_TYPES = HEALTHCHECK_TYPES;
const getHealthchecks = ({
  contributor
}) => {
  let additionalChecks = [];

  // Doctor can run in a detached mode, where there isn't a config so this can fail
  try {
    let config = (0, _cliConfig().default)();
    additionalChecks = config.healthChecks;
  } catch {}
  return {
    common: {
      label: 'Common',
      healthchecks: [_nodeJS.default, _packageManagers.yarn, _packageManagers.npm, ...(process.platform === 'darwin' ? [_watchman.default] : [])]
    },
    android: {
      label: 'Android',
      healthchecks: [_jdk.default, _androidStudio.default, _androidSDK.default, _androidHomeEnvVariable.default, ...(contributor ? [_androidNDK.default] : [])]
    },
    ...(process.platform === 'darwin' ? {
      ios: {
        label: 'iOS',
        healthchecks: [_xcode.default, _cocoaPods.default, _iosDeploy.default, _xcodeEnv.default]
      }
    } : {}),
    ...additionalChecks
  };
};
exports.getHealthchecks = getHealthchecks;

//# sourceMappingURL=index.js.map