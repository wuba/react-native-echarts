import type { Skia, SkRect, Vector } from "../../../skia/types";
import type { RectDef, RRectDef } from "../../types";
export declare const isEdge: (pos: Vector, b: SkRect) => boolean;
export declare const processRect: (Skia: Skia, def: RectDef) => SkRect;
export declare const processRRect: (Skia: Skia, def: RRectDef) => import("../../../skia/types").SkRRect;
