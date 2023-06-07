"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
class InvalidNameError extends _cliTools().CLIError {
  constructor(name) {
    super(`"${name}" is not a valid name for a project. Please use a valid identifier name (alphanumeric).`);
  }
}
exports.default = InvalidNameError;

//# sourceMappingURL=InvalidNameError.js.map