"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkRect = void 0;

var _Host = require("./Host");

class JsiSkRect extends _Host.BaseHostObject {
  static fromValue(CanvasKit, rect) {
    if (rect instanceof JsiSkRect) {
      return rect.ref;
    }

    return CanvasKit.XYWHRect(rect.x, rect.y, rect.width, rect.height);
  }

  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Rect");
  }

  get x() {
    return this.ref[0];
  }

  get y() {
    return this.ref[1];
  }

  get width() {
    return this.ref[2] - this.ref[0];
  }

  get height() {
    return this.ref[3] - this.ref[1];
  }

}

exports.JsiSkRect = JsiSkRect;
//# sourceMappingURL=JsiSkRect.js.map