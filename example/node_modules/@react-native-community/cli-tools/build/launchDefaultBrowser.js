"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _open() {
  const data = _interopRequireDefault(require("open"));
  _open = function () {
    return data;
  };
  return data;
}
var _throwIfNonHttpProtocol = _interopRequireDefault(require("./throwIfNonHttpProtocol"));
var _logger = _interopRequireDefault(require("./logger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

async function launchDefaultBrowser(url) {
  try {
    (0, _throwIfNonHttpProtocol.default)(url);
    await (0, _open().default)(url);
  } catch (err) {
    if (err) {
      _logger.default.error('Browser exited with error:', err);
    }
  }
}
var _default = launchDefaultBrowser;
exports.default = _default;

//# sourceMappingURL=launchDefaultBrowser.js.map