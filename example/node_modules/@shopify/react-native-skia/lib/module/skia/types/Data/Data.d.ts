import type { SkJSIInstance } from "../JsiInstance";
export declare type SkData = SkJSIInstance<"Data">;
declare type RNModule = number;
declare type ESModule = {
    __esModule: true;
    default: string;
};
export declare type DataModule = RNModule | ESModule;
export declare type DataSource = DataModule | string | Uint8Array;
export declare type DataSourceParam = DataSource | null | undefined;
export declare const isRNModule: (mod: DataModule) => mod is number;
export {};
