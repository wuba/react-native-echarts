import type { ReactNode } from "react";
import type { Fit } from "../../../dom/nodes";
import type { SkRect } from "../../../skia/types";
interface FitProps {
    fit?: Fit;
    src: SkRect;
    dst: SkRect;
    children: ReactNode | ReactNode[];
}
export declare const fitbox: (fit: Fit, src: SkRect, dst: SkRect) => readonly [{
    readonly translateX: number;
}, {
    readonly translateY: number;
}, {
    readonly scaleX: number;
}, {
    readonly scaleY: number;
}];
export declare const FitBox: ({ fit, src, dst, children }: FitProps) => JSX.Element;
export {};
