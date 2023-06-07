"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInnerList = exports.isValidKeyStr = exports.isValidTokenStr = exports.isAscii = void 0;
const asciiRe = /^[\x20-\x7E]*$/;
const tokenRe = /^[a-zA-Z*][:/!#$%&'*+\-.^_`|~A-Za-z0-9]*$/;
const keyRe = /^[a-z*][*\-_.a-z0-9]*$/;
function isAscii(str) {
    return asciiRe.test(str);
}
exports.isAscii = isAscii;
function isValidTokenStr(str) {
    return tokenRe.test(str);
}
exports.isValidTokenStr = isValidTokenStr;
function isValidKeyStr(str) {
    return keyRe.test(str);
}
exports.isValidKeyStr = isValidKeyStr;
function isInnerList(input) {
    return Array.isArray(input[0]);
}
exports.isInnerList = isInnerList;
//# sourceMappingURL=util.js.map