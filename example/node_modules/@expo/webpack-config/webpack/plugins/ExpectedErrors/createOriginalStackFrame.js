"use strict";
/**
 * Copyright © 2021 650 Industries.
 * Copyright © 2021 Vercel, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Based on https://github.com/vercel/next.js/blob/1552b8341e5b512a2827485a4a9689cd429c520e/packages/react-dev-overlay/src/middleware.ts#L63-L178
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOriginalStackFrame = void 0;
const code_frame_1 = require("@babel/code-frame");
const path_1 = __importDefault(require("path"));
// @ts-ignore
const source_map_1 = require("source-map");
function getSourcePath(source) {
    // Webpack prefixes certain source paths with this path
    if (source.startsWith('webpack:///')) {
        return source.substring(11);
    }
    // Make sure library name is filtered out as well
    if (source.startsWith('webpack://_N_E/')) {
        return source.substring(15);
    }
    if (source.startsWith('webpack://')) {
        return source.substring(10);
    }
    return source;
}
// TODO: Use dev-server symbolicator instead
async function findOriginalSourcePositionAndContent(webpackSource, position) {
    var _a, _b, _c;
    const consumer = await new source_map_1.SourceMapConsumer(webpackSource.map());
    try {
        const sourcePosition = consumer.originalPositionFor({
            line: position.line,
            column: (_a = position.column) !== null && _a !== void 0 ? _a : 0,
        });
        if (!sourcePosition.source) {
            return null;
        }
        const sourceContent = (_b = consumer.sourceContentFor(sourcePosition.source, /* returnNullOnMissing */ true)) !== null && _b !== void 0 ? _b : null;
        return {
            sourcePosition,
            sourceContent,
        };
    }
    finally {
        // @ts-ignore: unexpected type
        (_c = consumer.destroy) === null || _c === void 0 ? void 0 : _c.call(consumer);
    }
}
async function createOriginalStackFrame({ line, column, source, modulePath, rootDirectory, frame, frameNodeModules, }) {
    var _a, _b, _c;
    const result = await findOriginalSourcePositionAndContent(source, {
        line,
        column,
    });
    if (result === null) {
        return null;
    }
    const { sourcePosition, sourceContent } = result;
    if (!sourcePosition.source) {
        return null;
    }
    const filePath = path_1.default.resolve(rootDirectory, modulePath || getSourcePath(sourcePosition.source));
    const originalFrame = {
        file: sourceContent ? path_1.default.relative(rootDirectory, filePath) : sourcePosition.source,
        lineNumber: sourcePosition.line,
        column: sourcePosition.column,
        methodName: frame.methodName,
        arguments: [],
    };
    const originalCodeFrame = (frameNodeModules || !((_b = (_a = originalFrame.file) === null || _a === void 0 ? void 0 : _a.includes('node_modules')) !== null && _b !== void 0 ? _b : true)) &&
        sourceContent &&
        sourcePosition.line
        ? (0, code_frame_1.codeFrameColumns)(sourceContent, {
            start: {
                line: sourcePosition.line,
                column: (_c = sourcePosition.column) !== null && _c !== void 0 ? _c : 0,
            },
        }, { forceColor: true })
        : null;
    return {
        originalStackFrame: originalFrame,
        originalCodeFrame,
    };
}
exports.createOriginalStackFrame = createOriginalStackFrame;
//# sourceMappingURL=createOriginalStackFrame.js.map