"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processRadius = void 0;

const processRadius = (Skia, radius) => {
  if (typeof radius === "number") {
    return Skia.Point(radius, radius);
  }

  return radius;
};

exports.processRadius = processRadius;
//# sourceMappingURL=Radius.js.map