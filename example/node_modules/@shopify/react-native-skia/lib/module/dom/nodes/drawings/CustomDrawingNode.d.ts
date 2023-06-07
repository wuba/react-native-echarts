import type { CustomDrawingNodeProps, DrawingContext } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import type { NodeContext } from "../Node";
export declare class CustomDrawingNode extends JsiDrawingNode<CustomDrawingNodeProps, null> {
    constructor(ctx: NodeContext, props: CustomDrawingNodeProps);
    deriveProps(): null;
    draw(ctx: DrawingContext): void;
}
