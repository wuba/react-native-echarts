"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModuleDependencyWarning = exports.getNotFoundError = void 0;
/**
 * Copyright JS Foundation and other contributors
 * Copyright (c) 2021 Vercel, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Based on https://github.com/webpack/webpack/blob/fcdd04a833943394bbb0a9eeb54a962a24cc7e41/lib/stats/DefaultStatsFactoryPlugin.js#L422-L431
 * Based on https://github.com/vercel/next.js/pull/27840
 */
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const WebpackFileError_1 = require("./WebpackFileError");
const createOriginalStackFrame_1 = require("./createOriginalStackFrame");
// import { isWebpack5 } from 'webpack';
// TODO: Webpack 5
const isWebpack5 = false;
function getModuleTrace(input, compilation) {
    const visitedModules = new Set();
    const moduleTrace = [];
    let current = input.module;
    while (current) {
        if (visitedModules.has(current))
            break; // circular (technically impossible, but who knows)
        visitedModules.add(current);
        const origin = compilation.moduleGraph.getIssuer(current);
        if (!origin)
            break;
        moduleTrace.push({ origin, module: current });
        current = origin;
    }
    return moduleTrace;
}
async function getNotFoundError(compilation, input, fileName) {
    if (input.name !== 'ModuleNotFoundError') {
        return false;
    }
    const stack = await createStackTrace(getProjectRoot(compilation), {
        loc: input.loc
            ? input.loc
            : (input.dependencies || []).map((d) => d.loc).filter(Boolean)[0],
        originalSource: input.module.originalSource(),
    });
    // If we could not result the original location we still need to show the existing error
    if (!stack) {
        return input;
    }
    const errorMessage = input.error.message
        .replace(/ in '.*?'/, '')
        .replace(/Can't resolve '(.*)'/, `Can't resolve '${chalk_1.default.green('$1')}'`);
    return new WebpackFileError_1.WebpackFileError({
        filePath: fileName,
        line: stack.lineNumber,
        col: stack.column,
    }, [
        chalk_1.default.red.bold('Module not found') + `: ${errorMessage}`,
        stack.frame,
        getImportTrace(compilation, input),
        // TODO: FYI
    ]
        .filter(Boolean)
        .join('\n'));
}
exports.getNotFoundError = getNotFoundError;
function getImportTrace(compilation, input) {
    if (!isWebpack5) {
        return '';
    }
    const projectRoot = getProjectRoot(compilation);
    let importTraceLine = '\nImport trace for requested module:\n';
    const moduleTrace = getModuleTrace(input, compilation);
    for (const { origin } of moduleTrace) {
        if (!origin.resource) {
            continue;
        }
        const filePath = path_1.default.relative(projectRoot, origin.resource);
        importTraceLine += `./${filePath}\n`;
    }
    return importTraceLine + '\n';
}
// This can occur in React Native when using require incorrectly:
// i.e. `(require: any).Systrace = Systrace;` which is valid in Metro.
async function getModuleDependencyWarning(compilation, input, fileName) {
    if (input.name !== 'ModuleDependencyWarning') {
        return false;
    }
    const stack = await createStackTrace(getProjectRoot(compilation), {
        loc: input.loc,
        originalSource: input.module.originalSource(),
    });
    // If we could not result the original location we still need to show the existing error
    if (!stack) {
        return input;
    }
    return new WebpackFileError_1.WebpackFileError({
        filePath: fileName,
        line: stack.lineNumber,
        col: stack.column,
    }, [
        input.error.message,
        stack.frame,
        getImportTrace(compilation, input),
        // TODO: FYI
    ]
        .filter(Boolean)
        .join('\n'));
}
exports.getModuleDependencyWarning = getModuleDependencyWarning;
function getProjectRoot(compilation) {
    var _a;
    // @ts-ignore: Webpack v5/v4
    return (_a = compilation.options.context) !== null && _a !== void 0 ? _a : compilation.context;
}
async function createStackTrace(projectRoot, { loc, originalSource }) {
    var _a, _b, _c;
    try {
        const result = await (0, createOriginalStackFrame_1.createOriginalStackFrame)({
            line: (_a = loc === null || loc === void 0 ? void 0 : loc.start) === null || _a === void 0 ? void 0 : _a.line,
            column: (_b = loc === null || loc === void 0 ? void 0 : loc.start) === null || _b === void 0 ? void 0 : _b.column,
            source: originalSource,
            rootDirectory: projectRoot,
            frameNodeModules: true,
            frame: {},
        });
        // If we could not result the original location we still need to show the existing error
        if (!result) {
            return null;
        }
        return {
            lineNumber: result.originalStackFrame.lineNumber,
            column: result.originalStackFrame.column,
            frame: (_c = result.originalCodeFrame) !== null && _c !== void 0 ? _c : '',
        };
    }
    catch (err) {
        console.log('Failed to parse source map:', err);
        // Don't fail on failure to resolve sourcemaps
        return null;
    }
}
//# sourceMappingURL=parseNotFoundError.js.map