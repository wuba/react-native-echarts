"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Resolve the `mode` in a way that accounts for legacy treatment and environment variables.
 *
 * mode -> production -> development -> process.env.NODE_ENV -> 'development'
 * @category env
 */
function getMode({ production, development, mode, }) {
    if (mode === undefined) {
        if (process.env.NODE_ENV != null && isValidMode(process.env.NODE_ENV)) {
            return process.env.NODE_ENV.toLowerCase();
        }
    }
    else if (isValidMode(mode)) {
        return mode.toLowerCase();
    }
    if (production) {
        return 'production';
    }
    else if (development) {
        return 'development';
    }
    return 'development';
}
exports.default = getMode;
function isValidMode(inputMode) {
    let mode = inputMode || '';
    if (typeof inputMode === 'string') {
        mode = inputMode.toLowerCase();
    }
    return !!mode && ['none', 'production', 'development'].includes(mode);
}
//# sourceMappingURL=getMode.js.map