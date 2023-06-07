/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
declare const outputBundle: any;
import { CommandLineArgs } from './bundleCommandLineArgs';
import type { Config } from '@react-native-community/cli-types';
import { MetroConfig } from '../../tools/loadMetroConfig';
export interface AssetData {
    __packager_asset: boolean;
    fileSystemLocation: string;
    hash: string;
    height: number | null;
    httpServerLocation: string;
    name: string;
    scales: number[];
    type: string;
    width: number | null;
    files: string[];
}
declare function buildBundle(args: CommandLineArgs, ctx: Config, output?: typeof outputBundle): Promise<void | undefined>;
/**
 * Create a bundle using a pre-loaded Metro config. The config can be
 * re-used for several bundling calls if multiple platforms are being
 * bundled.
 */
export declare function buildBundleWithConfig(args: CommandLineArgs, config: MetroConfig, output?: typeof outputBundle): Promise<void | undefined>;
export default buildBundle;
//# sourceMappingURL=buildBundle.d.ts.map