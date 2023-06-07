"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commands = void 0;
Object.defineProperty(exports, "installPods", {
  enumerable: true,
  get: function () {
    return _installPods.default;
  }
});
Object.defineProperty(exports, "versionRanges", {
  enumerable: true,
  get: function () {
    return _versionRanges.default;
  }
});
var _doctor = _interopRequireDefault(require("./commands/doctor"));
var _info = _interopRequireDefault(require("./commands/info"));
var _versionRanges = _interopRequireDefault(require("./tools/versionRanges"));
var _installPods = _interopRequireDefault(require("./tools/installPods"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const commands = {
  info: _info.default,
  doctor: _doctor.default
};

/**
 * @todo
 * We should not rely on this file from other packages, e.g. CLI. We probably need to
 * refactor the init in order to remove that connection.
 */
exports.commands = commands;

//# sourceMappingURL=index.js.map