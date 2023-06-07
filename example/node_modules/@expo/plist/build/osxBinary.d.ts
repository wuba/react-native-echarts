/// <reference types="node" />
import { PlistValue } from '.';
export declare const maxObjectSize: number;
export declare const maxObjectCount = 32768;
export declare class UID {
    UID: number;
    constructor(UID: number);
}
export declare function parseFile(fileNameOrBuffer: string | Buffer): Promise<(UID | PlistValue | null)[]>;
export declare const parseBuffer: (buffer: Buffer) => (UID | PlistValue | null)[];
