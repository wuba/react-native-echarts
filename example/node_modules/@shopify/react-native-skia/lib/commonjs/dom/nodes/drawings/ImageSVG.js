"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageSVGNode = void 0;

var _types = require("../../types");

var _datatypes = require("../datatypes");

var _DrawingNode = require("../DrawingNode");

class ImageSVGNode extends _DrawingNode.JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, _types.NodeType.ImageSVG, props);
  }

  deriveProps() {
    return null;
  }

  draw(_ref) {
    let {
      canvas
    } = _ref;
    const {
      svg
    } = this.props;
    const {
      x,
      y,
      width,
      height
    } = (0, _datatypes.processRect)(this.Skia, this.props);
    canvas.save();
    canvas.translate(x, y);
    canvas.drawSvg(svg, width, height);
    canvas.restore();
  }

}

exports.ImageSVGNode = ImageSVGNode;
//# sourceMappingURL=ImageSVG.js.map