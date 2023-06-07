"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findComponentDescriptors = findComponentDescriptors;
function _fs() {
  const data = _interopRequireDefault(require("fs"));
  _fs = function () {
    return data;
  };
  return data;
}
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _glob() {
  const data = _interopRequireDefault(require("glob"));
  _glob = function () {
    return data;
  };
  return data;
}
var _extractComponentDescriptors = require("./extractComponentDescriptors");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function findComponentDescriptors(packageRoot) {
  const files = _glob().default.sync('**/+(*.js|*.jsx|*.ts|*.tsx)', {
    cwd: packageRoot,
    nodir: true,
    ignore: '**/node_modules/**'
  });
  const codegenComponent = files.map(filePath => _fs().default.readFileSync(_path().default.join(packageRoot, filePath), 'utf8')).map(_extractComponentDescriptors.extractComponentDescriptors).filter(Boolean);

  // Filter out duplicates as it happens that libraries contain multiple outputs due to package publishing.
  // TODO: consider using "codegenConfig" to avoid this.
  return Array.from(new Set(codegenComponent));
}

//# sourceMappingURL=findComponentDescriptors.js.map