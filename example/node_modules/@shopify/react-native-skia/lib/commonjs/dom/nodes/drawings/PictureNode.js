"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PictureNode = void 0;

var _types = require("../../types");

var _DrawingNode = require("../DrawingNode");

class PictureNode extends _DrawingNode.JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, _types.NodeType.Picture, props);
  }

  deriveProps() {
    return null;
  }

  draw(_ref) {
    let {
      canvas
    } = _ref;
    const {
      picture
    } = this.props;
    canvas.drawPicture(picture);
  }

}

exports.PictureNode = PictureNode;
//# sourceMappingURL=PictureNode.js.map