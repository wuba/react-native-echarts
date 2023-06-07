/*global btoa, atob*/
import { ckEnum, HostObject } from "./Host";
import { JsiSkMatrix } from "./JsiSkMatrix";
import { JsiSkShader } from "./JsiSkShader";
export class JsiSkImage extends HostObject {
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
    return new JsiSkShader(this.CanvasKit, this.ref.makeShaderOptions(ckEnum(tx), ckEnum(ty), ckEnum(fm), ckEnum(mm), localMatrix ? JsiSkMatrix.fromValue(localMatrix) : undefined));
  }

  makeShaderCubic(tx, ty, B, C, localMatrix) {
    return new JsiSkShader(this.CanvasKit, this.ref.makeShaderCubic(ckEnum(tx), ckEnum(ty), B, C, localMatrix ? JsiSkMatrix.fromValue(localMatrix) : undefined));
  }

  encodeToBytes(fmt, quality) {
    let result;

    if (fmt && quality) {
      result = this.ref.encodeToBytes(ckEnum(fmt), quality);
    } else if (fmt) {
      result = this.ref.encodeToBytes(ckEnum(fmt));
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
//# sourceMappingURL=JsiSkImage.js.map