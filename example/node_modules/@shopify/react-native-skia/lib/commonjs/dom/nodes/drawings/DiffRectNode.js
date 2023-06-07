"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiffRectNode = void 0;

var _types = require("../../types");

var _DrawingNode = require("../DrawingNode");

class DiffRectNode extends _DrawingNode.JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, _types.NodeType.DiffRect, props);
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
      outer,
      inner
    } = this.props;
    canvas.drawDRRect(outer, inner, paint);
  }

}

exports.DiffRectNode = DiffRectNode;
//# sourceMappingURL=DiffRectNode.js.map