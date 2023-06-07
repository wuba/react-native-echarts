"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JoiError = void 0;
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
class JoiError extends _cliTools().CLIError {
  constructor(joiError) {
    const message = joiError.details.map(error => {
      const name = error.path.join('.');
      switch (error.type) {
        case 'object.allowUnknown':
          {
            const value = JSON.stringify(error.context && error.context.value);
            return `
              Unknown option ${name} with value "${value}" was found.
              This is either a typing error or a user mistake. Fixing it will remove this message.
            `;
          }
        default:
          return error.message;
      }
    }).join().trim();
    super(message);
    this.name = 'Config Validation Error';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, JoiError);
    }
  }
}
exports.JoiError = JoiError;

//# sourceMappingURL=errors.js.map