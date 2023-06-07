"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVGRenderer = SVGRenderer;
var _Painter = _interopRequireDefault(require("zrender/lib/svg/Painter.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function SVGRenderer(registers) {
  registers.registerPainter('svg', _Painter.default);
}
//# sourceMappingURL=SVGRenderer.web.js.map