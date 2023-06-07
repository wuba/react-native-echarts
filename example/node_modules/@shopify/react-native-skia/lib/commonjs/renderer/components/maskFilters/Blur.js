"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlurMask = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const BlurMask = _ref => {
  let {
    style = "normal",
    respectCTM = true,
    ...props
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("skBlurMaskFilter", _extends({
    style: style,
    respectCTM: respectCTM
  }, props));
};

exports.BlurMask = BlurMask;
//# sourceMappingURL=Blur.js.map