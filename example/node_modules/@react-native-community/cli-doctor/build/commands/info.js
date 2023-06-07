"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _envinfo = _interopRequireDefault(require("../tools/envinfo"));
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
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
 */

const info = async function getInfo(_argv, ctx) {
  try {
    _cliTools().logger.info('Fetching system and libraries information...');
    const output = await (0, _envinfo.default)(false);
    _cliTools().logger.log(output);
  } catch (err) {
    _cliTools().logger.error(`Unable to print environment info.\n${err}`);
  } finally {
    await (0, _cliTools().releaseChecker)(ctx.root);
  }
};
var _default = {
  name: 'info',
  description: 'Get relevant version info about OS, toolchain and libraries',
  func: info
};
exports.default = _default;

//# sourceMappingURL=info.js.map