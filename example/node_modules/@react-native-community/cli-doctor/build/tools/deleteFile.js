"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFile = void 0;
function _fs() {
  const data = require("fs");
  _fs = function () {
    return data;
  };
  return data;
}
function _util() {
  const data = require("util");
  _util = function () {
    return data;
  };
  return data;
}
const deleteFile = (0, _util().promisify)(_fs().unlink);
exports.deleteFile = deleteFile;

//# sourceMappingURL=deleteFile.js.map