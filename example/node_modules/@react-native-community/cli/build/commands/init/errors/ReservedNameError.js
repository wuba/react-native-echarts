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
class ReservedNameError extends _cliTools().CLIError {
  constructor(name) {
    super(`Not a valid name for a project. Please do not use the reserved word "${name}".`);
  }
}
exports.default = ReservedNameError;

//# sourceMappingURL=ReservedNameError.js.map