import type { SkPaint } from "../../skia/types";
import type { DeclarationNode, PaintProps } from "../types";
import type { NodeContext } from "./Node";
import { JsiDeclarationNode } from "./Node";
export declare class PaintNode extends JsiDeclarationNode<PaintProps, SkPaint> implements DeclarationNode<PaintProps, SkPaint> {
    constructor(ctx: NodeContext, props?: PaintProps);
    materialize(): SkPaint;
}
