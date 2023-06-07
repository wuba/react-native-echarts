import type { SkVertices } from "../../../skia/types";
import type { DrawingContext, VerticesProps } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import type { NodeContext } from "../Node";
export declare class VerticesNode extends JsiDrawingNode<VerticesProps, SkVertices> {
    constructor(ctx: NodeContext, props: VerticesProps);
    protected deriveProps(): SkVertices;
    draw({ canvas, paint }: DrawingContext): void;
}
