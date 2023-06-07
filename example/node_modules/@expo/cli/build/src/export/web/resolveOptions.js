"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveOptionsAsync = resolveOptionsAsync;
async function resolveOptionsAsync(args) {
    return {
        clear: !!args["--clear"],
        dev: !!args["--dev"]
    };
}

//# sourceMappingURL=resolveOptions.js.map