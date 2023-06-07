"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupNode = void 0;

var _types = require("../types");

var _RenderNode = require("./RenderNode");

class GroupNode extends _RenderNode.JsiRenderNode {
  constructor(ctx, props) {
    super(ctx, _types.NodeType.Group, props);
  }

  renderNode(ctx) {
    this.children().map(child => {
      if (child instanceof _RenderNode.JsiRenderNode) {
        child.render(ctx);
      }
    });
  }

}

exports.GroupNode = GroupNode;
//# sourceMappingURL=GroupNode.js.map