import { HostObject } from "./Host";
import { JsiSkContourMeasure } from "./JsiSkContourMeasure";
export class JsiSkContourMeasureIter extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "ContourMeasureIter");
  }

  next() {
    const result = this.ref.next();

    if (result === null) {
      return null;
    }

    return new JsiSkContourMeasure(this.CanvasKit, result);
  }

}
//# sourceMappingURL=JsiSkContourMeasureIter.js.map