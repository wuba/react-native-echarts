"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkTypeface = void 0;

var _Host = require("./Host");

class JsiSkTypeface extends _Host.HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Typeface");
  }

  get bold() {
    console.warn("Typeface.bold is deprecated and will be removed in a future release. The property will return false.");
    return false;
  }

  get italic() {
    console.warn("Typeface.italic is deprecated and will be removed in a future release. The property will return false.");
    return false;
  }

}

exports.JsiSkTypeface = JsiSkTypeface;
//# sourceMappingURL=JsiSkTypeface.js.map