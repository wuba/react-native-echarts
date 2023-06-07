import { ReactNode } from 'react';
import { ColumnMajorTransformMatrix, CommonPathProps, NumberProp } from '../lib/extract/types';
import Shape from './Shape';
export declare type TMaskUnits = 'userSpaceOnUse' | 'objectBoundingBox';
export interface MaskProps extends CommonPathProps {
    children?: ReactNode;
    id?: string;
    x?: NumberProp;
    y?: NumberProp;
    width?: NumberProp;
    height?: NumberProp;
    maskTransform?: ColumnMajorTransformMatrix | string;
    maskUnits?: TMaskUnits;
    maskContentUnits?: TMaskUnits;
}
export default class Mask extends Shape<MaskProps> {
    static displayName: string;
    static defaultProps: {
        x: string;
        y: string;
        width: string;
        height: string;
    };
    render(): JSX.Element;
}
