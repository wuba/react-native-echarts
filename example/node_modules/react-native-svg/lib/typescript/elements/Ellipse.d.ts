/// <reference types="react" />
import { CommonPathProps, NumberProp } from '../lib/extract/types';
import Shape from './Shape';
export interface EllipseProps extends CommonPathProps {
    cx?: NumberProp;
    cy?: NumberProp;
    opacity?: NumberProp;
    rx?: NumberProp;
    ry?: NumberProp;
}
export default class Ellipse extends Shape<EllipseProps> {
    static displayName: string;
    static defaultProps: {
        cx: number;
        cy: number;
        rx: number;
        ry: number;
    };
    render(): JSX.Element;
}
