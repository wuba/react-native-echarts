import { ClipProps, extractedProps, FillProps, NumberProp, ResponderProps, StrokeProps, TransformProps } from './types';
export declare function propsAndStyles(props: Object & {
    style?: [] | {};
}): any;
export default function extractProps(props: {
    id?: string;
    mask?: string;
    marker?: string;
    markerStart?: string;
    markerMid?: string;
    markerEnd?: string;
    clipPath?: string;
    display?: string;
    opacity?: NumberProp;
    onLayout?: () => void;
    transform?: number[] | string | TransformProps;
} & TransformProps & ResponderProps & StrokeProps & FillProps & ClipProps, ref: Object): extractedProps;
export declare function extract(instance: Object, props: Object & {
    style?: [] | {};
}): extractedProps;
export declare function stringifyPropsForFabric(props: {
    [key: string]: NumberProp | undefined | null;
}): {
    [key: string]: string;
};
export declare function withoutXY(instance: Object, props: Object & {
    style?: [] | {};
}): extractedProps;
