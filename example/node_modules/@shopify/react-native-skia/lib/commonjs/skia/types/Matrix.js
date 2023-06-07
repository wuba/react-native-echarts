"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toDegrees = exports.processTransform = exports.isMatrix = exports.MatrixIndex = void 0;
let MatrixIndex;
exports.MatrixIndex = MatrixIndex;

(function (MatrixIndex) {
  MatrixIndex[MatrixIndex["ScaleX"] = 0] = "ScaleX";
  MatrixIndex[MatrixIndex["SkewX"] = 1] = "SkewX";
  MatrixIndex[MatrixIndex["TransX"] = 2] = "TransX";
  MatrixIndex[MatrixIndex["SkewY"] = 3] = "SkewY";
  MatrixIndex[MatrixIndex["ScaleY"] = 4] = "ScaleY";
  MatrixIndex[MatrixIndex["TransY"] = 5] = "TransY";
  MatrixIndex[MatrixIndex["Persp0"] = 6] = "Persp0";
  MatrixIndex[MatrixIndex["Persp1"] = 7] = "Persp1";
  MatrixIndex[MatrixIndex["Persp2"] = 8] = "Persp2";
})(MatrixIndex || (exports.MatrixIndex = MatrixIndex = {}));

const isMatrix = obj => obj !== null && obj.__typename__ === "Matrix";

exports.isMatrix = isMatrix;

const processTransform = (m, transforms) => {
  for (const transform of transforms) {
    const key = Object.keys(transform)[0];
    const value = transform[key];

    if (key === "translateX") {
      m.translate(value, 0);
      continue;
    }

    if (key === "translateY") {
      m.translate(0, value);
      continue;
    }

    if (key === "scale") {
      m.scale(value, value);
      continue;
    }

    if (key === "scaleX") {
      m.scale(value, 1);
      continue;
    }

    if (key === "scaleY") {
      m.scale(1, value);
      continue;
    }

    if (key === "skewX") {
      m.skew(value, 0);
      continue;
    }

    if (key === "skewY") {
      m.skew(0, value);
      continue;
    }

    if (key === "rotate" || key === "rotateZ") {
      if (isMatrix(m)) {
        m.rotate(value);
      } else {
        m.rotate(toDegrees(value), 0, 0);
      }

      continue;
    }

    exhaustiveCheck(key);
  }

  return m;
};

exports.processTransform = processTransform;

const exhaustiveCheck = a => {
  throw new Error(`Unknown transformation: ${a}`);
};

const toDegrees = rad => {
  return rad * 180 / Math.PI;
};

exports.toDegrees = toDegrees;
//# sourceMappingURL=Matrix.js.map