"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseVariadicArguments = parseVariadicArguments;
exports.assertUnexpectedObjectKeys = assertUnexpectedObjectKeys;
exports.assertUnexpectedVariadicFlags = assertUnexpectedVariadicFlags;
var _errors = require("../utils/errors");
const debug = require("debug")("expo:utils:variadic");
function parseVariadicArguments(argv) {
    const variadic = [];
    const flags = {};
    for (const arg of argv){
        if (!arg.startsWith("-")) {
            variadic.push(arg);
        } else if (arg === "--") {
            break;
        } else {
            flags[arg] = true;
        }
    }
    // Everything after `--` that is not an option is passed to the underlying install command.
    const extras = [];
    const extraOperator = argv.indexOf("--");
    if (extraOperator > -1 && argv.length > extraOperator + 1) {
        const extraArgs = argv.slice(extraOperator + 1);
        if (extraArgs.includes("--")) {
            throw new _errors.CommandError("BAD_ARGS", "Unexpected multiple --");
        }
        extras.push(...extraArgs);
        debug("Extra arguments: " + extras.join(", "));
    }
    debug(`Parsed arguments (variadic: %O, flags: %O, extra: %O)`, variadic, flags, extras);
    return {
        variadic,
        flags,
        extras
    };
}
function assertUnexpectedObjectKeys(keys, obj) {
    const unexpectedKeys = Object.keys(obj).filter((key)=>!keys.includes(key)
    );
    if (unexpectedKeys.length > 0) {
        throw new _errors.CommandError("BAD_ARGS", `Unexpected: ${unexpectedKeys.join(", ")}`);
    }
}
function assertUnexpectedVariadicFlags(expectedFlags, { extras , flags , variadic  }, prefixCommand = "") {
    const unexpectedFlags = Object.keys(flags).filter((key)=>!expectedFlags.includes(key)
    );
    if (unexpectedFlags.length > 0) {
        const intendedFlags = Object.entries(flags).filter(([key])=>expectedFlags.includes(key)
        ).map(([key])=>key
        );
        const cmd = [
            prefixCommand,
            ...variadic,
            ...intendedFlags,
            "--",
            ...extras.concat(unexpectedFlags), 
        ].join(" ");
        throw new _errors.CommandError("BAD_ARGS", `Unexpected: ${unexpectedFlags.join(", ")}\nDid you mean: ${cmd.trim()}`);
    }
}

//# sourceMappingURL=variadic.js.map