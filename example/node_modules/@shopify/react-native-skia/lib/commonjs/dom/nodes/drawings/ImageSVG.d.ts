import type { DrawingContext, ImageSVGProps } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import type { NodeContext } from "../Node";
export declare class ImageSVGNode extends JsiDrawingNode<ImageSVGProps, null> {
    constructor(ctx: NodeContext, props: ImageSVGProps);
    deriveProps(): null;
    draw({ canvas }: DrawingContext): void;
}
