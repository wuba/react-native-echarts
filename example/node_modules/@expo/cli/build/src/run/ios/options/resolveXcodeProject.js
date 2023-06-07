"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveXcodeProject = resolveXcodeProject;
var _glob = require("glob");
var _errors = require("../../../utils/errors");
const ignoredPaths = [
    "**/@(Carthage|Pods|vendor|node_modules)/**"
];
function findXcodeProjectPaths(projectRoot, extension) {
    return (0, _glob).sync(`ios/*.${extension}`, {
        absolute: true,
        cwd: projectRoot,
        ignore: ignoredPaths
    });
}
function resolveXcodeProject(projectRoot) {
    let paths = findXcodeProjectPaths(projectRoot, "xcworkspace");
    if (paths.length) {
        return {
            // Use full path instead of relative project root so that warnings and errors contain full paths as well, this helps with filtering.
            // Also helps keep things consistent in monorepos.
            name: paths[0],
            // name: path.relative(projectRoot, paths[0]),
            isWorkspace: true
        };
    }
    paths = findXcodeProjectPaths(projectRoot, "xcodeproj");
    if (paths.length) {
        return {
            name: paths[0],
            isWorkspace: false
        };
    }
    throw new _errors.CommandError("IOS_MALFORMED", `Xcode project not found in project: ${projectRoot}. You can generate a project with \`npx expo prebuild\``);
}

//# sourceMappingURL=resolveXcodeProject.js.map