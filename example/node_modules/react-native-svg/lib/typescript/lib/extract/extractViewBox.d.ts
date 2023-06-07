import { NumberProp } from './types';
export declare const meetOrSliceTypes: {
    [meetOrSlice: string]: number;
};
export declare const alignEnum: {
    [align: string]: string;
};
export default function extractViewBox(props: {
    viewBox?: string | NumberProp[];
    preserveAspectRatio?: string;
}): {
    minX: number;
    minY: number;
    vbWidth: number;
    vbHeight: number;
    align: string;
    meetOrSlice: number;
} | null;
