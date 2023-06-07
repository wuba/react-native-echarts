"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseError = exports.parseItem = exports.parseList = exports.parseDictionary = void 0;
const types_1 = require("./types");
const token_1 = require("./token");
const util_1 = require("./util");
function parseDictionary(input) {
    const parser = new Parser(input);
    return parser.parseDictionary();
}
exports.parseDictionary = parseDictionary;
function parseList(input) {
    const parser = new Parser(input);
    return parser.parseList();
}
exports.parseList = parseList;
function parseItem(input) {
    const parser = new Parser(input);
    return parser.parseItem();
}
exports.parseItem = parseItem;
class ParseError extends Error {
    constructor(position, message) {
        super(`Parse error: ${message} at offset ${position}`);
    }
}
exports.ParseError = ParseError;
class Parser {
    constructor(input) {
        this.input = input;
        this.pos = 0;
    }
    parseDictionary() {
        this.skipWS();
        const dictionary = new Map();
        while (!this.eof()) {
            const thisKey = this.parseKey();
            let member;
            if (this.lookChar() === '=') {
                this.pos++;
                member = this.parseItemOrInnerList();
            }
            else {
                member = [true, this.parseParameters()];
            }
            dictionary.set(thisKey, member);
            this.skipOWS();
            if (this.eof()) {
                return dictionary;
            }
            this.expectChar(',');
            this.pos++;
            this.skipOWS();
            if (this.eof()) {
                throw new ParseError(this.pos, 'Dictionary contained a trailing comma');
            }
        }
        return dictionary;
    }
    parseList() {
        this.skipWS();
        const members = [];
        while (!this.eof()) {
            members.push(this.parseItemOrInnerList());
            this.skipOWS();
            if (this.eof()) {
                return members;
            }
            this.expectChar(',');
            this.pos++;
            this.skipOWS();
            if (this.eof()) {
                throw new ParseError(this.pos, 'A list may not end with a trailing comma');
            }
        }
        return members;
    }
    parseItem(standaloneItem = true) {
        if (standaloneItem)
            this.skipWS();
        const result = [
            this.parseBareItem(),
            this.parseParameters()
        ];
        if (standaloneItem)
            this.checkTrail();
        return result;
    }
    parseItemOrInnerList() {
        if (this.lookChar() === '(') {
            return this.parseInnerList();
        }
        else {
            return this.parseItem(false);
        }
    }
    parseInnerList() {
        this.expectChar('(');
        this.pos++;
        const innerList = [];
        while (!this.eof()) {
            this.skipWS();
            if (this.lookChar() === ')') {
                this.pos++;
                return [
                    innerList,
                    this.parseParameters()
                ];
            }
            innerList.push(this.parseItem(false));
            const nextChar = this.lookChar();
            if (nextChar !== ' ' && nextChar !== ')') {
                throw new ParseError(this.pos, 'Expected a whitespace or ) after every item in an inner list');
            }
        }
        throw new ParseError(this.pos, 'Could not find end of inner list');
    }
    parseBareItem() {
        const char = this.lookChar();
        if (char.match(/^[-0-9]/)) {
            return this.parseIntegerOrDecimal();
        }
        if (char === '"') {
            return this.parseString();
        }
        if (char.match(/^[A-Za-z*]/)) {
            return this.parseToken();
        }
        if (char === ':') {
            return this.parseByteSequence();
        }
        if (char === '?') {
            return this.parseBoolean();
        }
        throw new ParseError(this.pos, 'Unexpected input');
    }
    parseParameters() {
        const parameters = new Map();
        while (!this.eof()) {
            const char = this.lookChar();
            if (char !== ';') {
                break;
            }
            this.pos++;
            this.skipWS();
            const key = this.parseKey();
            let value = true;
            if (this.lookChar() === '=') {
                this.pos++;
                value = this.parseBareItem();
            }
            parameters.set(key, value);
        }
        return parameters;
    }
    parseIntegerOrDecimal() {
        let type = 'integer';
        let sign = 1;
        let inputNumber = '';
        if (this.lookChar() === '-') {
            sign = -1;
            this.pos++;
        }
        // The spec wants this check but it's unreachable code.
        //if (this.eof()) {
        //  throw new ParseError(this.pos, 'Empty integer');
        //}
        if (!isDigit(this.lookChar())) {
            throw new ParseError(this.pos, 'Expected a digit (0-9)');
        }
        while (!this.eof()) {
            const char = this.getChar();
            if (isDigit(char)) {
                inputNumber += char;
            }
            else if (type === 'integer' && char === '.') {
                if (inputNumber.length > 12) {
                    throw new ParseError(this.pos, 'Exceeded maximum decimal length');
                }
                inputNumber += '.';
                type = 'decimal';
            }
            else {
                // We need to 'prepend' the character, so it's just a rewind
                this.pos--;
                break;
            }
            if (type === 'integer' && inputNumber.length > 15) {
                throw new ParseError(this.pos, 'Exceeded maximum integer length');
            }
            if (type === 'decimal' && inputNumber.length > 16) {
                throw new ParseError(this.pos, 'Exceeded maximum decimal length');
            }
        }
        if (type === 'integer') {
            return parseInt(inputNumber, 10) * sign;
        }
        else {
            if (inputNumber.endsWith('.')) {
                throw new ParseError(this.pos, 'Decimal cannot end on a period');
            }
            if (inputNumber.split('.')[1].length > 3) {
                throw new ParseError(this.pos, 'Number of digits after the decimal point cannot exceed 3');
            }
            return parseFloat(inputNumber) * sign;
        }
    }
    parseString() {
        let outputString = '';
        this.expectChar('"');
        this.pos++;
        while (!this.eof()) {
            const char = this.getChar();
            if (char === '\\') {
                if (this.eof()) {
                    throw new ParseError(this.pos, 'Unexpected end of input');
                }
                const nextChar = this.getChar();
                if (nextChar !== '\\' && nextChar !== '"') {
                    throw new ParseError(this.pos, 'A backslash must be followed by another backslash or double quote');
                }
                outputString += nextChar;
            }
            else if (char === '"') {
                return outputString;
            }
            else if (!util_1.isAscii(char)) {
                throw new Error('Strings must be in the ASCII range');
            }
            else {
                outputString += char;
            }
        }
        throw new ParseError(this.pos, 'Unexpected end of input');
    }
    parseToken() {
        // The specification wants this check, but it's an unreachable code block.
        // if (!/^[A-Za-z*]/.test(this.lookChar())) {
        //  throw new ParseError(this.pos, 'A token must begin with an asterisk or letter (A-Z, a-z)');
        //}
        let outputString = '';
        while (!this.eof()) {
            const char = this.lookChar();
            if (!/^[:/!#$%&'*+\-.^_`|~A-Za-z0-9]$/.test(char)) {
                return new token_1.Token(outputString);
            }
            outputString += this.getChar();
        }
        return new token_1.Token(outputString);
    }
    parseByteSequence() {
        this.expectChar(':');
        this.pos++;
        const endPos = this.input.indexOf(':', this.pos);
        if (endPos === -1) {
            throw new ParseError(this.pos, 'Could not find a closing ":" character to mark end of Byte Sequence');
        }
        const b64Content = this.input.substring(this.pos, endPos);
        this.pos += b64Content.length + 1;
        if (!/^[A-Za-z0-9+/=]*$/.test(b64Content)) {
            throw new ParseError(this.pos, 'ByteSequence does not contain a valid base64 string');
        }
        return new types_1.ByteSequence(b64Content);
    }
    parseBoolean() {
        this.expectChar('?');
        this.pos++;
        const char = this.getChar();
        if (char === '1') {
            return true;
        }
        if (char === '0') {
            return false;
        }
        throw new ParseError(this.pos, 'Unexpected character. Expected a "1" or a "0"');
    }
    parseKey() {
        if (!this.lookChar().match(/^[a-z*]/)) {
            throw new ParseError(this.pos, 'A key must begin with an asterisk or letter (a-z)');
        }
        let outputString = '';
        while (!this.eof()) {
            const char = this.lookChar();
            if (!/^[a-z0-9_\-.*]$/.test(char)) {
                return outputString;
            }
            outputString += this.getChar();
        }
        return outputString;
    }
    /**
     * Looks at the next character without advancing the cursor.
     */
    lookChar() {
        return this.input[this.pos];
    }
    /**
     * Checks if the next character is 'char', and fail otherwise.
     */
    expectChar(char) {
        if (this.lookChar() !== char) {
            throw new ParseError(this.pos, `Expected ${char}`);
        }
    }
    getChar() {
        return this.input[this.pos++];
    }
    eof() {
        return this.pos >= this.input.length;
    }
    // Advances the pointer to skip all whitespace.
    skipOWS() {
        while (true) {
            const c = this.input.substr(this.pos, 1);
            if (c === ' ' || c === '\t') {
                this.pos++;
            }
            else {
                break;
            }
        }
    }
    // Advances the pointer to skip all spaces
    skipWS() {
        while (this.lookChar() === ' ') {
            this.pos++;
        }
    }
    // At the end of parsing, we need to make sure there are no bytes after the
    // header except whitespace.
    checkTrail() {
        this.skipWS();
        if (!this.eof()) {
            throw new ParseError(this.pos, 'Unexpected characters at end of input');
        }
    }
}
exports.default = Parser;
const isDigitRegex = /^[0-9]$/;
function isDigit(char) {
    return isDigitRegex.test(char);
}
//# sourceMappingURL=parser.js.map