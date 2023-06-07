import React from "react";
import { Group } from "../Group";
export const BackdropFilter = _ref => {
  let {
    filter,
    children: groupChildren,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement(Group, props, /*#__PURE__*/React.createElement("skBackdropFilter", null, filter), groupChildren);
};
//# sourceMappingURL=BackdropFilter.js.map