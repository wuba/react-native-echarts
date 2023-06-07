import type { DrawingContext, PictureProps } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import type { NodeContext } from "../Node";
export declare class PictureNode extends JsiDrawingNode<PictureProps, null> {
    constructor(ctx: NodeContext, props: PictureProps);
    deriveProps(): null;
    draw({ canvas }: DrawingContext): void;
}
