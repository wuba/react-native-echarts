/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export interface CommandLineArgs {
    assetsDest?: string;
    assetCatalogDest?: string;
    entryFile: string;
    resetCache: boolean;
    resetGlobalCache: boolean;
    transformer?: string;
    minify?: boolean;
    config?: string;
    platform: string;
    dev: boolean;
    bundleOutput: string;
    bundleEncoding?: string;
    maxWorkers?: number;
    sourcemapOutput?: string;
    sourcemapSourcesRoot?: string;
    sourcemapUseAbsolutePath: boolean;
    verbose: boolean;
    unstableTransformProfile?: string;
    generateStaticViewConfigs: boolean;
}
declare const _default: ({
    name: string;
    description: string;
    default?: undefined;
    parse?: undefined;
} | {
    name: string;
    description: string;
    default: string;
    parse?: undefined;
} | {
    name: string;
    description: string;
    parse: (val: string) => boolean;
    default: boolean;
} | {
    name: string;
    description: string;
    parse: (val: string) => boolean;
    default?: undefined;
} | {
    name: string;
    description: string;
    parse: (workers: string) => number;
    default?: undefined;
} | {
    name: string;
    description: string;
    default: boolean;
    parse?: undefined;
} | {
    name: string;
    description: string;
    parse: (val: string) => string;
    default?: undefined;
})[];
export default _default;
//# sourceMappingURL=bundleCommandLineArgs.d.ts.map