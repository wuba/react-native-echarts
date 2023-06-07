"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMaskFilter = exports.BlurStyle = void 0;
let BlurStyle;
exports.BlurStyle = BlurStyle;

(function (BlurStyle) {
  BlurStyle[BlurStyle["Normal"] = 0] = "Normal";
  BlurStyle[BlurStyle["Solid"] = 1] = "Solid";
  BlurStyle[BlurStyle["Outer"] = 2] = "Outer";
  BlurStyle[BlurStyle["Inner"] = 3] = "Inner";
})(BlurStyle || (exports.BlurStyle = BlurStyle = {}));

const isMaskFilter = obj => obj !== null && obj.__typename__ === "MaskFilter";

exports.isMaskFilter = isMaskFilter;
//# sourceMappingURL=MaskFilter.js.map