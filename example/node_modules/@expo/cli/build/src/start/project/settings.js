"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProjectSettings = void 0;
var _dotExpo = require("./dotExpo");
const SETTINGS_FILE_NAME = "settings.json";
const ProjectSettings = (0, _dotExpo).createTemporaryProjectFile(SETTINGS_FILE_NAME, {
    urlRandomness: null
});
exports.ProjectSettings = ProjectSettings;

//# sourceMappingURL=settings.js.map