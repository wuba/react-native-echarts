import type { DrawingContext, LineProps } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import type { NodeContext } from "../Node";
export declare class LineNode extends JsiDrawingNode<LineProps, null> {
    constructor(ctx: NodeContext, props: LineProps);
    deriveProps(): null;
    draw({ canvas, paint }: DrawingContext): void;
}
