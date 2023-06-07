import type { SkRect } from "../../../skia/types";
import type { DrawingContext, ImageProps } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import type { NodeContext } from "../Node";
export declare class ImageNode extends JsiDrawingNode<ImageProps, {
    src: SkRect;
    dst: SkRect;
}> {
    constructor(ctx: NodeContext, props: ImageProps);
    deriveProps(): {
        src: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        dst: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
    };
    draw({ canvas, paint }: DrawingContext): void;
}
