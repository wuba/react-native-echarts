/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Config } from '@react-native-community/cli-types';
import type { Flags } from '.';
declare type AndroidProject = NonNullable<Config['project']['android']>;
declare function runOnAllDevices(args: Flags, cmd: string, adbPath: string, androidProject: AndroidProject): Promise<void>;
export default runOnAllDevices;
//# sourceMappingURL=runOnAllDevices.d.ts.map