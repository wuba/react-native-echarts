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

class GraphNotFoundError extends Error {
  constructor(graphId) {
    super(`The graph \`${graphId}\` was not found.`);
    this.graphId = graphId;
  }
}
module.exports = GraphNotFoundError;
