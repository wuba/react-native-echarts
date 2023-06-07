"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = statusPageMiddleware;
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Status page so that anyone who needs to can verify that the packager is
 * running on 8081 and not another program / service.
 */
function statusPageMiddleware(_req, res) {
  res.end('packager-status:running');
}

//# sourceMappingURL=statusPageMiddleware.js.map