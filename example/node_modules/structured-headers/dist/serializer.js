"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeItem = exports.serializeDictionary = exports.serializeList = exports.SerializeError = void 0;
const types_1 = require("./types");
const token_1 = require("./token");
const util_1 = require("./util");
class SerializeError extends Error {
}
exports.SerializeError = SerializeError;
function serializeList(input) {
    return input.map(value => {
        if (util_1.isInnerList(value)) {
            return serializeInnerList(value);
        }
        else {
            return serializeItem(value);
        }
    }).join(', ');
}
exports.serializeList = serializeList;
function serializeDictionary(input) {
    return Array.from(input.entries()).map(([key, value]) => {
        let out = serializeKey(key);
        if (value[0] === true) {
            out += serializeParameters(value[1]);
        }
        else {
            out += '=';
            if (util_1.isInnerList(value)) {
                out += serializeInnerList(value);
            }
            else {
                out += serializeItem(value);
            }
        }
        return out;
    }).join(', ');
}
exports.serializeDictionary = serializeDictionary;
function serializeItem(input) {
    return serializeBareItem(input[0]) + serializeParameters(input[1]);
}
exports.serializeItem = serializeItem;
function serializeInnerList(input) {
    return `(${input[0].map(value => serializeItem(value)).join(' ')})${serializeParameters(input[1])}`;
}
function serializeBareItem(input) {
    if (typeof input === 'number') {
        if (Number.isInteger(input)) {
            return serializeInteger(input);
        }
        return serializeDecimal(input);
    }
    if (typeof input === 'string') {
        return serializeString(input);
    }
    if (input instanceof token_1.Token) {
        return serializeToken(input);
    }
    if (input instanceof types_1.ByteSequence) {
        return serializeByteSequence(input);
    }
    if (typeof input === 'boolean') {
        return serializeBoolean(input);
    }
    throw new SerializeError(`Cannot serialize values of type ${typeof input}`);
}
function serializeInteger(input) {
    if (input < -999999999999999 || input > 999999999999999) {
        throw new SerializeError('Structured headers can only encode integers in the range range of -999,999,999,999,999 to 999,999,999,999,999 inclusive');
    }
    return input.toString();
}
function serializeDecimal(input) {
    const out = input.toFixed(3).replace(/0+$/, '');
    const signifantDigits = out.split('.')[0].replace('-', '').length;
    if (signifantDigits > 12) {
        throw new SerializeError('Fractional numbers are not allowed to have more than 12 significant digits before the decimal point');
    }
    return out;
}
function serializeString(input) {
    if (!util_1.isAscii(input)) {
        throw new SerializeError('Only ASCII strings may be serialized');
    }
    return `"${input.replace(/("|\\)/g, (v) => '\\' + v)}"`;
}
function serializeBoolean(input) {
    return input ? '?1' : '?0';
}
function serializeByteSequence(input) {
    return `:${input.toBase64()}:`;
}
function serializeToken(input) {
    return input.toString();
}
function serializeParameters(input) {
    return Array.from(input).map(([key, value]) => {
        let out = ';' + serializeKey(key);
        if (value !== true) {
            out += '=' + serializeBareItem(value);
        }
        return out;
    }).join('');
}
function serializeKey(input) {
    if (!util_1.isValidKeyStr(input)) {
        throw new SerializeError('Keys in dictionaries must only contain lowercase letter, numbers, _-*. and must start with a letter or *');
    }
    return input;
}
//# sourceMappingURL=serializer.js.map