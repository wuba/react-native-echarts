"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadSkiaWeb = exports.LoadSkia = void 0;

var _canvaskit = _interopRequireDefault(require("canvaskit-wasm/bin/full/canvaskit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const LoadSkiaWeb = async opts => {
  if (global.CanvasKit !== undefined) {
    return;
  }

  const CanvasKit = await (0, _canvaskit.default)(opts); // The CanvasKit API is stored on the global object and used
  // to create the JsiSKApi in the Skia.web.ts file.

  global.CanvasKit = CanvasKit;
}; // We keep this function for backward compatibility


exports.LoadSkiaWeb = LoadSkiaWeb;
const LoadSkia = LoadSkiaWeb;
exports.LoadSkia = LoadSkia;
//# sourceMappingURL=LoadSkiaWeb.js.map