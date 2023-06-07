"use strict";
/**
 * Copyright (c) 2022 Expo, Inc.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Based on https://github.com/facebook/create-react-app/blob/a422bf2/packages/react-dev-utils/evalSourceMapMiddleware.js
 * But with Node LTS support.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvalSourceMapMiddleware = void 0;
function base64SourceMap(source) {
    const base64 = Buffer.from(JSON.stringify(source.map()), 'utf8').toString('base64');
    return `data:application/json;charset=utf-8;base64,${base64}`;
}
function getSourceById(server, id) {
    const module = Array.from(server._stats.compilation.modules).find(m => server._stats.compilation.chunkGraph.getModuleId(m) === id);
    // @ts-ignore
    return module.originalSource();
}
/*
 * Middleware responsible for retrieving a generated source
 * Receives a webpack internal url: "webpack-internal:///<module-id>"
 * Returns a generated source: "<source-text><sourceMappingURL><sourceURL>"
 *
 * Based on EvalSourceMapDevToolModuleTemplatePlugin.js
 */
function createEvalSourceMapMiddleware(server) {
    return function handleWebpackInternalMiddleware(req, res, next) {
        var _a;
        if (req.url.startsWith('/__get-internal-source')) {
            const fileName = req.query.fileName;
            if (typeof fileName !== 'string') {
                return next();
            }
            const id = (_a = fileName === null || fileName === void 0 ? void 0 : fileName.match(/webpack-internal:\/\/\/(.+)/)) === null || _a === void 0 ? void 0 : _a[1];
            // @ts-ignore: untyped
            if (!id || !server._stats) {
                return next();
            }
            const source = getSourceById(server, id);
            const sourceMapURL = `//# sourceMappingURL=${base64SourceMap(source)}`;
            const sourceURL = `//# sourceURL=webpack-internal:///${module.id}`;
            res.end(`${source.source()}\n${sourceMapURL}\n${sourceURL}`);
        }
        else {
            return next();
        }
    };
}
exports.createEvalSourceMapMiddleware = createEvalSourceMapMiddleware;
//# sourceMappingURL=evalSourceMapMiddleware.js.map