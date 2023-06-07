"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageJsonForPath = void 0;
const find_up_1 = __importDefault(require("find-up"));
function getPackageJsonForPath(filePath) {
    const packageJson = find_up_1.default.sync('package.json', { cwd: filePath });
    if (packageJson) {
        return require(packageJson);
    }
    return null;
}
exports.getPackageJsonForPath = getPackageJsonForPath;
//# sourceMappingURL=getPackageJsonForPath.js.map