"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FillNode = void 0;

var _types = require("../../types");

var _DrawingNode = require("../DrawingNode");

class FillNode extends _DrawingNode.JsiDrawingNode {
  constructor(ctx) {
    let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(ctx, _types.NodeType.Fill, props);
  }

  deriveProps() {
    return null;
  }

  draw(_ref) {
    let {
      canvas,
      paint
    } = _ref;
    canvas.drawPaint(paint);
  }

}

exports.FillNode = FillNode;
//# sourceMappingURL=FillNode.js.map