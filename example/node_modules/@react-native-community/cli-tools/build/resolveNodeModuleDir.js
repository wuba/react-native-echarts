"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveNodeModuleDir;
var _findPackageDependencyDir = require("./findPackageDependencyDir");
var _errors = require("./errors");
/**
 * Finds a path inside `node_modules`
 */
function resolveNodeModuleDir(root, packageName) {
  const packageDependencyDirectory = (0, _findPackageDependencyDir.findPackageDependencyDir)(packageName, {
    startDir: root
  });
  if (packageDependencyDirectory === undefined) {
    throw new _errors.CLIError(`Node module directory for package ${packageName} was not found`);
  } else {
    return packageDependencyDirectory;
  }
}

//# sourceMappingURL=resolveNodeModuleDir.js.map