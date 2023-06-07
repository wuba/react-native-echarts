"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBabelError = void 0;
/**
 * Copyright © 2021 650 Industries.
 * Copyright © 2021 Vercel, Inc.
 * Copyright 2014-present Sebastian McKenzie and other contributors
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Based on https://github.com/vercel/next.js/blob/1552b8341e5b512a2827485a4a9689cd429c520e/packages/next/build/webpack/plugins/wellknown-errors-plugin/parseBabel.ts
 * Based on https://github.com/babel/babel/blob/34693d6024da3f026534dd8d569f97ac0109602e/packages/babel-core/src/parser/index.js
 */
const chalk_1 = __importDefault(require("chalk"));
const WebpackFileError_1 = require("./WebpackFileError");
function getBabelError(fileName, err) {
    if (err.code !== 'BABEL_PARSE_ERROR') {
        return false;
    }
    if (err.loc) {
        const lineNumber = Math.max(1, err.loc.line);
        const column = Math.max(1, err.loc.column);
        const message = err.message
            // Remove file information, which instead is provided by webpack.
            .replace(/^.+?: /, '')
            // Remove column information from message
            .replace(new RegExp(`[^\\S\\r\\n]*\\(${lineNumber}:${column}\\)[^\\S\\r\\n]*`), '');
        return new WebpackFileError_1.WebpackFileError({
            filePath: fileName,
            line: lineNumber,
            col: column,
        }, chalk_1.default.red.bold('Syntax error').concat(`: ${message}`));
    }
    return false;
}
exports.getBabelError = getBabelError;
//# sourceMappingURL=parseBabelError.js.map