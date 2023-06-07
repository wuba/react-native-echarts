"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMetroDebugProperties = getMetroDebugProperties;
var _resolveFromProject = require("../../start/server/metro/resolveFromProject");
function getMetroDebugProperties(projectRoot, exp, debugTool) {
    return {
        sdkVersion: exp.sdkVersion,
        metroVersion: (0, _resolveFromProject).resolveMetroVersionFromProject(projectRoot),
        toolName: debugTool.name,
        toolVersion: debugTool.version
    };
}

//# sourceMappingURL=getMetroDebugProperties.js.map