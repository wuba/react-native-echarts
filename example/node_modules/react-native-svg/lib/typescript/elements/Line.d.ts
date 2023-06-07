/// <reference types="react" />
import { CommonPathProps, NumberProp } from '../lib/extract/types';
import Shape from './Shape';
export interface LineProps extends CommonPathProps {
    opacity?: NumberProp;
    x1?: NumberProp;
    x2?: NumberProp;
    y1?: NumberProp;
    y2?: NumberProp;
}
export default class Line extends Shape<LineProps> {
    static displayName: string;
    static defaultProps: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    };
    render(): JSX.Element;
}
