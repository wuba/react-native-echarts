import type { SkRRect } from "../../../skia/types";
import type { DrawingContext, RoundedRectProps } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import type { NodeContext } from "../Node";
export declare class RRectNode extends JsiDrawingNode<RoundedRectProps, SkRRect> {
    rect?: SkRRect;
    constructor(ctx: NodeContext, props: RoundedRectProps);
    protected deriveProps(): SkRRect;
    draw({ canvas, paint }: DrawingContext): void;
}
