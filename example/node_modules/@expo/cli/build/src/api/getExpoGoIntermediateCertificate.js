"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getExpoGoIntermediateCertificateAsync = getExpoGoIntermediateCertificateAsync;
var _errors = require("../utils/errors");
var _client = require("./rest/client");
var _actions = require("./user/actions");
async function getExpoGoIntermediateCertificateAsync(easProjectId) {
    await (0, _actions).ensureLoggedInAsync();
    const response = await (0, _client).fetchAsync(`projects/${encodeURIComponent(easProjectId)}/development-certificates/expo-go-intermediate-certificate`, {
        method: "GET"
    });
    if (!response.ok) {
        throw new _errors.CommandError("API", `Unexpected error from Expo servers: ${response.statusText}.`);
    }
    const buffer = await response.buffer();
    return buffer.toString("utf8");
}

//# sourceMappingURL=getExpoGoIntermediateCertificate.js.map