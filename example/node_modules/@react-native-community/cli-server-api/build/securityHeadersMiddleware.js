"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = securityHeadersMiddleware;
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function securityHeadersMiddleware(req, res, next) {
  // Block any cross origin request.
  if (typeof req.headers.origin === 'string' && !req.headers.origin.match(/^https?:\/\/localhost:/)) {
    next(new Error('Unauthorized request from ' + req.headers.origin + '. This may happen because of a conflicting browser extension. Please try to disable it and try again.'));
    return;
  }

  // Block MIME-type sniffing.
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
}

//# sourceMappingURL=securityHeadersMiddleware.js.map