import type { SkRect } from "./Rect";
export interface SkRRect {
    readonly rect: SkRect;
    readonly rx: number;
    readonly ry: number;
}
export declare const isRRect: (def: SkRect | SkRRect) => def is SkRRect;
