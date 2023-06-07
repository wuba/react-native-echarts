"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RectNode = void 0;

var _types = require("../../types");

var _datatypes = require("../datatypes");

var _DrawingNode = require("../DrawingNode");

class RectNode extends _DrawingNode.JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, _types.NodeType.Rect, props);
  }

  deriveProps() {
    return (0, _datatypes.processRect)(this.Skia, this.props);
  }

  draw(_ref) {
    let {
      canvas,
      paint
    } = _ref;

    if (this.derived === undefined) {
      throw new Error("RectNode: rect is undefined");
    }

    canvas.drawRect(this.derived, paint);
  }

}

exports.RectNode = RectNode;
//# sourceMappingURL=RectNode.js.map