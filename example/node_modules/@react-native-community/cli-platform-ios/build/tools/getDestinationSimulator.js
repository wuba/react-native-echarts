"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDestinationSimulator = getDestinationSimulator;
function _child_process() {
  const data = _interopRequireDefault(require("child_process"));
  _child_process = function () {
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
var _findMatchingSimulator = _interopRequireDefault(require("./findMatchingSimulator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getDestinationSimulator(args, fallbackSimulators = []) {
  let simulators;
  try {
    simulators = JSON.parse(_child_process().default.execFileSync('xcrun', ['simctl', 'list', '--json', 'devices'], {
      encoding: 'utf8'
    }));
  } catch (error) {
    throw new (_cliTools().CLIError)('Could not get the simulator list from Xcode. Please open Xcode and try running project directly from there to resolve the remaining issues.', error);
  }
  const selectedSimulator = fallbackSimulators.reduce((simulator, fallback) => {
    return simulator || (0, _findMatchingSimulator.default)(simulators, {
      simulator: fallback
    });
  }, (0, _findMatchingSimulator.default)(simulators, args));
  if (!selectedSimulator) {
    throw new (_cliTools().CLIError)(`No simulator available with ${args.simulator ? `name "${args.simulator}"` : `udid "${args.udid}"`}`);
  }
  return selectedSimulator;
}

//# sourceMappingURL=getDestinationSimulator.js.map