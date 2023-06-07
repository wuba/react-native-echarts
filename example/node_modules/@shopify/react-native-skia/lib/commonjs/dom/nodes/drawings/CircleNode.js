"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircleNode = void 0;

var _types = require("../../types");

var _datatypes = require("../datatypes");

var _DrawingNode = require("../DrawingNode");

class CircleNode extends _DrawingNode.JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, _types.NodeType.Circle, props);
  }

  deriveProps() {
    return (0, _datatypes.processCircle)(this.Skia, this.props).c;
  }

  draw(_ref) {
    let {
      canvas,
      paint
    } = _ref;

    if (!this.derived) {
      throw new Error("CircleNode: c is undefined");
    }

    const {
      x,
      y
    } = this.derived;
    canvas.drawCircle(x, y, this.props.r, paint);
  }

}

exports.CircleNode = CircleNode;
//# sourceMappingURL=CircleNode.js.map