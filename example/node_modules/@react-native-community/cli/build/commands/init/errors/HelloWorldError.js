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
class HelloWorldError extends _cliTools().CLIError {
  constructor() {
    super('Project name shouldn\'t contain "HelloWorld" name in it, because it is CLI\'s default placeholder name.');
  }
}
exports.default = HelloWorldError;

//# sourceMappingURL=HelloWorldError.js.map