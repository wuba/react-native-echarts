"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackdropFilter = void 0;

var _react = _interopRequireDefault(require("react"));

var _Group = require("../Group");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BackdropFilter = _ref => {
  let {
    filter,
    children: groupChildren,
    ...props
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_Group.Group, props, /*#__PURE__*/_react.default.createElement("skBackdropFilter", null, filter), groupChildren);
};

exports.BackdropFilter = BackdropFilter;
//# sourceMappingURL=BackdropFilter.js.map