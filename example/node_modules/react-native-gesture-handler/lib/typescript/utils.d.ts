export declare const REACT_NATIVE_VERSION: {
    major: number;
    minor: number;
};
export declare function toArray<T>(object: T | T[]): T[];
export declare type withPrevAndCurrentMapFn<T, Transformed> = (previous: Transformed | null, current: T) => Transformed;
export declare function withPrevAndCurrent<T, Transformed>(array: T[], mapFn: withPrevAndCurrentMapFn<T, Transformed>): Transformed[];
export declare function hasProperty(object: object, key: string): boolean;
export declare function isJestEnv(): boolean;
export declare function tagMessage(msg: string): string;
export declare function isFabric(): boolean;
export declare function shouldUseCodegenNativeComponent(): boolean;
export declare function isRemoteDebuggingEnabled(): boolean;
