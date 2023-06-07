import { Host, ckEnum } from "./Host";
import { JsiSkImage } from "./JsiSkImage";
import { JsiSkData } from "./JsiSkData";
export class JsiSkImageFactory extends Host {
  constructor(CanvasKit) {
    super(CanvasKit);
  }

  MakeImageFromEncoded(encoded) {
    const image = this.CanvasKit.MakeImageFromEncoded(JsiSkData.fromValue(encoded));

    if (image === null) {
      return null;
    }

    return new JsiSkImage(this.CanvasKit, image);
  }

  MakeImage(info, data, bytesPerRow) {
    // see toSkImageInfo() from canvaskit
    const image = this.CanvasKit.MakeImage({
      alphaType: ckEnum(info.alphaType),
      colorSpace: this.CanvasKit.ColorSpace.SRGB,
      colorType: ckEnum(info.colorType),
      height: info.height,
      width: info.width
    }, JsiSkData.fromValue(data), bytesPerRow);

    if (image === null) {
      return null;
    }

    return new JsiSkImage(this.CanvasKit, image);
  }

}
//# sourceMappingURL=JsiSkImageFactory.js.map