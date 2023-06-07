import type { Node } from "../dom/types";
import type { SkiaValue } from "../values";
import type { AnimatedProps } from "./processors";
declare type Unsubscribe = () => void;
declare type Mutator = (value: unknown) => void;
declare type SubscriptionState = {
    nodes: Map<Node<unknown>, Mutator[]>;
    unsubscribe: null | Unsubscribe;
};
export declare class DependencyManager {
    registerValues: (values: Array<SkiaValue<unknown>>) => () => void;
    subscriptions: Map<SkiaValue<unknown>, SubscriptionState>;
    unregisterDependantValues: null | Unsubscribe;
    constructor(registerValues: (values: Array<SkiaValue<unknown>>) => () => void);
    /**
     * Call to unsubscribe all value listeners from the given node based
     * on the current list of subscriptions for the node. This function
     * is typically called when the node is unmounted or when one or more
     * properties have changed.
     * @param node Node to unsubscribe value listeners from
     */
    unsubscribeNode(node: Node<unknown>): void;
    /**
     * Adds listeners to the provided values so that the node is notified
     * when a value changes. This is done in an optimized way so that this
     * class only needs to listen to the value once and then forwards the
     * change to the node and its listener. This method is typically called
     * when the node is mounted and when one or more props on the node changes.
     * @param node Node to subscribe to value changes for
     * @param props Node's properties
     */
    subscribeNode<P>(node: Node<unknown>, props: AnimatedProps<P>): void;
    /**
     * Called when the hosting container is mounted or updated. This ensures that we have
     * a ref to the underlying SkiaView so that we can registers redraw listeners
     * on values used in the current View automatically.
     */
    update(): void;
    /**
     * Called when the hosting container is unmounted or recreated. This ensures that we remove
     * all subscriptions to Skia values so that we don't have any listeners left after
     * the component is removed.
     */
    remove(): void;
}
export {};
