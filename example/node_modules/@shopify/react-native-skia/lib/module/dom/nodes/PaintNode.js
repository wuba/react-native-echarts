import { StrokeCap, StrokeJoin, PaintStyle, BlendMode } from "../../skia/types";
import { DeclarationType, NodeType } from "../types";
import { enumKey } from "./datatypes";
import { JsiDeclarationNode } from "./Node";
export class PaintNode extends JsiDeclarationNode {
  constructor(ctx) {
    let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(ctx, DeclarationType.Paint, NodeType.Paint, props);
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
      paint.setBlendMode(BlendMode[enumKey(blendMode)]);
    }

    if (style !== undefined) {
      paint.setStyle(PaintStyle[enumKey(style)]);
    }

    if (strokeJoin !== undefined) {
      paint.setStrokeJoin(StrokeJoin[enumKey(strokeJoin)]);
    }

    if (strokeCap !== undefined) {
      paint.setStrokeCap(StrokeCap[enumKey(strokeCap)]);
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
      if (child instanceof JsiDeclarationNode) {
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
//# sourceMappingURL=PaintNode.js.map