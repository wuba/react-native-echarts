import { Item, InnerList } from './types';
export declare function isAscii(str: string): boolean;
export declare function isValidTokenStr(str: string): boolean;
export declare function isValidKeyStr(str: string): boolean;
export declare function isInnerList(input: Item | InnerList): input is InnerList;
