/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { AssetData } from './buildBundle';
export declare function cleanAssetCatalog(catalogDir: string): void;
declare type ImageSet = {
    basePath: string;
    files: {
        name: string;
        src: string;
        scale: number;
    }[];
};
export declare function getImageSet(catalogDir: string, asset: AssetData, scales: readonly number[]): ImageSet;
export declare function isCatalogAsset(asset: AssetData): boolean;
export declare function writeImageSet(imageSet: ImageSet): void;
export {};
//# sourceMappingURL=assetCatalogIOS.d.ts.map