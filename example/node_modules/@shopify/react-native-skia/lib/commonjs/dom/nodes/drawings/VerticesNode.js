"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerticesNode = void 0;

var _types = require("../../../skia/types");

var _types2 = require("../../types");

var _datatypes = require("../datatypes");

var _DrawingNode = require("../DrawingNode");

class VerticesNode extends _DrawingNode.JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.Vertices, props);
  }

  deriveProps() {
    const {
      mode,
      vertices,
      textures,
      colors,
      indices
    } = this.props;
    const vertexMode = mode ? _types.VertexMode[(0, _datatypes.enumKey)(mode)] : _types.VertexMode.Triangles;
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
    const defaultBlendMode = colors ? _types.BlendMode.DstOver : _types.BlendMode.SrcOver;
    const blend = blendMode ? _types.BlendMode[(0, _datatypes.enumKey)(blendMode)] : defaultBlendMode;

    if (this.derived === undefined) {
      throw new Error("VerticesNode: vertices is undefined");
    }

    canvas.drawVertices(this.derived, blend, paint);
  }

}

exports.VerticesNode = VerticesNode;
//# sourceMappingURL=VerticesNode.js.map