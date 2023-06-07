"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanAssetCatalog = cleanAssetCatalog;
exports.getImageSet = getImageSet;
exports.isCatalogAsset = isCatalogAsset;
exports.writeImageSet = writeImageSet;
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _fsExtra() {
  const data = _interopRequireDefault(require("fs-extra"));
  _fsExtra = function () {
    return data;
  };
  return data;
}
var _assetPathUtils = _interopRequireDefault(require("./assetPathUtils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function cleanAssetCatalog(catalogDir) {
  const files = _fsExtra().default.readdirSync(catalogDir).filter(file => file.endsWith('.imageset'));
  for (const file of files) {
    _fsExtra().default.removeSync(_path().default.join(catalogDir, file));
  }
}
function getImageSet(catalogDir, asset, scales) {
  const fileName = _assetPathUtils.default.getResourceIdentifier(asset);
  return {
    basePath: _path().default.join(catalogDir, `${fileName}.imageset`),
    files: scales.map((scale, idx) => {
      const suffix = scale === 1 ? '' : `@${scale}x`;
      return {
        name: `${fileName + suffix}.${asset.type}`,
        scale,
        src: asset.files[idx]
      };
    })
  };
}
function isCatalogAsset(asset) {
  return asset.type === 'png' || asset.type === 'jpg' || asset.type === 'jpeg';
}
function writeImageSet(imageSet) {
  _fsExtra().default.mkdirsSync(imageSet.basePath);
  for (const file of imageSet.files) {
    const dest = _path().default.join(imageSet.basePath, file.name);
    _fsExtra().default.copyFileSync(file.src, dest);
  }
  _fsExtra().default.writeJSONSync(_path().default.join(imageSet.basePath, 'Contents.json'), {
    images: imageSet.files.map(file => ({
      filename: file.name,
      idiom: 'universal',
      scale: `${file.scale}x`
    })),
    info: {
      author: 'xcode',
      version: 1
    }
  });
}

//# sourceMappingURL=assetCatalogIOS.js.map