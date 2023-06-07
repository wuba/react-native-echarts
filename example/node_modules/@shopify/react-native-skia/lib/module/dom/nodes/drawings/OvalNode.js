import { NodeType } from "../../types";
import { processRect } from "../datatypes";
import { JsiDrawingNode } from "../DrawingNode";
export class OvalNode extends JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, NodeType.Oval, props);
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
      throw new Error("OvalNode: rect is undefined");
    }

    canvas.drawOval(this.derived, paint);
  }

}
//# sourceMappingURL=OvalNode.js.map