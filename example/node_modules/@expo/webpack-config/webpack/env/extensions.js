"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNativeModuleFileExtensions = exports.getModuleFileExtensions = void 0;
const paths_1 = require("@expo/config/paths");
/**
 * Get the platform specific platform extensions in the format that Webpack expects (with a dot prefix).
 *
 * @param platforms supported platforms in order of priority. ex: ios, android, web, native, electron, etc...
 * @category env
 */
function getModuleFileExtensions(...platforms) {
    // Webpack requires a `.` before each value
    return (0, paths_1.getBareExtensions)(platforms).map(value => `.${value}`);
}
exports.getModuleFileExtensions = getModuleFileExtensions;
function getNativeModuleFileExtensions(...platforms) {
    // Webpack requires a `.` before each value
    // Disable modern when using `react-native`
    return (0, paths_1.getBareExtensions)(platforms, { isReact: true, isTS: true, isModern: false }).map(value => `.${value}`);
}
exports.getNativeModuleFileExtensions = getNativeModuleFileExtensions;
//# sourceMappingURL=extensions.js.map