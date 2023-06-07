/// <reference types="react" />
import { ImageProps as RNImageProps } from 'react-native';
import { ClipProps, CommonMaskProps, NativeProps, NumberProp, ResponderProps, TouchableProps } from '../lib/extract/types';
import Shape from './Shape';
export interface ImageProps extends ResponderProps, CommonMaskProps, ClipProps, TouchableProps, NativeProps {
    x?: NumberProp;
    y?: NumberProp;
    width?: NumberProp;
    height?: NumberProp;
    xlinkHref?: RNImageProps['source'];
    href?: RNImageProps['source'];
    preserveAspectRatio?: string;
    opacity?: NumberProp;
    clipPath?: string;
    id?: string;
}
export default class SvgImage extends Shape<ImageProps> {
    static displayName: string;
    static defaultProps: {
        x: number;
        y: number;
        width: number;
        height: number;
        preserveAspectRatio: string;
    };
    render(): JSX.Element;
}
