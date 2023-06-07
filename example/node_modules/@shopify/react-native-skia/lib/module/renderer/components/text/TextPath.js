function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
export const TextPath = _ref => {
  let {
    initialOffset = 0,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("skTextPath", _extends({
    initialOffset: initialOffset
  }, props));
};
//# sourceMappingURL=TextPath.js.map