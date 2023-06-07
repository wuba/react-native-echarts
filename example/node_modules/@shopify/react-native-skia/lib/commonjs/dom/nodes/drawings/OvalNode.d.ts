import type { SkRect } from "../../../skia/types";
import type { DrawingContext, OvalProps } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import type { NodeContext } from "../Node";
export declare class OvalNode extends JsiDrawingNode<OvalProps, SkRect> {
    constructor(ctx: NodeContext, props: OvalProps);
    deriveProps(): SkRect;
    draw({ canvas, paint }: DrawingContext): void;
}
