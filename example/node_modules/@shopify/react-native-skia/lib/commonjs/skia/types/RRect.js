"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRRect = void 0;

// We have an issue to check property existence on JSI backed instances
const isRRect = def => // eslint-disable-next-line @typescript-eslint/no-explicit-any
def.rect !== undefined;

exports.isRRect = isRRect;
//# sourceMappingURL=RRect.js.map