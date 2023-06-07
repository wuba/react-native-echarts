"use strict";

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 *
 */

const ab = require.context("./subdir", false, /\/(a|b)\.js$/);
const abc = require.context("./subdir", false);
const abcd = require.context("./subdir", true);
function main() {
  return {
    ab: ab.keys(),
    abc: abc.keys(),
    abcd: abcd.keys(),
  };
}
module.exports = main();
