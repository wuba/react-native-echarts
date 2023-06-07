/// <reference types="node" />
export declare class BinaryXmlParser {
    buffer: Buffer;
    cursor: number;
    strings: string[];
    resources: any[];
    document: any;
    parent: any;
    stack: any[];
    debug: boolean;
    constructor(buffer: Buffer, options?: any);
    readU8(): number;
    readU16(): number;
    readS32(): number;
    readU32(): number;
    readLength8(): number;
    readLength16(): number;
    readDimension(): any;
    readFraction(): any;
    readHex24(): string;
    readHex32(): string;
    readTypedValue(): any;
    convertIntToFloat(int: number): number;
    readString(encoding: string): string;
    readChunkHeader(): {
        startOffset: number;
        chunkType: number;
        headerSize: number;
        chunkSize: number;
    };
    readStringPool(header: any): null;
    readResourceMap(header: any): null;
    readXmlNamespaceStart(): null;
    readXmlNamespaceEnd(): null;
    readXmlElementStart(): any;
    readXmlAttribute(): any;
    readXmlElementEnd(): null;
    readXmlCData(): any;
    readNull(header: any): null;
    parse(): any;
}
