/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@react-native-community/cli-types';
export declare type Args = {
    assetPlugins?: string[];
    cert?: string;
    customLogReporterPath?: string;
    host?: string;
    https?: boolean;
    maxWorkers?: number;
    key?: string;
    platforms?: string[];
    port?: number;
    resetCache?: boolean;
    sourceExts?: string[];
    transformer?: string;
    watchFolders?: string[];
    config?: string;
    projectRoot?: string;
    interactive: boolean;
};
declare function runServer(_argv: Array<string>, ctx: Config, args: Args): Promise<void>;
export default runServer;
//# sourceMappingURL=runServer.d.ts.map