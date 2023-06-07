import React, { ComponentType } from 'react';
import { NumberArray, NumberProp } from './types';
interface fontProps {
    fontData?: unknown;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: NumberProp;
    fontStretch?: string;
    fontSize?: NumberProp;
    fontFamily?: string;
    textAnchor?: string;
    textDecoration?: string;
    letterSpacing?: NumberProp;
    wordSpacing?: NumberProp;
    kerning?: NumberProp;
    fontFeatureSettings?: string;
    fontVariantLigatures?: string;
    fontVariationSettings?: string;
    font?: string;
}
export declare function extractFont(props: fontProps): {
    [prop: string]: string | null;
};
export declare function setTSpan(TSpanImplementation: ComponentType): void;
export declare type TextChild = (undefined | string | number | ComponentType | React.ReactElement) | TextChild[];
export declare type TextProps = {
    x?: NumberArray;
    y?: NumberArray;
    dx?: NumberArray;
    dy?: NumberArray;
    rotate?: NumberArray;
    children?: TextChild;
    inlineSize?: NumberProp;
    baselineShift?: NumberProp;
    verticalAlign?: NumberProp;
    alignmentBaseline?: string;
} & fontProps;
export default function extractText(props: TextProps, container: boolean): {
    alignmentBaseline: string | undefined;
    font: {
        [prop: string]: string | null;
    };
    x: string[];
    y: string[];
    dx: string[];
    dy: string[];
    rotate: string[];
    content: string | null;
    children: JSX.Element | React.ComponentType<{}> | (JSX.Element | React.ComponentType<{}> | TextChild[])[] | null | undefined;
};
export {};
