import { isColorFilter } from "../../../skia/types";
import { NodeType } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import { JsiDeclarationNode } from "../Node";
export class BackdropFilterNode extends JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, NodeType.BackdropFilter, props);
  }

  deriveProps() {
    return null;
  }

  draw(_ref) {
    let {
      canvas
    } = _ref;
    const child = this._children[0];
    const filter = child instanceof JsiDeclarationNode ? child.materialize() : null;
    canvas.saveLayer(undefined, null, isColorFilter(filter) ? this.Skia.ImageFilter.MakeColorFilter(filter, null) : filter);
    canvas.restore();
  }

}
//# sourceMappingURL=BackdropFilterNode.js.map