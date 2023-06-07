"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processTransformProps = void 0;

var _types = require("../../../skia/types");

const processTransformProps = (m3, props) => {
  const {
    transform,
    origin,
    matrix
  } = props;

  if (matrix) {
    if (origin) {
      m3.translate(origin.x, origin.y);
      m3.concat(matrix);
      m3.translate(-origin.x, -origin.y);
    } else {
      m3.concat(matrix);
    }
  } else if (transform) {
    if (origin) {
      m3.translate(origin.x, origin.y);
    }

    (0, _types.processTransform)(m3, transform);

    if (origin) {
      m3.translate(-origin.x, -origin.y);
    }
  }
};

exports.processTransformProps = processTransformProps;
//# sourceMappingURL=Transform.js.map