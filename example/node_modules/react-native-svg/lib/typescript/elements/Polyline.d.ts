/// <reference types="react" />
import Shape from './Shape';
import { CommonPathProps, NumberProp } from '../lib/extract/types';
export interface PolylineProps extends CommonPathProps {
    opacity?: NumberProp;
    points?: string | ReadonlyArray<NumberProp>;
}
export default class Polyline extends Shape<PolylineProps> {
    static displayName: string;
    static defaultProps: {
        points: string;
    };
    setNativeProps: (props: Object & {
        points?: string | NumberProp[];
        d?: string;
    }) => void;
    render(): JSX.Element;
}
