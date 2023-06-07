"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackdropBlur = void 0;

var _react = _interopRequireDefault(require("react"));

var _imageFilters = require("../imageFilters");

var _BackdropFilter = require("./BackdropFilter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const BackdropBlur = _ref => {
  let {
    blur,
    children,
    ...props
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_BackdropFilter.BackdropFilter, _extends({
    filter: /*#__PURE__*/_react.default.createElement(_imageFilters.Blur, {
      blur: blur,
      mode: "clamp"
    })
  }, props), children);
};

exports.BackdropBlur = BackdropBlur;
//# sourceMappingURL=BackdropBlur.js.map