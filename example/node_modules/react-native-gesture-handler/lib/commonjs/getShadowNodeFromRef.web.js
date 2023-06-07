"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShadowNodeFromRef = getShadowNodeFromRef;

// Used by GestureDetector (unsupported on web at the moment) to check whether the
// attached view may get flattened on Fabric. Original implementation causes errors
// on web due to the static resolution of `require` statements by webpack breaking
// the conditional importing.
function getShadowNodeFromRef(_ref) {
  return null;
}
//# sourceMappingURL=getShadowNodeFromRef.web.js.map