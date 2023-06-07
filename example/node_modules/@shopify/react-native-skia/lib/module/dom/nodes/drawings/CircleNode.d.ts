import type { SkPoint } from "../../../skia/types";
import type { CircleProps, DrawingContext } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import type { NodeContext } from "../Node";
export declare class CircleNode extends JsiDrawingNode<CircleProps, SkPoint> {
    constructor(ctx: NodeContext, props: CircleProps);
    protected deriveProps(): SkPoint;
    draw({ canvas, paint }: DrawingContext): void;
}
