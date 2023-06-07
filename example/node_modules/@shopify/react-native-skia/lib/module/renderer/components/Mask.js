import React from "react";
import { Group } from "./Group";
import { LumaColorFilter } from "./colorFilters/LumaColorFilter";
import { Paint } from "./Paint";
export const Mask = _ref => {
  let {
    children,
    mask,
    mode = "alpha",
    clip = true
  } = _ref;
  return /*#__PURE__*/React.createElement(Group, {
    layer: true
  }, /*#__PURE__*/React.createElement(Group, {
    layer: /*#__PURE__*/React.createElement(Paint, {
      blendMode: "src"
    }, mode === "luminance" && /*#__PURE__*/React.createElement(LumaColorFilter, null))
  }, mask, clip && /*#__PURE__*/React.createElement(Group, {
    layer: /*#__PURE__*/React.createElement(Paint, {
      blendMode: "dstIn"
    })
  }, children)), /*#__PURE__*/React.createElement(Group, {
    blendMode: "srcIn"
  }, children));
};
//# sourceMappingURL=Mask.js.map