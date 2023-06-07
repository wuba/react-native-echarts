import type { SkPathEffect } from "../../../skia/types";
import type { NodeContext } from "../Node";
import { JsiDeclarationNode } from "../Node";
import type { CornerPathEffectProps, DashPathEffectProps, DiscretePathEffectProps, Line2DPathEffectProps, Node, Path1DPathEffectProps, Path2DPathEffectProps } from "../../types";
import { NodeType } from "../../types";
declare abstract class PathEffectDeclaration<P, Nullable extends null | never = never> extends JsiDeclarationNode<P, SkPathEffect, Nullable> {
    constructor(ctx: NodeContext, type: NodeType, props: P);
    addChild(child: Node<unknown>): void;
    insertChildBefore(child: Node<unknown>, before: Node<unknown>): void;
    compose(pe: SkPathEffect): SkPathEffect;
    getOptionalChildInstance(index: number): any;
    getMandatoryChildInstance(index: number): any;
}
export declare class DiscretePathEffectNode extends PathEffectDeclaration<DiscretePathEffectProps> {
    constructor(ctx: NodeContext, props: DiscretePathEffectProps);
    materialize(): SkPathEffect;
}
export declare class Path2DPathEffectNode extends PathEffectDeclaration<Path2DPathEffectProps, null> {
    constructor(ctx: NodeContext, props: Path2DPathEffectProps);
    materialize(): SkPathEffect | null;
}
export declare class DashPathEffectNode extends PathEffectDeclaration<DashPathEffectProps> {
    constructor(ctx: NodeContext, props: DashPathEffectProps);
    materialize(): SkPathEffect;
}
export declare class CornerPathEffectNode extends PathEffectDeclaration<CornerPathEffectProps, null> {
    constructor(ctx: NodeContext, props: CornerPathEffectProps);
    materialize(): SkPathEffect | null;
}
export declare class SumPathEffectNode extends PathEffectDeclaration<null> {
    constructor(ctx: NodeContext);
    materialize(): SkPathEffect;
}
export declare class Line2DPathEffectNode extends PathEffectDeclaration<Line2DPathEffectProps, null> {
    constructor(ctx: NodeContext, props: Line2DPathEffectProps);
    materialize(): SkPathEffect | null;
}
export declare class Path1DPathEffectNode extends PathEffectDeclaration<Path1DPathEffectProps, null> {
    constructor(ctx: NodeContext, props: Path1DPathEffectProps);
    materialize(): SkPathEffect | null;
}
export {};
