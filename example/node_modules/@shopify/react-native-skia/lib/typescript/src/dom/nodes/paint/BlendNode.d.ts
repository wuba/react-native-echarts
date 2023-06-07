import type { BlendProps } from "../../types/ImageFilters";
import type { SkShader, SkImageFilter } from "../../../skia/types";
import type { NodeContext } from "../Node";
import { JsiDeclarationNode } from "../Node";
import type { Node } from "../../types";
export declare class BlendNode extends JsiDeclarationNode<BlendProps, SkShader | SkImageFilter> {
    constructor(ctx: NodeContext, props: BlendProps);
    private checkChild;
    addChild(child: Node<unknown>): void;
    insertChildBefore(child: Node<unknown>, before: Node<unknown>): void;
    materialize(): SkImageFilter | SkShader;
}
