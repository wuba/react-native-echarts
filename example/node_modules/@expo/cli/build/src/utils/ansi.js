"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stripAnsi = stripAnsi;
function stripAnsi(str) {
    if (!str) {
        return str;
    }
    const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))", 
    ].join("|");
    return str.replace(new RegExp(pattern, "g"), "");
}

//# sourceMappingURL=ansi.js.map