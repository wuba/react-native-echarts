"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscretePathEffect = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const DiscretePathEffect = _ref => {
  let {
    seed = 0,
    ...props
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("skDiscretePathEffect", _extends({
    seed: seed
  }, props));
};

exports.DiscretePathEffect = DiscretePathEffect;
//# sourceMappingURL=Discrete.js.map