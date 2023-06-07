"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dependencyConfig = dependencyConfig;
exports.projectConfig = projectConfig;
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _fs() {
  const data = _interopRequireDefault(require("fs"));
  _fs = function () {
    return data;
  };
  return data;
}
var _findAndroidDir = _interopRequireDefault(require("./findAndroidDir"));
var _findManifest = _interopRequireDefault(require("./findManifest"));
var _findPackageClassName = _interopRequireDefault(require("./findPackageClassName"));
var _getAndroidProject = require("./getAndroidProject");
var _findLibraryName = require("./findLibraryName");
var _findComponentDescriptors = require("./findComponentDescriptors");
var _findBuildGradle = require("./findBuildGradle");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Gets android project config by analyzing given folder and taking some
 * defaults specified by user into consideration
 */
function projectConfig(root, userConfig = {}) {
  const src = userConfig.sourceDir || (0, _findAndroidDir.default)(root);
  if (!src) {
    return null;
  }
  const sourceDir = _path().default.join(root, src);
  const appName = getAppName(sourceDir, userConfig.appName);
  const manifestPath = userConfig.manifestPath ? _path().default.join(sourceDir, userConfig.manifestPath) : (0, _findManifest.default)(_path().default.join(sourceDir, appName));
  const buildGradlePath = (0, _findBuildGradle.findBuildGradle)(sourceDir, false);
  if (!manifestPath && !buildGradlePath) {
    return null;
  }
  const packageName = userConfig.packageName || (0, _getAndroidProject.getPackageName)(manifestPath, buildGradlePath);
  if (!packageName) {
    throw new Error(`Package name not found in neither ${manifestPath} nor ${buildGradlePath}`);
  }
  return {
    sourceDir,
    appName,
    packageName,
    dependencyConfiguration: userConfig.dependencyConfiguration
  };
}
function getAppName(sourceDir, userConfigAppName) {
  let appName = '';
  if (typeof userConfigAppName === 'string' && _fs().default.existsSync(_path().default.join(sourceDir, userConfigAppName))) {
    appName = userConfigAppName;
  } else if (_fs().default.existsSync(_path().default.join(sourceDir, 'app'))) {
    appName = 'app';
  }
  return appName;
}

/**
 * Same as projectConfigAndroid except it returns
 * different config that applies to packages only
 */
function dependencyConfig(root, userConfig = {}) {
  if (userConfig === null) {
    return null;
  }
  const src = userConfig.sourceDir || (0, _findAndroidDir.default)(root);
  if (!src) {
    return null;
  }
  const sourceDir = _path().default.join(root, src);
  const manifestPath = userConfig.manifestPath ? _path().default.join(sourceDir, userConfig.manifestPath) : (0, _findManifest.default)(sourceDir);
  const buildGradlePath = (0, _findBuildGradle.findBuildGradle)(sourceDir, true);
  if (!manifestPath && !buildGradlePath) {
    return null;
  }
  const packageName = userConfig.packageName || (0, _getAndroidProject.getPackageName)(manifestPath, buildGradlePath);
  const packageClassName = (0, _findPackageClassName.default)(sourceDir);

  /**
   * This module has no package to export
   */
  if (!packageClassName) {
    return null;
  }
  const packageImportPath = userConfig.packageImportPath || `import ${packageName}.${packageClassName};`;
  const packageInstance = userConfig.packageInstance || `new ${packageClassName}()`;
  const buildTypes = userConfig.buildTypes || [];
  const dependencyConfiguration = userConfig.dependencyConfiguration;
  const libraryName = userConfig.libraryName || (0, _findLibraryName.findLibraryName)(root, sourceDir);
  const componentDescriptors = userConfig.componentDescriptors || (0, _findComponentDescriptors.findComponentDescriptors)(root);
  const androidMkPath = userConfig.androidMkPath ? _path().default.join(sourceDir, userConfig.androidMkPath) : _path().default.join(sourceDir, 'build/generated/source/codegen/jni/Android.mk');
  let cmakeListsPath = userConfig.cmakeListsPath ? _path().default.join(sourceDir, userConfig.cmakeListsPath) : _path().default.join(sourceDir, 'build/generated/source/codegen/jni/CMakeLists.txt');
  if (process.platform === 'win32') {
    cmakeListsPath = cmakeListsPath.replace(/\\/g, '/');
  }
  return {
    sourceDir,
    packageImportPath,
    packageInstance,
    buildTypes,
    dependencyConfiguration,
    libraryName,
    componentDescriptors,
    androidMkPath,
    cmakeListsPath
  };
}

//# sourceMappingURL=index.js.map