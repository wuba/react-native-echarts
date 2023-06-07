import { ReactNode } from 'react';
import Shape from './Shape';
import { NumberProp } from '../lib/extract/types';
export interface SymbolProps {
    children?: ReactNode;
    id?: string;
    viewBox?: string;
    preserveAspectRatio?: string;
    opacity?: NumberProp;
}
export default class Symbol extends Shape<SymbolProps> {
    static displayName: string;
    render(): JSX.Element;
}
