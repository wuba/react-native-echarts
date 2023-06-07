import { NodeType } from "../../types";
import { processRect } from "../datatypes";
import { JsiDrawingNode } from "../DrawingNode";
export class RectNode extends JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, NodeType.Rect, props);
  }

  deriveProps() {
    return processRect(this.Skia, this.props);
  }

  draw(_ref) {
    let {
      canvas,
      paint
    } = _ref;

    if (this.derived === undefined) {
      throw new Error("RectNode: rect is undefined");
    }

    canvas.drawRect(this.derived, paint);
  }

}
//# sourceMappingURL=RectNode.js.map