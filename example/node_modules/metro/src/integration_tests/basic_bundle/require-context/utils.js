"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.awaitProperties = awaitProperties;
exports.copyContextToObject = copyContextToObject;
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 *
 */

function copyContextToObject(ctx) {
  return Object.fromEntries(ctx.keys().map((key) => [key, ctx(key)]));
}
function awaitProperties(obj) {
  const result = {};
  return Promise.all(
    Object.keys(obj).map((key) => {
      return obj[key].then((value) => (result[key] = value));
    })
  ).then(() => result);
}
