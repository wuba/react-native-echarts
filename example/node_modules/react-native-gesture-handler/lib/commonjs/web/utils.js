"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPointerInBounds = isPointerInBounds;

function isPointerInBounds(view, {
  x,
  y
}) {
  const rect = view.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}
//# sourceMappingURL=utils.js.map