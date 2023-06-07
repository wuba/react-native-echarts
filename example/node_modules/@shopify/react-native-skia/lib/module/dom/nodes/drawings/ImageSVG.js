import { NodeType } from "../../types";
import { processRect } from "../datatypes";
import { JsiDrawingNode } from "../DrawingNode";
export class ImageSVGNode extends JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, NodeType.ImageSVG, props);
  }

  deriveProps() {
    return null;
  }

  draw(_ref) {
    let {
      canvas
    } = _ref;
    const {
      svg
    } = this.props;
    const {
      x,
      y,
      width,
      height
    } = processRect(this.Skia, this.props);
    canvas.save();
    canvas.translate(x, y);
    canvas.drawSvg(svg, width, height);
    canvas.restore();
  }

}
//# sourceMappingURL=ImageSVG.js.map