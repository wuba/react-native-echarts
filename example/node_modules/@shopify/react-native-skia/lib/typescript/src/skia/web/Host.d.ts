import type { CanvasKit, EmbindEnumEntity } from "canvaskit-wasm";
import type { SkJSIInstance } from "../types";
export declare class NotImplementedOnRNWeb extends Error {
    constructor(msg?: string);
}
export declare abstract class Host {
    readonly CanvasKit: CanvasKit;
    constructor(CanvasKit: CanvasKit);
}
export declare abstract class BaseHostObject<T, N extends string> extends Host implements SkJSIInstance<N> {
    readonly __typename__: N;
    ref: T;
    constructor(CanvasKit: CanvasKit, ref: T, typename: N);
}
export declare abstract class HostObject<T, N extends string> extends BaseHostObject<T, N> {
    static fromValue<T>(value: SkJSIInstance<string>): T;
}
export declare const ckEnum: (value: number) => EmbindEnumEntity;
export declare const optEnum: (value: number | undefined) => EmbindEnumEntity | undefined;
