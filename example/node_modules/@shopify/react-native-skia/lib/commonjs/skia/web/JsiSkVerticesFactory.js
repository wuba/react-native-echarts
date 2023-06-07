"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MakeVertices = void 0;

var _Host = require("./Host");

var _JsiSkVertices = require("./JsiSkVertices");

const concat = function () {
  let totalLength = 0;

  for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
    arrays[_key] = arguments[_key];
  }

  for (const arr of arrays) {
    totalLength += arr.length;
  }

  const result = new Float32Array(totalLength);
  let offset = 0;

  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }

  return result;
};

const MakeVertices = (CanvasKit, mode, positions, textureCoordinates, colors, indices, isVolatile) => new _JsiSkVertices.JsiSkVertices(CanvasKit, CanvasKit.MakeVertices((0, _Host.ckEnum)(mode), positions.map(_ref => {
  let {
    x,
    y
  } = _ref;
  return [x, y];
}).flat(), (textureCoordinates || []).map(_ref2 => {
  let {
    x,
    y
  } = _ref2;
  return [x, y];
}).flat(), !colors ? null : colors.reduce((a, c) => concat(a, c)), indices, isVolatile));

exports.MakeVertices = MakeVertices;
//# sourceMappingURL=JsiSkVerticesFactory.js.map