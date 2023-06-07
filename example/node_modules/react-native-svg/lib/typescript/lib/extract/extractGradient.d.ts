import React, { ReactElement } from 'react';
import { TransformProps } from './types';
export default function extractGradient(props: {
    id?: string;
    children?: ReactElement[];
    transform?: number[] | string | TransformProps;
    gradientTransform?: number[] | string | TransformProps;
    gradientUnits?: 'objectBoundingBox' | 'userSpaceOnUse';
} & TransformProps, parent: {}): {
    name: string;
    gradient: number[];
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>>[];
    gradientUnits: number;
    gradientTransform: number[] | null;
} | null;
