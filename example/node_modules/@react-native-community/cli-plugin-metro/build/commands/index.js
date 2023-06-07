"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "buildBundleWithConfig", {
  enumerable: true,
  get: function () {
    return _bundle.buildBundleWithConfig;
  }
});
exports.default = void 0;
var _bundle = require("./bundle");
var _start = _interopRequireDefault(require("./start"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = [_bundle.bundleCommand, _bundle.ramBundleCommand, _start.default];
exports.default = _default;

//# sourceMappingURL=index.js.map