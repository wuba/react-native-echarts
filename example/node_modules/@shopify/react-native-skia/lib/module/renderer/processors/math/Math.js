/**
 * Linear interpolation
 * @param value
 * @param x
 * @param y
 */
export const mix = (value, x, y) => x * (1 - value) + y * value;
/**
 *  @summary Clamps a node with a lower and upper bound.
 *  @example
    clamp(-1, 0, 100); // 0
    clamp(1, 0, 100); // 1
    clamp(101, 0, 100); // 100
  */

export const clamp = (value, lowerBound, upperBound) => Math.min(Math.max(lowerBound, value), upperBound);
//# sourceMappingURL=Math.js.map