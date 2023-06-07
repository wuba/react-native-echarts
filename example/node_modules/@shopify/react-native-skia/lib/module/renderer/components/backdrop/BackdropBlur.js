function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import { Blur } from "../imageFilters";
import { BackdropFilter } from "./BackdropFilter";
export const BackdropBlur = _ref => {
  let {
    blur,
    children,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement(BackdropFilter, _extends({
    filter: /*#__PURE__*/React.createElement(Blur, {
      blur: blur,
      mode: "clamp"
    })
  }, props), children);
};
//# sourceMappingURL=BackdropBlur.js.map