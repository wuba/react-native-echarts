"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getProjectAsync = getProjectAsync;
var _errors = require("../utils/errors");
var _client = require("./rest/client");
var _actions = require("./user/actions");
async function getProjectAsync(projectId) {
    await (0, _actions).ensureLoggedInAsync();
    const response = await (0, _client).fetchAsync(`projects/${encodeURIComponent(projectId)}`);
    if (!response.ok) {
        throw new _errors.CommandError("API", `Unexpected error from Expo servers: ${response.statusText}.`);
    }
    const { data  } = await response.json();
    return data;
}

//# sourceMappingURL=getProject.js.map