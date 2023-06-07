"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineNode = void 0;

var _types = require("../../types");

var _DrawingNode = require("../DrawingNode");

class LineNode extends _DrawingNode.JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, _types.NodeType.Line, props);
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
      p1,
      p2
    } = this.props;
    canvas.drawLine(p1.x, p1.y, p2.x, p2.y, paint);
  }

}

exports.LineNode = LineNode;
//# sourceMappingURL=LineNode.js.map