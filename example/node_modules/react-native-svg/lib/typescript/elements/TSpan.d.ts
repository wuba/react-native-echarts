/// <reference types="react" />
import { TextChild } from '../lib/extract/extractText';
import Shape from './Shape';
import { CommonPathProps, FontProps, NumberArray, NumberProp, TransformProps } from '../lib/extract/types';
export interface TSpanProps extends CommonPathProps, FontProps {
    children?: TextChild;
    x?: NumberArray;
    y?: NumberArray;
    dx?: NumberArray;
    dy?: NumberArray;
    rotate?: NumberArray;
    inlineSize?: NumberProp;
}
export default class TSpan extends Shape<TSpanProps> {
    static displayName: string;
    setNativeProps: (props: Object & {
        matrix?: number[];
        style?: [] | {};
    } & TransformProps) => void;
    render(): JSX.Element;
}
