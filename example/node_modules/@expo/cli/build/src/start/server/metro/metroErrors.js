"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isFailedToResolveNameError = isFailedToResolveNameError;
exports.isFailedToResolvePathError = isFailedToResolvePathError;
function isFailedToResolveNameError(error) {
    return !!error && "extraPaths" in error && error.constructor.name === "FailedToResolveNameError";
}
function isFailedToResolvePathError(error) {
    return !!error && "candidates" in error && error.constructor.name === "FailedToResolvePathError";
}

//# sourceMappingURL=metroErrors.js.map