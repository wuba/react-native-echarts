import type { SkData, DataSourceParam } from "../types";
export declare const useRawData: <T>(source: DataSourceParam, factory: (data: SkData) => T, onError?: ((err: Error) => void) | undefined) => T | null;
export declare const useData: (source: DataSourceParam, onError?: ((err: Error) => void) | undefined) => SkData | null;
