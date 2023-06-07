import type { SkShader } from "../../../skia/types";
import type { NodeContext } from "../Node";
import { JsiDeclarationNode } from "../Node";
import type { ColorProps, FractalNoiseProps, ImageShaderProps, LinearGradientProps, RadialGradientProps, ShaderProps, SweepGradientProps, TurbulenceProps, TwoPointConicalGradientProps } from "../../types";
import { NodeType } from "../../types";
export declare abstract class ShaderDeclaration<P> extends JsiDeclarationNode<P, SkShader> {
    constructor(ctx: NodeContext, type: NodeType, props: P);
}
export declare class ShaderNode extends ShaderDeclaration<ShaderProps> {
    constructor(ctx: NodeContext, props: ShaderProps);
    materialize(): SkShader;
}
export declare class ImageShaderNode extends ShaderDeclaration<ImageShaderProps> {
    constructor(ctx: NodeContext, props: ImageShaderProps);
    materialize(): SkShader;
}
export declare class ColorNode extends ShaderDeclaration<ColorProps> {
    constructor(ctx: NodeContext, props: ColorProps);
    materialize(): SkShader;
}
export declare class TurbulenceNode extends ShaderDeclaration<TurbulenceProps> {
    constructor(ctx: NodeContext, props: TurbulenceProps);
    materialize(): SkShader;
}
export declare class FractalNoiseNode extends ShaderDeclaration<FractalNoiseProps> {
    constructor(ctx: NodeContext, props: FractalNoiseProps);
    materialize(): SkShader;
}
export declare class LinearGradientNode extends ShaderDeclaration<LinearGradientProps> {
    constructor(ctx: NodeContext, props: LinearGradientProps);
    materialize(): SkShader;
}
export declare class RadialGradientNode extends ShaderDeclaration<RadialGradientProps> {
    constructor(ctx: NodeContext, props: RadialGradientProps);
    materialize(): SkShader;
}
export declare class SweepGradientNode extends ShaderDeclaration<SweepGradientProps> {
    constructor(ctx: NodeContext, props: SweepGradientProps);
    materialize(): SkShader;
}
export declare class TwoPointConicalGradientNode extends ShaderDeclaration<TwoPointConicalGradientProps> {
    constructor(ctx: NodeContext, props: TwoPointConicalGradientProps);
    materialize(): SkShader;
}
