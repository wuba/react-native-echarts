"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCI = exports.shouldUseSourceMap = exports.sockPort = exports.sockPath = exports.sockHost = exports.host = exports.EXPO_DEBUG = void 0;
const getenv_1 = require("getenv");
exports.EXPO_DEBUG = (0, getenv_1.boolish)('EXPO_DEBUG', false);
exports.host = process.env.HOST || '0.0.0.0';
exports.sockHost = process.env.WDS_SOCKET_HOST;
// TODO: /ws throws on native because it expects wds to provide a version number like `2`, to get around this we use a different path.
exports.sockPath = process.env.WDS_SOCKET_PATH || '/_expo/ws'; // default: '/ws'
exports.sockPort = process.env.WDS_SOCKET_PORT;
// Source maps are resource heavy and can cause out of memory issue for large source files.
exports.shouldUseSourceMap = (0, getenv_1.boolish)('GENERATE_SOURCEMAP', true);
exports.isCI = (0, getenv_1.boolish)('CI', false);
//# sourceMappingURL=defaults.js.map