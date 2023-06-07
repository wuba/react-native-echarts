/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { AndroidProjectParams, AndroidProjectConfig, AndroidDependencyParams, AndroidDependencyConfig } from '@react-native-community/cli-types';
/**
 * Gets android project config by analyzing given folder and taking some
 * defaults specified by user into consideration
 */
export declare function projectConfig(root: string, userConfig?: AndroidProjectParams): AndroidProjectConfig | null;
/**
 * Same as projectConfigAndroid except it returns
 * different config that applies to packages only
 */
export declare function dependencyConfig(root: string, userConfig?: AndroidDependencyParams | null): AndroidDependencyConfig | null;
//# sourceMappingURL=index.d.ts.map