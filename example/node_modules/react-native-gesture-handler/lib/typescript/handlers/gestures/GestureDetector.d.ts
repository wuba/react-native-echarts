import React from 'react';
import { GestureType, HandlerCallbacks } from './gesture';
import { SharedValue } from './reanimatedWrapper';
import { UserSelect } from '../gestureHandlerCommon';
import { ComposedGesture } from './gestureComposition';
export declare type GestureConfigReference = {
    config: GestureType[];
    animatedEventHandler: unknown;
    animatedHandlers: SharedValue<HandlerCallbacks<Record<string, unknown>>[] | null> | null;
    firstExecution: boolean;
    useReanimatedHook: boolean;
};
interface GestureDetectorProps {
    gesture: ComposedGesture | GestureType;
    userSelect?: UserSelect;
    children?: React.ReactNode;
}
export declare const GestureDetector: (props: GestureDetectorProps) => JSX.Element;
export {};
