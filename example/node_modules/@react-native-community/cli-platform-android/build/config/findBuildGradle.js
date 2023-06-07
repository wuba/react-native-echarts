"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findBuildGradle = findBuildGradle;
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
function findBuildGradle(sourceDir, isLibrary) {
  const buildGradlePath = _path().default.join(sourceDir, isLibrary ? 'build.gradle' : 'app/build.gradle');
  const buildGradleKtsPath = _path().default.join(sourceDir, isLibrary ? 'build.gradle.kts' : 'app/build.gradle.kts');
  if (_fs().default.existsSync(buildGradlePath)) {
    return buildGradlePath;
  } else if (_fs().default.existsSync(buildGradleKtsPath)) {
    return buildGradleKtsPath;
  } else {
    return null;
  }
}

//# sourceMappingURL=findBuildGradle.js.map