"use strict";

var _utils = require("./utils");
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 *
 */

const normalModule = require("./subdir-conflict");
const contextModule = require.context("./subdir-conflict");
function main() {
  return {
    normalModule,
    contextModule: (0, _utils.copyContextToObject)(contextModule),
  };
}
module.exports = main();
