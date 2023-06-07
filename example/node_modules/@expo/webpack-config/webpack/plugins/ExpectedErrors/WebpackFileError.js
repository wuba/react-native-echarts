"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackFileError = void 0;
const chalk_1 = __importDefault(require("chalk"));
class WebpackFileError extends Error {
    constructor(file, message) {
        super(message);
        this.file = formatPaths(file);
    }
}
exports.WebpackFileError = WebpackFileError;
function formatPaths(config) {
    const filePath = chalk_1.default.reset.cyan(config.filePath);
    return filePath + chalk_1.default.gray(`:${[config.line, config.col].filter(Boolean).join(':')}`);
}
//# sourceMappingURL=WebpackFileError.js.map