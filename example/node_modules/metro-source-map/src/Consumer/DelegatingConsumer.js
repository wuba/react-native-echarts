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

const {
  GENERATED_ORDER,
  GREATEST_LOWER_BOUND,
  LEAST_UPPER_BOUND,
  ORIGINAL_ORDER,
} = require("./constants");
const createConsumer = require("./createConsumer");

/**
 * A source map consumer that supports both "basic" and "indexed" source maps.
 * Uses `MappingsConsumer` and `SectionsConsumer` under the hood (via
 * `createConsumer`).
 */
class DelegatingConsumer {
  static GENERATED_ORDER = GENERATED_ORDER;
  static ORIGINAL_ORDER = ORIGINAL_ORDER;
  static GREATEST_LOWER_BOUND = GREATEST_LOWER_BOUND;
  static LEAST_UPPER_BOUND = LEAST_UPPER_BOUND;
  // $FlowFixMe[incompatible-return]
  constructor(sourceMap) {
    this._rootConsumer = createConsumer(sourceMap);
    return this._rootConsumer;
  }
  originalPositionFor(generatedPosition) {
    return this._rootConsumer.originalPositionFor(generatedPosition);
  }
  generatedMappings() {
    return this._rootConsumer.generatedMappings();
  }
  eachMapping(callback, context, order) {
    return this._rootConsumer.eachMapping(callback, context, order);
  }

  // flowlint-next-line unsafe-getters-setters:off
  get file() {
    return this._rootConsumer.file;
  }
  sourceContentFor(source, nullOnMissing) {
    return this._rootConsumer.sourceContentFor(source, nullOnMissing);
  }
}
module.exports = DelegatingConsumer;
