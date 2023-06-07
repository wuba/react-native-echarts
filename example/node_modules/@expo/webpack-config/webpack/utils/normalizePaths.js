"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Converts absolute paths to relative paths for testing purposes.
 *
 * @param initial
 * @param transformString
 * @internal
 */
function normalizePaths(initial, transformString) {
    if (initial == null) {
        return initial;
    }
    else if (initial instanceof RegExp) {
        return initial;
    }
    else if (typeof initial === 'string') {
        return transformString(initial);
    }
    else if (Array.isArray(initial)) {
        return initial.map(value => normalizePaths(value, transformString));
    }
    else if (typeof initial === 'object') {
        const result = {};
        for (const prop of Object.keys(initial)) {
            result[prop] = normalizePaths(initial[prop], transformString);
        }
        return result;
    }
    else {
        return initial;
    }
}
exports.default = normalizePaths;
//# sourceMappingURL=normalizePaths.js.map