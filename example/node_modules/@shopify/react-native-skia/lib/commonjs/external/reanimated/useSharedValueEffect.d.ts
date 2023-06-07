declare type SharedValueTypeWrapper<T = number> = {
    value: T;
};
/**
 * Connects a shared value from reanimated to a SkiaView or Canvas
 * so whenever the shared value changes the SkiaView will redraw.
 * @param cb Callback that will be called whenever the shared value changes.
 * @param values One or more shared values to listen for.
 */
export declare const useSharedValueEffect: <T = number>(cb: () => void, value: SharedValueTypeWrapper<T>, ...values: SharedValueTypeWrapper<T>[]) => void;
export {};
