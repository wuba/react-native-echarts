"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
function _connect() {
  const data = _interopRequireDefault(require("connect"));
  _connect = function () {
    return data;
  };
  return data;
}
var _rawBodyMiddleware = _interopRequireDefault(require("./rawBodyMiddleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function getOpenStackFrameInEditorMiddleware({
  watchFolders
}) {
  return (req, res, next) => {
    if (!req.rawBody) {
      return next(new Error('missing request body'));
    }
    const frame = JSON.parse(req.rawBody);
    (0, _cliTools().launchEditor)(frame.file, frame.lineNumber, watchFolders);
    res.end('OK');
  };
}
var _default = options => {
  return (0, _connect().default)().use(_rawBodyMiddleware.default).use(getOpenStackFrameInEditorMiddleware(options));
};
exports.default = _default;

//# sourceMappingURL=openStackFrameInEditorMiddleware.js.map