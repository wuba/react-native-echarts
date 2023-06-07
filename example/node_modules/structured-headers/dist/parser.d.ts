import { Dictionary, List, Item } from './types';
export declare function parseDictionary(input: string): Dictionary;
export declare function parseList(input: string): List;
export declare function parseItem(input: string): Item;
export declare class ParseError extends Error {
    constructor(position: number, message: string);
}
export default class Parser {
    input: string;
    pos: number;
    constructor(input: string);
    parseDictionary(): Dictionary;
    parseList(): List;
    parseItem(standaloneItem?: boolean): Item;
    private parseItemOrInnerList;
    private parseInnerList;
    private parseBareItem;
    private parseParameters;
    private parseIntegerOrDecimal;
    private parseString;
    private parseToken;
    private parseByteSequence;
    private parseBoolean;
    private parseKey;
    /**
     * Looks at the next character without advancing the cursor.
     */
    private lookChar;
    /**
     * Checks if the next character is 'char', and fail otherwise.
     */
    private expectChar;
    private getChar;
    private eof;
    private skipOWS;
    private skipWS;
    private checkTrail;
}
