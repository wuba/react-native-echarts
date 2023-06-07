"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProcessorType = void 0;
/**
 * Returns if the processor is Intel or AMD
 */
const getProcessorType = () => {
  return process.env.PROCESSOR_IDENTIFIER.includes('Intel') ? 'Intel' : 'AMD';
};
exports.getProcessorType = getProcessorType;

//# sourceMappingURL=processorType.js.map