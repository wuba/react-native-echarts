import type { DrawingContext, DrawingNodeProps, Node, NodeType, RenderNode } from "../types";
import type { NodeContext } from "./Node";
import { JsiRenderNode } from "./RenderNode";
export declare abstract class JsiDrawingNode<P extends DrawingNodeProps, C> extends JsiRenderNode<P> implements RenderNode<P> {
    protected derived?: C;
    constructor(ctx: NodeContext, type: NodeType, props: P);
    setProps(props: P): void;
    setProp<K extends keyof P>(name: K, value: P[K]): boolean;
    addChild(child: Node<unknown>): void;
    insertChildBefore(child: Node<unknown>, before: Node<unknown>): void;
    renderNode(ctx: DrawingContext): void;
    protected abstract draw(ctx: DrawingContext): void;
    protected abstract deriveProps(): C;
}
