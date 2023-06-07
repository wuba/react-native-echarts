"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageShader = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ImageShader = _ref => {
  let {
    tx = "decal",
    ty = "decal",
    fm = "nearest",
    mm = "none",
    fit = "none",
    transform = [],
    ...props
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("skImageShader", _extends({
    tx: tx,
    ty: ty,
    fm: fm,
    mm: mm,
    fit: fit,
    transform: transform
  }, props));
};

exports.ImageShader = ImageShader;
//# sourceMappingURL=ImageShader.js.map