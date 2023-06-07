"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkSurfaceFactory = void 0;

var _Host = require("./Host");

var _JsiSkSurface = require("./JsiSkSurface");

class JsiSkSurfaceFactory extends _Host.Host {
  constructor(CanvasKit) {
    super(CanvasKit);
  }

  Make(width, height) {
    const surface = this.CanvasKit.MakeSurface(width, height);

    if (!surface) {
      throw new Error("Could not create surface");
    }

    return new _JsiSkSurface.JsiSkSurface(this.CanvasKit, surface);
  }

}

exports.JsiSkSurfaceFactory = JsiSkSurfaceFactory;
//# sourceMappingURL=JsiSkSurfaceFactory.js.map