import { VertexMode, BlendMode } from "../../../skia/types";
import { NodeType } from "../../types";
import { enumKey } from "../datatypes";
import { JsiDrawingNode } from "../DrawingNode";
export class VerticesNode extends JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, NodeType.Vertices, props);
  }

  deriveProps() {
    const {
      mode,
      vertices,
      textures,
      colors,
      indices
    } = this.props;
    const vertexMode = mode ? VertexMode[enumKey(mode)] : VertexMode.Triangles;
    return this.Skia.MakeVertices(vertexMode, vertices, textures, colors ? colors.map(c => this.Skia.Color(c)) : undefined, indices);
  }

  draw(_ref) {
    let {
      canvas,
      paint
    } = _ref;
    const {
      colors,
      blendMode
    } = this.props;
    const defaultBlendMode = colors ? BlendMode.DstOver : BlendMode.SrcOver;
    const blend = blendMode ? BlendMode[enumKey(blendMode)] : defaultBlendMode;

    if (this.derived === undefined) {
      throw new Error("VerticesNode: vertices is undefined");
    }

    canvas.drawVertices(this.derived, blend, paint);
  }

}
//# sourceMappingURL=VerticesNode.js.map