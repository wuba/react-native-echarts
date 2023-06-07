export declare type Orientation = 'any' | 'natural' | 'landscape' | 'landscape-primary' | 'landscape-secondary' | 'portrait' | 'portrait-primary' | 'portrait-secondary' | 'omit';
export declare function isValid(orientation: string): orientation is Orientation;
export declare function isLandscape(orientation: string): boolean;
export declare function isPortrait(orientation: string): boolean;
