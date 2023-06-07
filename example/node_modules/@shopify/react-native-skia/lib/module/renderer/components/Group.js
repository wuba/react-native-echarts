function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { isValidElement } from "react";
export const Group = _ref => {
  let {
    layer,
    ...props
  } = _ref;

  if ( /*#__PURE__*/isValidElement(layer) && typeof layer === "object") {
    return /*#__PURE__*/React.createElement("skLayer", null, layer, /*#__PURE__*/React.createElement("skGroup", props));
  }

  return /*#__PURE__*/React.createElement("skGroup", _extends({
    layer: layer
  }, props));
};
//# sourceMappingURL=Group.js.map