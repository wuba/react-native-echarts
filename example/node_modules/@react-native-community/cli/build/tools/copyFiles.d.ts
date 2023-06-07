/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
declare type Options = {
    exclude?: Array<RegExp>;
};
/**
 * Copy files (binary included) recursively.
 */
declare function copyFiles(srcPath: string, destPath: string, options?: Options): Promise<void[]>;
export default copyFiles;
//# sourceMappingURL=copyFiles.d.ts.map