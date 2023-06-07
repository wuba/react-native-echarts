"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parsePlistAsync = parsePlistAsync;
exports.parsePlistBuffer = parsePlistBuffer;
var _plist = _interopRequireDefault(require("@expo/plist"));
var _bplistParser = _interopRequireDefault(require("bplist-parser"));
var _promises = _interopRequireDefault(require("fs/promises"));
var Log = _interopRequireWildcard(require("../log"));
var _errors = require("./errors");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
const CHAR_CHEVRON_OPEN = 60;
const CHAR_B_LOWER = 98;
async function parsePlistAsync(plistPath) {
    Log.debug(`Parse plist: ${plistPath}`);
    return parsePlistBuffer(await _promises.default.readFile(plistPath));
}
function parsePlistBuffer(contents) {
    if (contents[0] === CHAR_CHEVRON_OPEN) {
        const info = _plist.default.parse(contents.toString());
        if (Array.isArray(info)) return info[0];
        return info;
    } else if (contents[0] === CHAR_B_LOWER) {
        // @ts-expect-error
        const info = _bplistParser.default.parseBuffer(contents);
        if (Array.isArray(info)) return info[0];
        return info;
    } else {
        throw new _errors.CommandError("PLIST", `Cannot parse plist of type byte (0x${contents[0].toString(16)})`);
    }
}

//# sourceMappingURL=plist.js.map