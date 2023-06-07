import { Dictionary, Item, List } from './types';
export declare class SerializeError extends Error {
}
export declare function serializeList(input: List): string;
export declare function serializeDictionary(input: Dictionary): string;
export declare function serializeItem(input: Item): string;
