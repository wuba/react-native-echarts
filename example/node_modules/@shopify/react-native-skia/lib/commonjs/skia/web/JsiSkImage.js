"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkImage = void 0;

var _Host = require("./Host");

var _JsiSkMatrix = require("./JsiSkMatrix");

var _JsiSkShader = require("./JsiSkShader");

/*global btoa, atob*/
class JsiSkImage extends _Host.HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Image");
  }

  height() {
    return this.ref.height();
  }

  width() {
    return this.ref.width();
  }

  makeShaderOptions(tx, ty, fm, mm, localMatrix) {
    return new _JsiSkShader.JsiSkShader(this.CanvasKit, this.ref.makeShaderOptions((0, _Host.ckEnum)(tx), (0, _Host.ckEnum)(ty), (0, _Host.ckEnum)(fm), (0, _Host.ckEnum)(mm), localMatrix ? _JsiSkMatrix.JsiSkMatrix.fromValue(localMatrix) : undefined));
  }

  makeShaderCubic(tx, ty, B, C, localMatrix) {
    return new _JsiSkShader.JsiSkShader(this.CanvasKit, this.ref.makeShaderCubic((0, _Host.ckEnum)(tx), (0, _Host.ckEnum)(ty), B, C, localMatrix ? _JsiSkMatrix.JsiSkMatrix.fromValue(localMatrix) : undefined));
  }

  encodeToBytes(fmt, quality) {
    let result;

    if (fmt && quality) {
      result = this.ref.encodeToBytes((0, _Host.ckEnum)(fmt), quality);
    } else if (fmt) {
      result = this.ref.encodeToBytes((0, _Host.ckEnum)(fmt));
    } else {
      result = this.ref.encodeToBytes();
    }

    if (!result) {
      throw new Error("encodeToBytes failed");
    }

    return result;
  }

  encodeToBase64(fmt, quality) {
    const bytes = this.encodeToBytes(fmt, quality);
    return btoa(String.fromCharCode(...bytes));
  }

}

exports.JsiSkImage = JsiSkImage;
//# sourceMappingURL=JsiSkImage.js.map