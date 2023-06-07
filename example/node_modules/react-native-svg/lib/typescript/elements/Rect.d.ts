/// <reference types="react" />
import { CommonPathProps, NumberProp } from '../lib/extract/types';
import Shape from './Shape';
export interface RectProps extends CommonPathProps {
    x?: NumberProp;
    y?: NumberProp;
    width?: NumberProp;
    height?: NumberProp;
    rx?: NumberProp;
    ry?: NumberProp;
    opacity?: NumberProp;
}
export default class Rect extends Shape<RectProps> {
    static displayName: string;
    static defaultProps: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    render(): JSX.Element;
}
