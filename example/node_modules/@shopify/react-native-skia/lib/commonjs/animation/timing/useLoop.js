"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLoop = void 0;

var _useTiming = require("./useTiming");

/**
 * Configures a looped timing value. The value will go back and forth
 * between 0 and 1 and back.
 * @param config Timing configuration for easing and duration
 * @returns A value that can be used for further animations
 */
const useLoop = config => (0, _useTiming.useTiming)({
  yoyo: true,
  loop: true
}, config);

exports.useLoop = useLoop;
//# sourceMappingURL=useLoop.js.map