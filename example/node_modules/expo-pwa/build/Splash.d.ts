import { Orientation } from './Orientation';
interface Device {
    names: string[];
    width: number;
    height: number;
    scale: number;
    isTablet: boolean;
}
export declare function assembleOrientationMedia(width: number, height: number, scale: number, orientation: string): string;
export declare function getDevices({ orientation, supportsTablet, }?: {
    orientation?: Orientation;
    supportsTablet?: boolean;
}): (Device & {
    orientations: Orientation[];
})[];
export {};
