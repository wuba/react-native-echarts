"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RRectNode = void 0;

var _types = require("../../types");

var _datatypes = require("../datatypes");

var _DrawingNode = require("../DrawingNode");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RRectNode extends _DrawingNode.JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, _types.NodeType.RRect, props);

    _defineProperty(this, "rect", void 0);
  }

  deriveProps() {
    return (0, _datatypes.processRRect)(this.Skia, this.props);
  }

  draw(_ref) {
    let {
      canvas,
      paint
    } = _ref;

    if (this.derived === undefined) {
      throw new Error("RRectNode: rect is undefined");
    }

    canvas.drawRRect(this.derived, paint);
  }

}

exports.RRectNode = RRectNode;
//# sourceMappingURL=RRectNode.js.map