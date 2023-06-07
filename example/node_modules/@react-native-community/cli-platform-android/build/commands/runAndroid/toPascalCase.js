"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toPascalCase = toPascalCase;
function toPascalCase(value) {
  return value !== '' ? value[0].toUpperCase() + value.slice(1) : value;
}

//# sourceMappingURL=toPascalCase.js.map