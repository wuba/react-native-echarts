import { NodeType } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
export class LineNode extends JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, NodeType.Line, props);
  }

  deriveProps() {
    return null;
  }

  draw(_ref) {
    let {
      canvas,
      paint
    } = _ref;
    const {
      p1,
      p2
    } = this.props;
    canvas.drawLine(p1.x, p1.y, p2.x, p2.y, paint);
  }

}
//# sourceMappingURL=LineNode.js.map