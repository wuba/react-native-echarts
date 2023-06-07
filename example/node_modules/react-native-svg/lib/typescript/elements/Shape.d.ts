import { Component } from 'react';
import { NativeMethods } from 'react-native';
import { TransformProps } from '../lib/extract/types';
export interface SVGBoundingBoxOptions {
    fill?: boolean;
    stroke?: boolean;
    markers?: boolean;
    clipped?: boolean;
}
export interface DOMPointInit {
    x?: number;
    y?: number;
    z?: number;
    w?: number;
}
export interface Point {
    x: number;
    y: number;
}
export interface SVGPoint extends Point {
    constructor(point?: Point): SVGPoint;
    matrixTransform(matrix: Matrix): SVGPoint;
}
export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface SVGRect extends Rect {
}
export interface Matrix {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
}
export interface SVGMatrix extends Matrix {
    constructor(matrix?: Matrix): SVGMatrix;
    multiply(secondMatrix: Matrix): SVGMatrix;
    inverse(): SVGMatrix;
    translate(x: number, y: number): SVGMatrix;
    scale(scaleFactor: number): SVGMatrix;
    scaleNonUniform(scaleFactorX: number, scaleFactorY: number): SVGMatrix;
    rotate(angle: number): SVGMatrix;
    rotateFromVector(x: number, y: number): SVGMatrix;
    flipX(): SVGMatrix;
    flipY(): SVGMatrix;
    skewX(angle: number): SVGMatrix;
    skewY(angle: number): SVGMatrix;
}
export declare function multiply_matrices(l: Matrix, r: Matrix): Matrix;
export declare function invert({ a, b, c, d, e, f }: Matrix): Matrix;
export declare class SVGMatrix implements SVGMatrix {
    constructor(matrix?: Matrix);
}
export declare function matrixTransform(matrix: Matrix, point: Point): Point;
export declare class SVGPoint implements SVGPoint {
    constructor(point?: Point);
}
export declare const ownerSVGElement: {
    createSVGPoint(): SVGPoint;
    createSVGMatrix(): SVGMatrix;
};
export default class Shape<P> extends Component<P> {
    [x: string]: unknown;
    root: (Shape<P> & NativeMethods) | null;
    constructor(props: Readonly<P> | P);
    refMethod: (instance: (Shape<P> & NativeMethods) | null) => void;
    setNativeProps: (props: Object & {
        matrix?: [number, number, number, number, number, number];
    } & TransformProps) => void;
    getBBox: (options?: SVGBoundingBoxOptions) => SVGRect;
    getCTM: () => SVGMatrix;
    getScreenCTM: () => SVGMatrix;
    isPointInFill: (options: DOMPointInit) => boolean;
    isPointInStroke: (options: DOMPointInit) => boolean;
    getTotalLength: () => number;
    getPointAtLength: (length: number) => SVGPoint;
}
