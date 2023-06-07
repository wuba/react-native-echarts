import { ReactNode } from 'react';
import { ColumnMajorTransformMatrix, NumberProp, TransformProps, Units } from '../lib/extract/types';
import Shape from './Shape';
export interface PatternProps {
    children?: ReactNode;
    id?: string;
    x?: NumberProp;
    y?: NumberProp;
    width?: NumberProp;
    height?: NumberProp;
    patternTransform?: ColumnMajorTransformMatrix | string;
    patternUnits?: Units;
    patternContentUnits?: Units;
    viewBox?: string;
    preserveAspectRatio?: string;
    transform?: ColumnMajorTransformMatrix | string | TransformProps;
}
export default class Pattern extends Shape<PatternProps> {
    static displayName: string;
    static defaultProps: {
        x: string;
        y: string;
        width: string;
        height: string;
    };
    render(): JSX.Element;
}
