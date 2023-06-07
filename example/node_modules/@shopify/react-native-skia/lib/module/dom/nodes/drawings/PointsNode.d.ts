import type { DrawingContext, PointsProps } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import type { NodeContext } from "../Node";
export declare class PointsNode extends JsiDrawingNode<PointsProps, null> {
    constructor(ctx: NodeContext, props: PointsProps);
    deriveProps(): null;
    draw({ canvas, paint }: DrawingContext): void;
}
