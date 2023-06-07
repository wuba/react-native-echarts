import { Token } from './token';
/**
 * Lists are arrays of zero or more members, each of which can be an Item
 * or an Inner List, both of which can be Parameterized
 */
export declare type List = (InnerList | Item)[];
/**
 * An Inner List is an array of zero or more Items. Both the individual Items
 * and the Inner List itself can be Parameterized.
 */
export declare type InnerList = [Item[], Parameters];
/**
 * Parameters are an ordered map of key-value pairs that are associated with
 * an Item or Inner List. The keys are unique within the scope of the
 * Parameters they occur within, and the values are bare items (i.e., they
 * themselves cannot be parameterized
 */
export declare type Parameters = Map<string, BareItem>;
/**
 * Dictionaries are ordered maps of key-value pairs, where the keys are short
 * textual strings and the values are Items or arrays of Items, both of which
 * can be Parameterized.
 *
 * There can be zero or more members, and their keys are unique in the scope
 * of the Dictionary they occur within.
 */
export declare type Dictionary = Map<string, Item | InnerList>;
export declare class ByteSequence {
    base64Value: string;
    constructor(base64Value: string);
    toBase64(): string;
}
export declare type BareItem = number | string | Token | ByteSequence | boolean;
export declare type Item = [BareItem, Parameters];
