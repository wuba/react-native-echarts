import { NodeType } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
export class DiffRectNode extends JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, NodeType.DiffRect, props);
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
      outer,
      inner
    } = this.props;
    canvas.drawDRRect(outer, inner, paint);
  }

}
//# sourceMappingURL=DiffRectNode.js.map