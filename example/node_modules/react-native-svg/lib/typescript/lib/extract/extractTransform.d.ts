import { TransformedProps, TransformProps } from './types';
export declare function props2transform(props: TransformProps): TransformedProps | null;
export declare function transformToMatrix(props: TransformedProps | null, transform: number[] | string | TransformProps | void | null | undefined): [number, number, number, number, number, number] | null;
export default function extractTransform(props: number[] | string | TransformProps): number[] | null;
