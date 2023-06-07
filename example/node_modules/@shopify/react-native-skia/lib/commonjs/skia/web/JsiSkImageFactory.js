"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkImageFactory = void 0;

var _Host = require("./Host");

var _JsiSkImage = require("./JsiSkImage");

var _JsiSkData = require("./JsiSkData");

class JsiSkImageFactory extends _Host.Host {
  constructor(CanvasKit) {
    super(CanvasKit);
  }

  MakeImageFromEncoded(encoded) {
    const image = this.CanvasKit.MakeImageFromEncoded(_JsiSkData.JsiSkData.fromValue(encoded));

    if (image === null) {
      return null;
    }

    return new _JsiSkImage.JsiSkImage(this.CanvasKit, image);
  }

  MakeImage(info, data, bytesPerRow) {
    // see toSkImageInfo() from canvaskit
    const image = this.CanvasKit.MakeImage({
      alphaType: (0, _Host.ckEnum)(info.alphaType),
      colorSpace: this.CanvasKit.ColorSpace.SRGB,
      colorType: (0, _Host.ckEnum)(info.colorType),
      height: info.height,
      width: info.width
    }, _JsiSkData.JsiSkData.fromValue(data), bytesPerRow);

    if (image === null) {
      return null;
    }

    return new _JsiSkImage.JsiSkImage(this.CanvasKit, image);
  }

}

exports.JsiSkImageFactory = JsiSkImageFactory;
//# sourceMappingURL=JsiSkImageFactory.js.map