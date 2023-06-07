import type { SkImageFilter } from "../../../skia/types";
import type { BlendImageFilterProps, BlurImageFilterProps, DisplacementMapImageFilterProps, DropShadowImageFilterProps, MorphologyImageFilterProps, OffsetImageFilterProps, RuntimeShaderImageFilterProps } from "../../types";
import { NodeType } from "../../types";
import type { NodeContext } from "../Node";
import { JsiDeclarationNode } from "../Node";
export declare abstract class ImageFilterDeclaration<P, Nullable extends null | never = never> extends JsiDeclarationNode<P, SkImageFilter, Nullable> {
    constructor(ctx: NodeContext, type: NodeType, props: P);
    getOptionalChildInstance(index: number): any;
    getMandatoryChildInstance(index: number): any;
}
export declare class OffsetImageFilterNode extends ImageFilterDeclaration<OffsetImageFilterProps> {
    constructor(ctx: NodeContext, props: OffsetImageFilterProps);
    materialize(): SkImageFilter;
}
export declare class DisplacementMapImageFilterNode extends ImageFilterDeclaration<DisplacementMapImageFilterProps> {
    constructor(ctx: NodeContext, props: DisplacementMapImageFilterProps);
    materialize(): SkImageFilter;
}
export declare class BlurImageFilterNode extends ImageFilterDeclaration<BlurImageFilterProps> {
    constructor(ctx: NodeContext, props: BlurImageFilterProps);
    materialize(): SkImageFilter;
}
export declare class DropShadowImageFilterNode extends ImageFilterDeclaration<DropShadowImageFilterProps> {
    constructor(ctx: NodeContext, props: DropShadowImageFilterProps);
    materialize(): SkImageFilter;
}
export declare enum MorphologyOperator {
    Erode = 0,
    Dilate = 1
}
export declare class MorphologyImageFilterNode extends ImageFilterDeclaration<MorphologyImageFilterProps> {
    constructor(ctx: NodeContext, props: MorphologyImageFilterProps);
    materialize(): SkImageFilter;
}
export declare class BlendImageFilterNode extends ImageFilterDeclaration<BlendImageFilterProps> {
    constructor(ctx: NodeContext, props: BlendImageFilterProps);
    materialize(): SkImageFilter;
}
export declare class RuntimeShaderImageFilterNode extends ImageFilterDeclaration<RuntimeShaderImageFilterProps> {
    constructor(ctx: NodeContext, props: RuntimeShaderImageFilterProps);
    materialize(): SkImageFilter;
}
