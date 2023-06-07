"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveStringOrBooleanArgsAsync = resolveStringOrBooleanArgsAsync;
exports._resolveStringOrBooleanArgs = _resolveStringOrBooleanArgs;
exports.collapseAliases = collapseAliases;
exports.assertUnknownArgs = assertUnknownArgs;
exports.assertDuplicateArgs = assertDuplicateArgs;
var _array = require("./array");
var _errors = require("./errors");
async function resolveStringOrBooleanArgsAsync(args, rawMap, extraArgs) {
    // Assert any missing arguments
    assertUnknownArgs({
        ...rawMap,
        ...extraArgs
    }, args);
    // Collapse aliases into fully qualified arguments.
    args = collapseAliases(extraArgs, args);
    // Resolve all of the string or boolean arguments and the project root.
    return _resolveStringOrBooleanArgs({
        ...rawMap,
        ...extraArgs
    }, args);
}
function _resolveStringOrBooleanArgs(arg, args) {
    // Default project root, if a custom one is defined then it will overwrite this.
    let projectRoot = ".";
    // The resolved arguments.
    const settings = {};
    // Create a list of possible arguments, this will filter out aliases.
    const possibleArgs = Object.entries(arg).filter(([, value])=>typeof value !== "string"
    ).map(([key])=>key
    );
    // Loop over arguments in reverse order so we can resolve if a value belongs to a flag.
    for(let i = args.length - 1; i > -1; i--){
        const value = args[i];
        // At this point we should have converted all aliases to fully qualified arguments.
        if (value.startsWith("--")) {
            // If we ever find an argument then it must be a boolean because we are checking in reverse
            // and removing arguments from the array if we find a string.
            settings[value] = true;
        } else {
            // Get the previous argument in the array.
            const nextValue = i > 0 ? args[i - 1] : null;
            if (nextValue && possibleArgs.includes(nextValue)) {
                settings[nextValue] = value;
                i--;
            } else if (// If the last value is not a flag and it doesn't have a recognized flag before it (instead having a string value or nothing)
            // then it must be the project root.
            i === args.length - 1) {
                projectRoot = value;
            } else {
                // This will asserts if two strings are passed in a row and not at the end of the line.
                throw new _errors.CommandError("BAD_ARGS", `Unknown argument: ${value}`);
            }
        }
    }
    return {
        args: settings,
        projectRoot
    };
}
function collapseAliases(arg, args) {
    const aliasMap = getAliasTuples(arg);
    for (const [arg1, alias] of aliasMap){
        args = (0, _array).replaceValue(args, arg1, alias);
    }
    // Assert if there are duplicate flags after we collapse the aliases.
    assertDuplicateArgs(args, aliasMap);
    return args;
}
function assertUnknownArgs(arg2, args) {
    const allowedArgs = Object.keys(arg2);
    const unknownArgs = args.filter((arg)=>!allowedArgs.includes(arg) && arg.startsWith("-")
    );
    if (unknownArgs.length > 0) {
        throw new _errors.CommandError(`Unknown arguments: ${unknownArgs.join(", ")}`);
    }
}
function getAliasTuples(arg) {
    return Object.entries(arg).filter(([, value])=>typeof value === "string"
    );
}
function assertDuplicateArgs(args, argNameAliasTuple) {
    for (const [argName, argNameAlias] of argNameAliasTuple){
        if (args.filter((a)=>[
                argName,
                argNameAlias
            ].includes(a)
        ).length > 1) {
            throw new _errors.CommandError("BAD_ARGS", `Can only provide one instance of ${argName} or ${argNameAlias}`);
        }
    }
}

//# sourceMappingURL=resolveArgs.js.map