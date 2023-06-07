import { ReactNode } from 'react';
import { CommonPathProps, FontProps, NumberProp, TransformProps } from '../lib/extract/types';
import Shape from './Shape';
export interface GProps extends CommonPathProps, FontProps {
    children?: ReactNode;
    opacity?: NumberProp;
}
export default class G<P> extends Shape<GProps & P> {
    static displayName: string;
    setNativeProps: (props: Object & {
        matrix?: number[];
    } & TransformProps) => void;
    render(): JSX.Element;
}
