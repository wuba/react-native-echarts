/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/**
 * Use Yarn if available, it's much faster than the npm client.
 * Return the version of yarn installed on the system, null if yarn is not available.
 */
export declare function getYarnVersionIfAvailable(): string | null;
/**
 * Check if project is using Yarn (has `yarn.lock` in the tree)
 */
export declare function isProjectUsingYarn(cwd: string): string | undefined;
//# sourceMappingURL=yarn.d.ts.map