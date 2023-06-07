import { NodeType } from "../types";
import { JsiRenderNode } from "./RenderNode";
export class GroupNode extends JsiRenderNode {
  constructor(ctx, props) {
    super(ctx, NodeType.Group, props);
  }

  renderNode(ctx) {
    this.children().map(child => {
      if (child instanceof JsiRenderNode) {
        child.render(ctx);
      }
    });
  }

}
//# sourceMappingURL=GroupNode.js.map