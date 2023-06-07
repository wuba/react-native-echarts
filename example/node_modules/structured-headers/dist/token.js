"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const util_1 = require("./util");
class Token {
    constructor(value) {
        if (!util_1.isValidTokenStr(value)) {
            throw new TypeError('Invalid character in Token string. Tokens must start with *, A-Z and the rest of the string may only contain a-z, A-Z, 0-9, :/!#$%&\'*+-.^_`|~');
        }
        this.value = value;
    }
    toString() {
        return this.value;
    }
}
exports.Token = Token;
//# sourceMappingURL=token.js.map