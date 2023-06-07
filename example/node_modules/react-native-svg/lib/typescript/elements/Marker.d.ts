import { ReactNode } from 'react';
import { NumberProp } from '../lib/extract/types';
import Shape from './Shape';
export declare type MarkerUnits = 'strokeWidth' | 'userSpaceOnUse';
export declare type Orient = 'auto' | 'auto-start-reverse';
export interface MarkerProps {
    children?: ReactNode;
    id?: string;
    viewBox?: string;
    preserveAspectRatio?: string;
    refX?: NumberProp;
    refY?: NumberProp;
    markerWidth?: NumberProp;
    markerHeight?: NumberProp;
    markerUnits?: MarkerUnits;
    orient?: Orient | NumberProp;
}
export default class Marker extends Shape<MarkerProps> {
    static displayName: string;
    static defaultProps: {
        refX: number;
        refY: number;
        orient: string;
        markerWidth: number;
        markerHeight: number;
        markerUnits: string;
    };
    render(): JSX.Element;
}
