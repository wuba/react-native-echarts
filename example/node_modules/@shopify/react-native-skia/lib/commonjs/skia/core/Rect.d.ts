import type { SkRect, SkRRect } from "../types";
export declare const rect: (x: number, y: number, width: number, height: number) => SkRect;
export declare const bounds: (rects: SkRect[]) => SkRect;
export declare const topLeft: (r: SkRect | SkRRect) => import("../types").SkPoint;
export declare const topRight: (r: SkRect | SkRRect) => import("../types").SkPoint;
export declare const bottomLeft: (r: SkRect | SkRRect) => import("../types").SkPoint;
export declare const bottomRight: (r: SkRect | SkRRect) => import("../types").SkPoint;
export declare const center: (r: SkRect | SkRRect) => import("../types").SkPoint;
