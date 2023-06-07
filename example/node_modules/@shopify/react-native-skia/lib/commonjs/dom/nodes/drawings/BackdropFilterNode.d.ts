import type { ChildrenProps, DrawingContext } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import type { NodeContext } from "../Node";
export declare class BackdropFilterNode extends JsiDrawingNode<ChildrenProps, null> {
    constructor(ctx: NodeContext, props: ChildrenProps);
    protected deriveProps(): null;
    draw({ canvas }: DrawingContext): void;
}
