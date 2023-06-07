"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserTerminal = getUserTerminal;
function getUserTerminal() {
    return process.env.REACT_TERMINAL || (process.platform === "darwin" ? process.env.TERM_PROGRAM : process.env.TERM);
}

//# sourceMappingURL=terminal.js.map