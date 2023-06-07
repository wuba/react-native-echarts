"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointsNode = void 0;

var _types = require("../../../skia/types");

var _types2 = require("../../types");

var _datatypes = require("../datatypes");

var _DrawingNode = require("../DrawingNode");

class PointsNode extends _DrawingNode.JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.Points, props);
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
    canvas.drawPoints(_types.PointMode[(0, _datatypes.enumKey)(mode)], points, paint);
  }

}

exports.PointsNode = PointsNode;
//# sourceMappingURL=PointsNode.js.map