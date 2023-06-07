import { HostObject } from "./Host";
import { JsiSkCanvas } from "./JsiSkCanvas";
import { JsiSkImage } from "./JsiSkImage";
import { JsiSkRect } from "./JsiSkRect";
export class JsiSkSurface extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Surface");
  }

  getCanvas() {
    return new JsiSkCanvas(this.CanvasKit, this.ref.getCanvas());
  }

  makeImageSnapshot(bounds) {
    const image = this.ref.makeImageSnapshot(bounds ? Array.from(JsiSkRect.fromValue(this.CanvasKit, bounds)) : undefined);
    return new JsiSkImage(this.CanvasKit, image);
  }

}
//# sourceMappingURL=JsiSkSurface.js.map