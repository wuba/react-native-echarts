"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _launchDefaultBrowser = _interopRequireDefault(require("./launchDefaultBrowser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

async function launchDebugger(url) {
  return (0, _launchDefaultBrowser.default)(url);
}
var _default = launchDebugger;
exports.default = _default;

//# sourceMappingURL=launchDebugger.js.map