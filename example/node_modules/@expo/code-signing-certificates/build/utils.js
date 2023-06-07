"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPositiveHex = void 0;
const nullthrows_1 = __importDefault(require("nullthrows"));
// a hexString is considered negative if its most significant bit is 1
// because serial numbers use ones' complement notation
// this RFC in section 4.1.2.2 requires serial numbers to be positive
// http://www.ietf.org/rfc/rfc5280.txt
function toPositiveHex(hexString) {
    let mostSignificantHexAsInt = parseInt((0, nullthrows_1.default)(hexString[0]), 16);
    if (mostSignificantHexAsInt < 8) {
        return hexString;
    }
    mostSignificantHexAsInt -= 8;
    return mostSignificantHexAsInt.toString(16) + hexString.substring(1);
}
exports.toPositiveHex = toPositiveHex;
//# sourceMappingURL=utils.js.map