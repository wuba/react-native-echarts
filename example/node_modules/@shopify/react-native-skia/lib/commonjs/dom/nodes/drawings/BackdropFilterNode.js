"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackdropFilterNode = void 0;

var _types = require("../../../skia/types");

var _types2 = require("../../types");

var _DrawingNode = require("../DrawingNode");

var _Node = require("../Node");

class BackdropFilterNode extends _DrawingNode.JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.BackdropFilter, props);
  }

  deriveProps() {
    return null;
  }

  draw(_ref) {
    let {
      canvas
    } = _ref;
    const child = this._children[0];
    const filter = child instanceof _Node.JsiDeclarationNode ? child.materialize() : null;
    canvas.saveLayer(undefined, null, (0, _types.isColorFilter)(filter) ? this.Skia.ImageFilter.MakeColorFilter(filter, null) : filter);
    canvas.restore();
  }

}

exports.BackdropFilterNode = BackdropFilterNode;
//# sourceMappingURL=BackdropFilterNode.js.map