import { PointMode } from "../../../skia/types";
import { NodeType } from "../../types";
import { enumKey } from "../datatypes";
import { JsiDrawingNode } from "../DrawingNode";
export class PointsNode extends JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, NodeType.Points, props);
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
      points,
      mode
    } = this.props;
    canvas.drawPoints(PointMode[enumKey(mode)], points, paint);
  }

}
//# sourceMappingURL=PointsNode.js.map