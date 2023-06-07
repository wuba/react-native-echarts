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

const nullthrows = require("nullthrows");
const PREFIX = "resolver.";
module.exports = function parseCustomResolverOptions(urlObj) {
  const customResolverOptions = Object.create(null);
  const query = nullthrows(urlObj.query);
  Object.keys(query).forEach((key) => {
    if (key.startsWith(PREFIX)) {
      customResolverOptions[key.substr(PREFIX.length)] = query[key];
    }
  });
  return customResolverOptions;
};
