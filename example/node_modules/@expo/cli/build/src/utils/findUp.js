"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findUpProjectRootOrAssert = findUpProjectRootOrAssert;
var _path = _interopRequireDefault(require("path"));
var _resolveFrom = _interopRequireDefault(require("resolve-from"));
var _errors = require("../utils/errors");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function findUpProjectRootOrAssert(cwd) {
    const projectRoot = findUpProjectRoot(cwd);
    if (!projectRoot) {
        throw new _errors.CommandError(`Project root directory not found (working directory: ${cwd})`);
    }
    return projectRoot;
}
function findUpProjectRoot(cwd) {
    if ([
        ".",
        _path.default.sep
    ].includes(cwd)) return null;
    const found = _resolveFrom.default.silent(cwd, "./package.json");
    if (found) {
        return _path.default.dirname(found);
    }
    return findUpProjectRoot(_path.default.dirname(cwd));
}

//# sourceMappingURL=findUp.js.map