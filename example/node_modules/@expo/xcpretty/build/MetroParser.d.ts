import { Formatter } from './Formatter';
import { Parser } from './Parser';
export declare class MetroParser extends Parser {
    formatter: Formatter;
    private isCollectingMetroError;
    private metroError;
    constructor(formatter: Formatter);
    parse(text: string): void | string;
    checkMetroError(text: string): string;
}
