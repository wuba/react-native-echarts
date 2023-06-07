"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BREADCRUMB = exports.INDENT = exports.WARNING = exports.ERROR = exports.MEASURE = exports.COMPLETION = exports.PENDING = exports.FAIL = exports.PASS = void 0;
const USE_ASCII = false;
exports.PASS = '✓';
exports.FAIL = '✗';
exports.PENDING = '⧖';
exports.COMPLETION = '\u203A'; //'▸';
exports.MEASURE = '◷';
exports.ERROR = USE_ASCII ? '[x]' : '❌ ';
exports.WARNING = USE_ASCII ? '[!]' : '⚠️ ';
exports.INDENT = '    ';
exports.BREADCRUMB = '»';
//# sourceMappingURL=symbols.js.map