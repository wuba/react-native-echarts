"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function getAdbPath() {
  return process.env.ANDROID_HOME ? _path().default.join(process.env.ANDROID_HOME, 'platform-tools', 'adb') : 'adb';
}
var _default = getAdbPath;
exports.default = _default;

//# sourceMappingURL=getAdbPath.js.map