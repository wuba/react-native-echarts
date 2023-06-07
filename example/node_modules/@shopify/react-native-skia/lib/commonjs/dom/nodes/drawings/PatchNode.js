"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatchNode = void 0;

var _types = require("../../../skia/types");

var _types2 = require("../../types");

var _datatypes = require("../datatypes");

var _DrawingNode = require("../DrawingNode");

class PatchNode extends _DrawingNode.JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.Patch, props);
  }

  deriveProps() {
    const {
      colors,
      blendMode,
      patch
    } = this.props;
    const defaultBlendMode = colors ? _types.BlendMode.DstOver : _types.BlendMode.SrcOver;
    const mode = blendMode ? _types.BlendMode[(0, _datatypes.enumKey)(blendMode)] : defaultBlendMode; // Patch requires a path with the following constraints:
    // M tl
    // C c1 c2 br
    // C c1 c2 bl
    // C c1 c2 tl (the redundant point in the last command is removed)

    return {
      mode,
      points: [patch[0].pos, patch[0].c2, patch[1].c1, patch[1].pos, patch[1].c2, patch[2].c1, patch[2].pos, patch[2].c2, patch[3].c1, patch[3].pos, patch[3].c2, patch[0].c1],
      colors: colors ? colors.map(c => this.Skia.Color(c)) : undefined
    };
  }

  draw(_ref) {
    let {
      canvas,
      paint
    } = _ref;

    if (!this.derived) {
      throw new Error("PatchNode: derived props not set");
    }

    const {
      texture
    } = this.props;
    const {
      colors,
      points,
      mode
    } = this.derived;
    canvas.drawPatch(points, colors, texture, mode, paint);
  }

}

exports.PatchNode = PatchNode;
//# sourceMappingURL=PatchNode.js.map