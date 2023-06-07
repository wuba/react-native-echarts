"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomDrawingNode = void 0;

var _types = require("../../types");

var _DrawingNode = require("../DrawingNode");

class CustomDrawingNode extends _DrawingNode.JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, _types.NodeType.Drawing, props);
  }

  deriveProps() {
    return null;
  }

  draw(ctx) {
    this.props.drawing(ctx);
  }

}

exports.CustomDrawingNode = CustomDrawingNode;
//# sourceMappingURL=CustomDrawingNode.js.map