import type { DiffRectProps, DrawingContext } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import type { NodeContext } from "../Node";
export declare class DiffRectNode extends JsiDrawingNode<DiffRectProps, null> {
    constructor(ctx: NodeContext, props: DiffRectProps);
    deriveProps(): null;
    draw({ canvas, paint }: DrawingContext): void;
}
