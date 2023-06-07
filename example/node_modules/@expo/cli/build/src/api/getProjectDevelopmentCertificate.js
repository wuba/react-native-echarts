"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getProjectDevelopmentCertificateAsync = getProjectDevelopmentCertificateAsync;
var _errors = require("../utils/errors");
var _client = require("./rest/client");
var _actions = require("./user/actions");
async function getProjectDevelopmentCertificateAsync(easProjectId, csrPEM) {
    await (0, _actions).ensureLoggedInAsync();
    const response = await (0, _client).fetchAsync(`projects/${encodeURIComponent(easProjectId)}/development-certificates`, {
        method: "POST",
        body: JSON.stringify({
            csrPEM
        })
    });
    if (!response.ok) {
        throw new _errors.CommandError("API", `Unexpected error from Expo servers: ${response.statusText}.`);
    }
    const buffer = await response.buffer();
    return buffer.toString("utf8");
}

//# sourceMappingURL=getProjectDevelopmentCertificate.js.map