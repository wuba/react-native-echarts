import { ReactElement } from 'react';
import { ColumnMajorTransformMatrix, NumberProp, Units } from '../lib/extract/types';
import Shape from './Shape';
export interface RadialGradientProps {
    children?: ReactElement[];
    fx?: NumberProp;
    fy?: NumberProp;
    rx?: NumberProp;
    ry?: NumberProp;
    cx?: NumberProp;
    cy?: NumberProp;
    r?: NumberProp;
    gradientUnits?: Units;
    gradientTransform?: ColumnMajorTransformMatrix | string;
    id?: string;
}
export default class RadialGradient extends Shape<RadialGradientProps> {
    static displayName: string;
    static defaultProps: {
        cx: string;
        cy: string;
        r: string;
    };
    render(): JSX.Element;
}
