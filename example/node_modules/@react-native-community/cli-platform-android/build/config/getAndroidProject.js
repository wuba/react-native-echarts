"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAndroidProject = getAndroidProject;
exports.getPackageName = getPackageName;
exports.parseNamespaceFromBuildGradleFile = parseNamespaceFromBuildGradleFile;
exports.parsePackageNameFromAndroidManifestFile = parsePackageNameFromAndroidManifestFile;
exports.validatePackageName = validatePackageName;
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
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
function _chalk() {
  const data = _interopRequireDefault(require("chalk"));
  _chalk = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getAndroidProject(config) {
  const androidProject = config.project.android;
  if (!androidProject) {
    throw new (_cliTools().CLIError)(`
      Android project not found. Are you sure this is a React Native project?
      If your Android files are located in a non-standard location (e.g. not inside 'android' folder), consider setting
      \`project.android.sourceDir\` option to point to a new location.
    `);
  }
  return androidProject;
}

/**
 * Util function to discover the package name from either the Manifest file or the build.gradle file.
 * @param manifestPath The path to the AndroidManifest.xml
 * @param buildGradlePath The path to the build.gradle[.kts] file.
 */
function discoverPackageName(manifestPath, buildGradlePath) {
  if (manifestPath) {
    const androidManifest = _fs().default.readFileSync(manifestPath, 'utf8');
    const packageNameFromManifest = parsePackageNameFromAndroidManifestFile(androidManifest);
    // We got the package from the AndroidManifest.xml
    if (packageNameFromManifest) {
      return packageNameFromManifest;
    }
  }
  if (buildGradlePath) {
    // We didn't get the package from the AndroidManifest.xml,
    // so we'll try to get it from the build.gradle[.kts] file
    // via the namespace field.
    const buildGradle = _fs().default.readFileSync(buildGradlePath, 'utf8');
    const namespace = parseNamespaceFromBuildGradleFile(buildGradle);
    if (namespace) {
      return namespace;
    }
  }
  throw new (_cliTools().CLIError)(`Failed to build the app: No package name found. 
    We couldn't parse the namespace from neither your build.gradle[.kts] file at ${_chalk().default.underline.dim(`${buildGradlePath}`)} 
    nor your package in the AndroidManifest at ${_chalk().default.underline.dim(`${manifestPath}`)}
    `);
}

/**
 * Get the package name/namespace of the running React Native app
 * @param manifestPath The path to the AndroidManifest.xml
 * @param buildGradlePath The path to the build.gradle[.kts] file.
 */
function getPackageName(manifestPath, buildGradlePath) {
  let packageName = discoverPackageName(manifestPath, buildGradlePath);
  if (!validatePackageName(packageName)) {
    _cliTools().logger.warn(`Invalid application's package name "${_chalk().default.bgRed(packageName)}" in either 'AndroidManifest.xml' or 'build.gradle'. Read guidelines for setting the package name here: ${_chalk().default.underline.dim('https://developer.android.com/studio/build/application-id')}`);
  }
  return packageName;
}
function parsePackageNameFromAndroidManifestFile(androidManifest) {
  const matchArray = androidManifest.match(/package="(.+?)"/);
  if (matchArray && matchArray.length > 0) {
    return matchArray[1];
  } else {
    return null;
  }
}
function parseNamespaceFromBuildGradleFile(buildGradle) {
  // search for namespace = inside the build.gradle file via regex
  const matchArray = buildGradle.match(/namespace\s*[=]*\s*["'](.+?)["']/);
  if (matchArray && matchArray.length > 0) {
    return matchArray[1];
  } else {
    return null;
  }
}

// Validates that the package name is correct
function validatePackageName(packageName) {
  return /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/i.test(packageName);
}

//# sourceMappingURL=getAndroidProject.js.map