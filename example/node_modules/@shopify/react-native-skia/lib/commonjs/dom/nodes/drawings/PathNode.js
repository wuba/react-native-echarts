"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PathNode = void 0;

var _types = require("../../../skia/types");

var _types2 = require("../../types");

var _datatypes = require("../datatypes");

var _DrawingNode = require("../DrawingNode");

class PathNode extends _DrawingNode.JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.Path, props);
  }

  deriveProps() {
    const {
      start,
      end,
      fillType,
      stroke,
      ...pathProps
    } = this.props;
    const hasStartOffset = start !== 0;
    const hasEndOffset = end !== 1;
    const hasStrokeOptions = stroke !== undefined;
    const hasFillType = !!fillType;
    const willMutatePath = hasStartOffset || hasEndOffset || hasStrokeOptions || hasFillType;
    const pristinePath = (0, _datatypes.processPath)(this.Skia, pathProps.path);
    const path = willMutatePath ? pristinePath.copy() : pristinePath;

    if (hasFillType) {
      path.setFillType(_types.FillType[(0, _datatypes.enumKey)(fillType)]);
    }

    if (hasStrokeOptions) {
      path.stroke(stroke);
    }

    if (hasStartOffset || hasEndOffset) {
      path.trim(start, end, false);
    }

    return path;
  }

  draw(_ref) {
    let {
      canvas,
      paint
    } = _ref;

    if (!this.derived) {
      throw new Error("Path not initialized");
    }

    canvas.drawPath(this.derived, paint);
  }

}

exports.PathNode = PathNode;
//# sourceMappingURL=PathNode.js.map