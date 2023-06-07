import type { DrawingContext, GroupProps } from "../types";
import { JsiRenderNode } from "./RenderNode";
import type { NodeContext } from "./Node";
export declare class GroupNode extends JsiRenderNode<GroupProps> {
    constructor(ctx: NodeContext, props: GroupProps);
    renderNode(ctx: DrawingContext): void;
}
