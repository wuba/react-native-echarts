"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isInteractive = isInteractive;
var _env = require("./env");
function isInteractive() {
    return !_env.env.CI && process.stdout.isTTY;
}

//# sourceMappingURL=interactive.js.map