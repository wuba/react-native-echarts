function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
export const ImageShader = _ref => {
  let {
    tx = "decal",
    ty = "decal",
    fm = "nearest",
    mm = "none",
    fit = "none",
    transform = [],
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("skImageShader", _extends({
    tx: tx,
    ty: ty,
    fm: fm,
    mm: mm,
    fit: fit,
    transform: transform
  }, props));
};
//# sourceMappingURL=ImageShader.js.map