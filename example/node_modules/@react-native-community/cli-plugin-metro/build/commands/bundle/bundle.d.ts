/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { Config } from '@react-native-community/cli-types';
import { CommandLineArgs } from './bundleCommandLineArgs';
/**
 * Builds the bundle starting to look for dependencies at the given entry path.
 */
declare function bundleWithOutput(_: Array<string>, config: Config, args: CommandLineArgs, output: any): Promise<void | undefined>;
declare const _default: {
    name: string;
    description: string;
    func: typeof bundleWithOutput;
    options: ({
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
    withOutput: typeof bundleWithOutput;
};
export default _default;
declare const withOutput: typeof bundleWithOutput;
export { withOutput };
//# sourceMappingURL=bundle.d.ts.map