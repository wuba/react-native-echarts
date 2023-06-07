"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaintNode = void 0;

var _types = require("../../skia/types");

var _types2 = require("../types");

var _datatypes = require("./datatypes");

var _Node = require("./Node");

class PaintNode extends _Node.JsiDeclarationNode {
  constructor(ctx) {
    let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(ctx, _types2.DeclarationType.Paint, _types2.NodeType.Paint, props);
  }

  materialize() {
    const {
      color,
      strokeWidth,
      blendMode,
      style,
      strokeJoin,
      strokeCap,
      strokeMiter,
      opacity,
      antiAlias
    } = this.props;
    const paint = this.Skia.Paint();

    if (color !== undefined) {
      paint.setColor(this.Skia.Color(color));
    }

    if (strokeWidth !== undefined) {
      paint.setStrokeWidth(strokeWidth);
    }

    if (blendMode !== undefined) {
      paint.setBlendMode(_types.BlendMode[(0, _datatypes.enumKey)(blendMode)]);
    }

    if (style !== undefined) {
      paint.setStyle(_types.PaintStyle[(0, _datatypes.enumKey)(style)]);
    }

    if (strokeJoin !== undefined) {
      paint.setStrokeJoin(_types.StrokeJoin[(0, _datatypes.enumKey)(strokeJoin)]);
    }

    if (strokeCap !== undefined) {
      paint.setStrokeCap(_types.StrokeCap[(0, _datatypes.enumKey)(strokeCap)]);
    }

    if (strokeMiter !== undefined) {
      paint.setStrokeMiter(strokeMiter);
    }

    if (opacity !== undefined) {
      paint.setAlphaf(opacity);
    }

    if (antiAlias !== undefined) {
      paint.setAntiAlias(antiAlias);
    }

    this._children.forEach(child => {
      if (child instanceof _Node.JsiDeclarationNode) {
        if (child.isShader()) {
          paint.setShader(child.materialize());
        } else if (child.isColorFilter()) {
          paint.setColorFilter(child.materialize());
        } else if (child.isImageFilter()) {
          paint.setImageFilter(child.materialize());
        } else if (child.isMaskFilter()) {
          paint.setMaskFilter(child.materialize());
        } else if (child.isPathEffect()) {
          paint.setPathEffect(child.materialize());
        } else {
          throw new Error(`Unknown paint child ${child.type}`);
        }
      }
    });

    return paint;
  }

}

exports.PaintNode = PaintNode;
//# sourceMappingURL=PaintNode.js.map