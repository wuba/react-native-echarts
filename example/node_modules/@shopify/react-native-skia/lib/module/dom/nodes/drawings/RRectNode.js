function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { NodeType } from "../../types";
import { processRRect } from "../datatypes";
import { JsiDrawingNode } from "../DrawingNode";
export class RRectNode extends JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, NodeType.RRect, props);

    _defineProperty(this, "rect", void 0);
  }

  deriveProps() {
    return processRRect(this.Skia, this.props);
  }

  draw(_ref) {
    let {
      canvas,
      paint
    } = _ref;

    if (this.derived === undefined) {
      throw new Error("RRectNode: rect is undefined");
    }

    canvas.drawRRect(this.derived, paint);
  }

}
//# sourceMappingURL=RRectNode.js.map