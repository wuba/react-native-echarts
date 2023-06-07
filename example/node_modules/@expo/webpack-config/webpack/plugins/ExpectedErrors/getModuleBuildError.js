"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModuleBuildError = void 0;
/**
 * Copyright © 2021 650 Industries.
 * Copyright © 2021 Vercel, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Based on https://github.com/vercel/next.js/blob/1552b8341e5b512a2827485a4a9689cd429c520e/packages/next/build/webpack/plugins/wellknown-errors-plugin/webpackModuleError.ts
 */
const path = __importStar(require("path"));
const parseBabelError_1 = require("./parseBabelError");
const parseNotFoundError_1 = require("./parseNotFoundError");
function getFileData(compilation, m) {
    var _a, _b, _c, _d;
    let resolved;
    const ctx = (_c = (_b = (_a = compilation.compiler) === null || _a === void 0 ? void 0 : _a.context) !== null && _b !== void 0 ? _b : compilation.options.context) !== null && _c !== void 0 ? _c : null;
    if (ctx !== null && typeof m.resource === 'string') {
        const res = path.relative(ctx, m.resource).replace(/\\/g, path.posix.sep);
        resolved = res.startsWith('.') ? res : `.${path.posix.sep}${res}`;
    }
    else {
        const requestShortener = compilation.requestShortener;
        if (typeof (m === null || m === void 0 ? void 0 : m.readableIdentifier) === 'function') {
            resolved = m.readableIdentifier(requestShortener);
        }
        else {
            resolved = (_d = m.request) !== null && _d !== void 0 ? _d : m.userRequest;
        }
    }
    return resolved || '<unknown>';
}
async function getModuleBuildError(compilation, input) {
    if (!(typeof input === 'object' &&
        ['ModuleBuildError', 'ModuleNotFoundError', 'ModuleDependencyWarning'].includes(input.name) &&
        Boolean(input.module) &&
        input.error instanceof Error)) {
        return false;
    }
    const sourceFilename = getFileData(compilation, input.module);
    if (input.name === 'ModuleDependencyWarning') {
        return await (0, parseNotFoundError_1.getModuleDependencyWarning)(compilation, input, sourceFilename);
    }
    const notFoundError = await (0, parseNotFoundError_1.getNotFoundError)(compilation, input, sourceFilename);
    if (notFoundError !== false) {
        return notFoundError;
    }
    const babel = (0, parseBabelError_1.getBabelError)(sourceFilename, input.error);
    if (babel !== false) {
        return babel;
    }
    return false;
}
exports.getModuleBuildError = getModuleBuildError;
//# sourceMappingURL=getModuleBuildError.js.map