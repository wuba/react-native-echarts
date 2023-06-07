/// <reference types="react" />
import { NumberProp, TextPathMethod, TextPathMidLine, TextPathSpacing, TextSpecificProps, TransformProps } from '../lib/extract/types';
import { TextChild } from '../lib/extract/extractText';
import Shape from './Shape';
export interface TextPathProps extends TextSpecificProps {
    children?: TextChild;
    xlinkHref?: string;
    href?: string;
    startOffset?: NumberProp;
    method?: TextPathMethod;
    spacing?: TextPathSpacing;
    midLine?: TextPathMidLine;
    side?: string;
}
export default class TextPath extends Shape<TextPathProps> {
    static displayName: string;
    setNativeProps: (props: Object & {
        matrix?: number[];
        style?: [] | {};
    } & TransformProps) => void;
    render(): JSX.Element;
}
