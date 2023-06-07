import { NodeType } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
export class FillNode extends JsiDrawingNode {
  constructor(ctx) {
    let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(ctx, NodeType.Fill, props);
  }

  deriveProps() {
    return null;
  }

  draw(_ref) {
    let {
      canvas,
      paint
    } = _ref;
    canvas.drawPaint(paint);
  }

}
//# sourceMappingURL=FillNode.js.map