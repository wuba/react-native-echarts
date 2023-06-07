"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchRegex = void 0;
function switchRegex(text, cases, isAll = false) {
    for (const [reg, callback] of cases) {
        if (!reg) {
            return callback([]) || '';
        }
        const results = text.match(reg);
        if (results) {
            const res = callback(results);
            if (!isAll) {
                return res || '';
            }
        }
    }
    return '';
}
exports.switchRegex = switchRegex;
//# sourceMappingURL=switchRegex.js.map