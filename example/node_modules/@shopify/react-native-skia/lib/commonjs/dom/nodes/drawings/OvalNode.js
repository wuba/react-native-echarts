"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OvalNode = void 0;

var _types = require("../../types");

var _datatypes = require("../datatypes");

var _DrawingNode = require("../DrawingNode");

class OvalNode extends _DrawingNode.JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, _types.NodeType.Oval, props);
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
      throw new Error("OvalNode: rect is undefined");
    }

    canvas.drawOval(this.derived, paint);
  }

}

exports.OvalNode = OvalNode;
//# sourceMappingURL=OvalNode.js.map