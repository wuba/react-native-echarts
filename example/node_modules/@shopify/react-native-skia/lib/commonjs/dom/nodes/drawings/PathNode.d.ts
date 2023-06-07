import type { SkPath } from "../../../skia/types";
import type { DrawingContext, PathProps } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import type { NodeContext } from "../Node";
export declare class PathNode extends JsiDrawingNode<PathProps, SkPath> {
    constructor(ctx: NodeContext, props: PathProps);
    protected deriveProps(): SkPath;
    draw({ canvas, paint }: DrawingContext): void;
}
