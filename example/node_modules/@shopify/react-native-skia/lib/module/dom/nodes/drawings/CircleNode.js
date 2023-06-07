import { NodeType } from "../../types";
import { processCircle } from "../datatypes";
import { JsiDrawingNode } from "../DrawingNode";
export class CircleNode extends JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, NodeType.Circle, props);
  }

  deriveProps() {
    return processCircle(this.Skia, this.props).c;
  }

  draw(_ref) {
    let {
      canvas,
      paint
    } = _ref;

    if (!this.derived) {
      throw new Error("CircleNode: c is undefined");
    }

    const {
      x,
      y
    } = this.derived;
    canvas.drawCircle(x, y, this.props.r, paint);
  }

}
//# sourceMappingURL=CircleNode.js.map