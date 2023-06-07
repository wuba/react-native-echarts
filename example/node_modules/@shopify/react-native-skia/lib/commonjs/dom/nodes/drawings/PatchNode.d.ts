import type { SkColor, SkPoint } from "../../../skia/types";
import { BlendMode } from "../../../skia/types";
import type { DrawingContext, PatchProps } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import type { NodeContext } from "../Node";
export declare class PatchNode extends JsiDrawingNode<PatchProps, {
    points: SkPoint[];
    colors: SkColor[] | undefined;
    mode: BlendMode;
}> {
    constructor(ctx: NodeContext, props: PatchProps);
    deriveProps(): {
        mode: BlendMode;
        points: SkPoint[];
        colors: Float32Array[] | undefined;
    };
    draw({ canvas, paint }: DrawingContext): void;
}
