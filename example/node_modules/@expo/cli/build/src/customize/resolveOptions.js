"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveArgsAsync = resolveArgsAsync;
var _variadic = require("../utils/variadic");
async function resolveArgsAsync(argv) {
    const { variadic , extras , flags  } = (0, _variadic).parseVariadicArguments(argv);
    (0, _variadic).assertUnexpectedObjectKeys([], flags);
    return {
        // Variadic arguments like `npx expo install react react-dom` -> ['react', 'react-dom']
        variadic,
        options: {},
        extras
    };
}

//# sourceMappingURL=resolveOptions.js.map