/// <reference types="react" />
import { CommonPathProps, NumberProp } from '../lib/extract/types';
import Shape from './Shape';
export interface CircleProps extends CommonPathProps {
    cx?: NumberProp;
    cy?: NumberProp;
    opacity?: NumberProp;
    r?: NumberProp;
}
export default class Circle extends Shape<CircleProps> {
    static displayName: string;
    static defaultProps: {
        cx: number;
        cy: number;
        r: number;
    };
    render(): JSX.Element;
}
