"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commands = void 0;
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _loadConfig.default;
  }
});
var _config = _interopRequireDefault(require("./commands/config"));
var _loadConfig = _interopRequireDefault(require("./loadConfig"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const commands = [_config.default];
exports.commands = commands;

//# sourceMappingURL=index.js.map