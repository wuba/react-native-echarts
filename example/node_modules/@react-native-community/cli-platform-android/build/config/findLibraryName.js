"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findLibraryName = findLibraryName;
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function findLibraryName(root, sourceDir) {
  const packageJsonPath = _path().default.join(root, 'package.json');
  const buildGradlePath = _path().default.join(sourceDir, 'build.gradle');
  const buildGradleKtsPath = _path().default.join(sourceDir, 'build.gradle.kts');

  // We first check if there is a codegenConfig.name inside the package.json file.
  if (_fs().default.existsSync(packageJsonPath)) {
    var _packageJson$codegenC;
    const packageJson = JSON.parse(_fs().default.readFileSync(packageJsonPath, 'utf8'));
    if ((_packageJson$codegenC = packageJson.codegenConfig) === null || _packageJson$codegenC === void 0 ? void 0 : _packageJson$codegenC.name) {
      return packageJson.codegenConfig.name;
    }
  }

  // If not, we check if the library specified it in the build.gradle file.
  let buildGradleContents = '';
  if (_fs().default.existsSync(buildGradlePath)) {
    buildGradleContents = _fs().default.readFileSync(buildGradlePath, 'utf-8');
  } else if (_fs().default.existsSync(buildGradleKtsPath)) {
    buildGradleContents = _fs().default.readFileSync(buildGradleKtsPath, 'utf-8');
  } else {
    return undefined;
  }
  const match = buildGradleContents.match(/libraryName = ["'](.+)["']/);
  if (match) {
    return match[1];
  } else {
    return undefined;
  }
}

//# sourceMappingURL=findLibraryName.js.map