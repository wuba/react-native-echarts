import { ReactElement } from 'react';
import { ColumnMajorTransformMatrix, NumberProp, Units } from '../lib/extract/types';
import Shape from './Shape';
export interface LinearGradientProps {
    children?: ReactElement[];
    x1?: NumberProp;
    x2?: NumberProp;
    y1?: NumberProp;
    y2?: NumberProp;
    gradientUnits?: Units;
    gradientTransform?: ColumnMajorTransformMatrix | string;
    id?: string;
}
export default class LinearGradient extends Shape<LinearGradientProps> {
    static displayName: string;
    static defaultProps: {
        x1: string;
        y1: string;
        x2: string;
        y2: string;
    };
    render(): JSX.Element;
}
