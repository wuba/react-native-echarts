import type { DrawingContext, DrawingNodeProps } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import type { NodeContext } from "../Node";
export declare class FillNode extends JsiDrawingNode<DrawingNodeProps, null> {
    constructor(ctx: NodeContext, props?: DrawingNodeProps);
    deriveProps(): null;
    draw({ canvas, paint }: DrawingContext): void;
}
