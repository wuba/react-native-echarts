/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 * @oncall react_native
 */

"use strict";

const { getAssetData } = require("metro/src/Assets");
const { generateAssetCodeFileAst } = require("metro/src/Bundler/util");
const path = require("path");
async function transform(
  { filename, options, src },
  assetRegistryPath,
  assetDataPlugins
) {
  options = options || {
    platform: "",
    projectRoot: "",
    inlineRequires: false,
    minify: false,
  };
  const absolutePath = path.resolve(options.projectRoot, filename);
  const data = await getAssetData(
    absolutePath,
    filename,
    assetDataPlugins,
    options.platform,
    options.publicPath
  );
  return {
    ast: generateAssetCodeFileAst(assetRegistryPath, data),
  };
}
module.exports = {
  transform,
};
