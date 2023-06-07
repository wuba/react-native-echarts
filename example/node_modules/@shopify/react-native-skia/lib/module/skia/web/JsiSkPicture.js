// TODO: suggest to rename SkPicture to Picture for consistency
import { HostObject, ckEnum } from "./Host";
import { JsiSkShader } from "./JsiSkShader";
import { JsiSkMatrix } from "./JsiSkMatrix";
import { JsiSkRect } from "./JsiSkRect";
export class JsiSkPicture extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Picture");
  }

  makeShader(tmx, tmy, mode, localMatrix, tileRect) {
    return new JsiSkShader(this.CanvasKit, this.ref.makeShader(ckEnum(tmx), ckEnum(tmy), ckEnum(mode), localMatrix ? JsiSkMatrix.fromValue(localMatrix) : undefined, tileRect ? JsiSkRect.fromValue(this.CanvasKit, tileRect) : undefined));
  }

  serialize() {
    return this.ref.serialize();
  }

}
//# sourceMappingURL=JsiSkPicture.js.map