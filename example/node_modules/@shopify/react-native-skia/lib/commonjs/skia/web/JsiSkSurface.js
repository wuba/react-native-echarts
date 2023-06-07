"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkSurface = void 0;

var _Host = require("./Host");

var _JsiSkCanvas = require("./JsiSkCanvas");

var _JsiSkImage = require("./JsiSkImage");

var _JsiSkRect = require("./JsiSkRect");

class JsiSkSurface extends _Host.HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Surface");
  }

  getCanvas() {
    return new _JsiSkCanvas.JsiSkCanvas(this.CanvasKit, this.ref.getCanvas());
  }

  makeImageSnapshot(bounds) {
    const image = this.ref.makeImageSnapshot(bounds ? Array.from(_JsiSkRect.JsiSkRect.fromValue(this.CanvasKit, bounds)) : undefined);
    return new _JsiSkImage.JsiSkImage(this.CanvasKit, image);
  }

}

exports.JsiSkSurface = JsiSkSurface;
//# sourceMappingURL=JsiSkSurface.js.map