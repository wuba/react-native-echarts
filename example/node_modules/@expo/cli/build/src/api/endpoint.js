"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getExpoApiBaseUrl = getExpoApiBaseUrl;
var _env = require("../utils/env");
function getExpoApiBaseUrl() {
    if (_env.env.EXPO_STAGING) {
        return `https://staging-api.expo.dev`;
    } else if (_env.env.EXPO_LOCAL) {
        return `http://127.0.0.1:3000`;
    } else {
        return `https://api.expo.dev`;
    }
}

//# sourceMappingURL=endpoint.js.map