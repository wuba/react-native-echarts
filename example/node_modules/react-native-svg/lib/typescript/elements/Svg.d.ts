/// <reference types="react" />
import { ColorValue, MeasureInWindowOnSuccessCallback, MeasureLayoutOnSuccessCallback, MeasureOnSuccessCallback, ViewProps } from 'react-native';
import { NumberProp } from '../lib/extract/types';
import Shape from './Shape';
import { GProps } from './G';
export interface SvgProps extends GProps, ViewProps {
    width?: NumberProp;
    height?: NumberProp;
    viewBox?: string;
    preserveAspectRatio?: string;
    color?: ColorValue;
    title?: string;
}
export default class Svg extends Shape<SvgProps> {
    static displayName: string;
    static defaultProps: {
        preserveAspectRatio: string;
    };
    measureInWindow: (callback: MeasureInWindowOnSuccessCallback) => void;
    measure: (callback: MeasureOnSuccessCallback) => void;
    measureLayout: (relativeToNativeNode: number, onSuccess: MeasureLayoutOnSuccessCallback, onFail: () => void) => void;
    setNativeProps: (props: Object & {
        width?: NumberProp;
        height?: NumberProp;
        bbWidth?: NumberProp;
        bbHeight?: NumberProp;
    }) => void;
    toDataURL: (callback: (base64: string) => void, options?: Object) => void;
    render(): JSX.Element;
}
