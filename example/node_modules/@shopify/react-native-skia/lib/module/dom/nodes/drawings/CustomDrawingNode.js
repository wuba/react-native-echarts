import { NodeType } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
export class CustomDrawingNode extends JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, NodeType.Drawing, props);
  }

  deriveProps() {
    return null;
  }

  draw(ctx) {
    this.props.drawing(ctx);
  }

}
//# sourceMappingURL=CustomDrawingNode.js.map