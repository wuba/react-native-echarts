declare type ReleaseCacheKey = 'eTag' | 'lastChecked' | 'latestVersion';
declare function get(name: string, key: ReleaseCacheKey): string | undefined;
declare function set(name: string, key: ReleaseCacheKey, value: string): void;
declare const _default: {
    get: typeof get;
    set: typeof set;
};
export default _default;
//# sourceMappingURL=releaseCacheManager.d.ts.map