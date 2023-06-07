"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mix = exports.clamp = void 0;

/**
 * Linear interpolation
 * @param value
 * @param x
 * @param y
 */
const mix = (value, x, y) => x * (1 - value) + y * value;
/**
 *  @summary Clamps a node with a lower and upper bound.
 *  @example
    clamp(-1, 0, 100); // 0
    clamp(1, 0, 100); // 1
    clamp(101, 0, 100); // 100
  */


exports.mix = mix;

const clamp = (value, lowerBound, upperBound) => Math.min(Math.max(lowerBound, value), upperBound);

exports.clamp = clamp;
//# sourceMappingURL=Math.js.map