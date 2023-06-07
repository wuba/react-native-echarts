"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.importWebpackFromProject = importWebpackFromProject;
exports.importExpoWebpackConfigFromProject = importExpoWebpackConfigFromProject;
exports.importWebpackDevServerFromProject = importWebpackDevServerFromProject;
var _resolveFrom = _interopRequireDefault(require("resolve-from"));
var _errors = require("../../../utils/errors");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// These resolvers enable us to test the CLI in older projects.
// We may be able to get rid of this in the future.
// TODO: Maybe combine with AsyncResolver?
class WebpackImportError extends _errors.CommandError {
    constructor(projectRoot, moduleId){
        super("WEBPACK_IMPORT", `Missing package "${moduleId}" in the project. Try running the command again. (cwd: ${projectRoot})`);
    }
}
function resolveFromProject(projectRoot, moduleId) {
    const resolvedPath = _resolveFrom.default.silent(projectRoot, moduleId);
    if (!resolvedPath) {
        throw new WebpackImportError(projectRoot, moduleId);
    }
    return resolvedPath;
}
function importFromProject(projectRoot, moduleId) {
    return require(resolveFromProject(projectRoot, moduleId));
}
function importWebpackFromProject(projectRoot) {
    return importFromProject(projectRoot, "webpack");
}
function importExpoWebpackConfigFromProject(projectRoot) {
    return importFromProject(projectRoot, "@expo/webpack-config");
}
function importWebpackDevServerFromProject(projectRoot) {
    return importFromProject(projectRoot, "webpack-dev-server");
}

//# sourceMappingURL=resolveFromProject.js.map