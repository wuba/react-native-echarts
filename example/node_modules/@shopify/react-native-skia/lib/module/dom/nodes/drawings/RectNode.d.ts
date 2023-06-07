import type { SkRect } from "../../../skia/types/Rect";
import type { DrawingContext, RectProps } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import type { NodeContext } from "../Node";
export declare class RectNode extends JsiDrawingNode<RectProps, SkRect> {
    constructor(ctx: NodeContext, props: RectProps);
    deriveProps(): SkRect;
    draw({ canvas, paint }: DrawingContext): void;
}
