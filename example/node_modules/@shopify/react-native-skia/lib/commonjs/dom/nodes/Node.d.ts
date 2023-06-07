import type { SkColorFilter, Skia, SkImageFilter, SkMaskFilter, SkShader, SkPathEffect, SkPaint } from "../../skia/types";
import type { Node, DeclarationNode, NodeType } from "../types";
import { DeclarationType } from "../types";
import type { DependencyManager } from "../../renderer/DependencyManager";
export interface NodeContext {
    Skia: Skia;
    depMgr: DependencyManager;
}
export declare abstract class JsiNode<P> implements Node<P> {
    type: NodeType;
    protected props: P;
    protected _children: JsiNode<unknown>[];
    protected Skia: Skia;
    protected depMgr: DependencyManager;
    constructor(ctx: NodeContext, type: NodeType, props: P);
    setProps(props: P): void;
    setProp<K extends keyof P>(name: K, v: P[K]): boolean;
    getProps(): P;
    children(): JsiNode<unknown>[];
    addChild(child: Node<unknown>): void;
    dispose(): void;
    removeChild(child: Node<unknown>): void;
    insertChildBefore(child: Node<unknown>, before: Node<unknown>): void;
}
export declare type Invalidate = () => void;
export declare abstract class JsiDeclarationNode<P, T, Nullable extends null | never = never> extends JsiNode<P> implements DeclarationNode<P, T, Nullable> {
    declarationType: DeclarationType;
    private invalidate;
    constructor(ctx: NodeContext, declarationType: DeclarationType, type: NodeType, props: P);
    abstract materialize(): T | Nullable;
    addChild(child: Node<unknown>): void;
    insertChildBefore(child: Node<unknown>, before: Node<unknown>): void;
    dispose(): void;
    setInvalidate(invalidate: Invalidate): void;
    setProps(props: P): void;
    setProp<K extends keyof P>(name: K, v: P[K]): boolean;
    isPaint(): this is DeclarationNode<unknown, SkPaint>;
    isImageFilter(): this is DeclarationNode<unknown, SkImageFilter>;
    isColorFilter(): this is DeclarationNode<unknown, SkColorFilter>;
    isShader(): this is DeclarationNode<unknown, SkShader>;
    isMaskFilter(): this is DeclarationNode<unknown, SkMaskFilter>;
    isPathEffect(): this is DeclarationNode<unknown, SkPathEffect>;
}
