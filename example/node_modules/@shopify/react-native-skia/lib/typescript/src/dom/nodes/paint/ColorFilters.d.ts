import type { SkColorFilter } from "../../../skia/types";
import type { NodeContext } from "../Node";
import { JsiDeclarationNode } from "../Node";
import type { BlendColorFilterProps, MatrixColorFilterProps, Node } from "../../types";
import { NodeType } from "../../types";
import type { LerpColorFilterProps } from "../../types/ColorFilters";
export declare abstract class ColorFilterDeclaration<P, Nullable extends null | never = never> extends JsiDeclarationNode<P, SkColorFilter, Nullable> {
    constructor(ctx: NodeContext, type: NodeType, props: P);
    addChild(child: Node<unknown>): void;
    insertChildBefore(child: Node<unknown>, before: Node<unknown>): void;
    compose(filter: SkColorFilter): SkColorFilter;
}
export declare class MatrixColorFilterNode extends ColorFilterDeclaration<MatrixColorFilterProps> {
    constructor(ctx: NodeContext, props: MatrixColorFilterProps);
    materialize(): SkColorFilter;
}
export declare class BlendColorFilterNode extends ColorFilterDeclaration<BlendColorFilterProps> {
    constructor(ctx: NodeContext, props: BlendColorFilterProps);
    materialize(): SkColorFilter;
}
export declare class LinearToSRGBGammaColorFilterNode extends ColorFilterDeclaration<null> {
    constructor(ctx: NodeContext);
    materialize(): SkColorFilter;
}
export declare class SRGBToLinearGammaColorFilterNode extends ColorFilterDeclaration<null> {
    constructor(ctx: NodeContext);
    materialize(): SkColorFilter;
}
export declare class LumaColorFilterNode extends ColorFilterDeclaration<null> {
    constructor(ctx: NodeContext);
    materialize(): SkColorFilter;
}
export declare class LerpColorFilterNode extends ColorFilterDeclaration<LerpColorFilterProps> {
    constructor(ctx: NodeContext, props: LerpColorFilterProps);
    materialize(): SkColorFilter;
}
