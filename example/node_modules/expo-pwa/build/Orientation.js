"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPortrait = exports.isLandscape = exports.isValid = void 0;
// https://developer.mozilla.org/en-US/docs/Web/Manifest#orientation
const ANY_ORIENTATIONS = ['any', 'natural', 'omit'];
const PORTRAIT_ORIENTATIONS = ['portrait', 'portrait-primary', 'portrait-secondary'];
const LANDSCAPE_ORIENTATIONS = ['landscape', 'landscape-primary', 'landscape-secondary'];
function isValid(orientation) {
    return (ANY_ORIENTATIONS.includes(orientation) ||
        LANDSCAPE_ORIENTATIONS.includes(orientation) ||
        PORTRAIT_ORIENTATIONS.includes(orientation));
}
exports.isValid = isValid;
function isLandscape(orientation) {
    return ANY_ORIENTATIONS.includes(orientation) || LANDSCAPE_ORIENTATIONS.includes(orientation);
}
exports.isLandscape = isLandscape;
function isPortrait(orientation) {
    return ANY_ORIENTATIONS.includes(orientation) || PORTRAIT_ORIENTATIONS.includes(orientation);
}
exports.isPortrait = isPortrait;
//# sourceMappingURL=Orientation.js.map