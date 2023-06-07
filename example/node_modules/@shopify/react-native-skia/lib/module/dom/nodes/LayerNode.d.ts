import type { DrawingContext } from "../types";
import type { ChildrenProps } from "../types/Common";
import { JsiRenderNode } from "./RenderNode";
import type { NodeContext } from "./Node";
export declare class LayerNode extends JsiRenderNode<ChildrenProps> {
    constructor(ctx: NodeContext, props: ChildrenProps);
    renderNode(ctx: DrawingContext): void;
}
