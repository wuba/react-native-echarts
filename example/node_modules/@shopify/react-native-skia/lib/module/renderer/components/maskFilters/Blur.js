function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
export const BlurMask = _ref => {
  let {
    style = "normal",
    respectCTM = true,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("skBlurMaskFilter", _extends({
    style: style,
    respectCTM: respectCTM
  }, props));
};
//# sourceMappingURL=Blur.js.map