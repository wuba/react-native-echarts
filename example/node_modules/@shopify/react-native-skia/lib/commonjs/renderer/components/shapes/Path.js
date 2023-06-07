"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Path = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Path = _ref => {
  let {
    start = 0,
    end = 1,
    ...props
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("skPath", _extends({
    start: start,
    end: end
  }, props));
};

exports.Path = Path;
//# sourceMappingURL=Path.js.map