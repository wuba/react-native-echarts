import type { DataSourceParam } from "../types";
/**
 * Returns a Skia Image object
 * */
export declare const useImage: (source: DataSourceParam, onError?: ((err: Error) => void) | undefined) => import("../types").SkImage | null;
