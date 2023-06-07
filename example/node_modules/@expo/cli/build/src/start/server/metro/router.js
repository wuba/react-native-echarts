"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAppRouterRelativeEntryPath = getAppRouterRelativeEntryPath;
var _path = _interopRequireDefault(require("path"));
var _resolveFrom = _interopRequireDefault(require("resolve-from"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:start:server:metro:router");
function getAppRouterRelativeEntryPath(projectRoot) {
    var ref;
    // Auto pick App entry
    const routerEntry = (ref = _resolveFrom.default.silent(projectRoot, "expo-router/entry")) != null ? ref : getFallbackEntryRoot(projectRoot);
    if (!routerEntry) {
        return undefined;
    }
    // It doesn't matter if the app folder exists.
    const appFolder = _path.default.join(projectRoot, "app");
    const appRoot = _path.default.relative(_path.default.dirname(routerEntry), appFolder);
    debug("routerEntry", routerEntry, appFolder, appRoot);
    return appRoot;
}
/** If the `expo-router` package is not installed, then use the `expo` package to determine where the node modules are relative to the project. */ function getFallbackEntryRoot(projectRoot) {
    const expoRoot = _resolveFrom.default.silent(projectRoot, "expo/package.json");
    if (expoRoot) {
        return _path.default.join(_path.default.dirname(_path.default.dirname(expoRoot)), "expo-router/entry");
    }
    return _path.default.join(projectRoot, "node_modules/expo-router/entry");
}

//# sourceMappingURL=router.js.map