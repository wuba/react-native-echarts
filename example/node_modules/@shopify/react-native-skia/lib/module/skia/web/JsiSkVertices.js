import { HostObject } from "./Host";
import { JsiSkRect } from "./JsiSkRect";
export class JsiSkVertices extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Vertices");
  }

  bounds() {
    return new JsiSkRect(this.CanvasKit, this.ref.bounds());
  }

  uniqueID() {
    return this.ref.uniqueID();
  }

}
//# sourceMappingURL=JsiSkVertices.js.map