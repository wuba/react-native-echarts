import { ReactNode } from 'react';
import Shape from './Shape';
export interface ClipPathProps {
    children?: ReactNode;
    id?: string;
}
export default class ClipPath extends Shape<ClipPathProps> {
    static displayName: string;
    render(): JSX.Element;
}
