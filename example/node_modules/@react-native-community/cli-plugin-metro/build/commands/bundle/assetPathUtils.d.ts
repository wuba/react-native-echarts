/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export interface PackagerAsset {
    httpServerLocation: string;
    name: string;
    type: string;
}
/**
 * FIXME: using number to represent discrete scale numbers is fragile in essence because of
 * floating point numbers imprecision.
 */
declare function getAndroidAssetSuffix(scale: number): string;
declare function getAndroidResourceFolderName(asset: PackagerAsset, scale: number): string;
declare function getResourceIdentifier(asset: PackagerAsset): string;
declare function getBasePath(asset: PackagerAsset): string;
declare const _default: {
    getAndroidAssetSuffix: typeof getAndroidAssetSuffix;
    getAndroidResourceFolderName: typeof getAndroidResourceFolderName;
    getResourceIdentifier: typeof getResourceIdentifier;
    getBasePath: typeof getBasePath;
};
export default _default;
//# sourceMappingURL=assetPathUtils.d.ts.map