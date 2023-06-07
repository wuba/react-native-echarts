"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpacityMatrix = exports.ColorMatrix = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ColorMatrix = props => {
  return /*#__PURE__*/_react.default.createElement("skMatrixColorFilter", props);
};

exports.ColorMatrix = ColorMatrix;

const OpacityMatrix = opacity => [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, opacity, 0];

exports.OpacityMatrix = OpacityMatrix;
//# sourceMappingURL=Matrix.js.map