import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { NativeViewGestureHandlerProps } from '../handlers/NativeViewGestureHandler';
export interface RawButtonProps extends NativeViewGestureHandlerProps {
    /**
     * Defines if more than one button could be pressed simultaneously. By default
     * set true.
     */
    exclusive?: boolean;
    /**
     * Android only.
     *
     * Defines color of native ripple animation used since API level 21.
     */
    rippleColor?: any;
    /**
     * Android only.
     *
     * Defines radius of native ripple animation used since API level 21.
     */
    rippleRadius?: number | null;
    /**
     * Android only.
     *
     * Set this to true if you want the ripple animation to render outside the view bounds.
     */
    borderless?: boolean;
    /**
     * Android only.
     *
     * Defines whether the ripple animation should be drawn on the foreground of the view.
     */
    foreground?: boolean;
    /**
     * Android only.
     *
     * Set this to true if you don't want the system to play sound when the button is pressed.
     */
    touchSoundDisabled?: boolean;
}
export interface BaseButtonProps extends RawButtonProps {
    /**
     * Called when the button gets pressed (analogous to `onPress` in
     * `TouchableHighlight` from RN core).
     */
    onPress?: (pointerInside: boolean) => void;
    /**
     * Called when the button gets pressed and is held for `delayLongPress`
     * milliseconds.
     */
    onLongPress?: () => void;
    /**
     * Called when button changes from inactive to active and vice versa. It
     * passes active state as a boolean variable as a first parameter for that
     * method.
     */
    onActiveStateChange?: (active: boolean) => void;
    style?: StyleProp<ViewStyle>;
    testID?: string;
    /**
     * Delay, in milliseconds, after which the `onLongPress` callback gets called.
     * Defaults to 600.
     */
    delayLongPress?: number;
}
export interface RectButtonProps extends BaseButtonProps {
    /**
     * Background color that will be dimmed when button is in active state.
     */
    underlayColor?: string;
    /**
     * iOS only.
     *
     * Opacity applied to the underlay when button is in active state.
     */
    activeOpacity?: number;
}
export interface BorderlessButtonProps extends BaseButtonProps {
    /**
     * iOS only.
     *
     * Opacity applied to the button when it is in an active state.
     */
    activeOpacity?: number;
}
export declare const RawButton: React.ForwardRefExoticComponent<RawButtonProps & NativeViewGestureHandlerProps & React.RefAttributes<React.ComponentType<any>>>;
export declare class BaseButton extends React.Component<BaseButtonProps> {
    static defaultProps: {
        delayLongPress: number;
    };
    private lastActive;
    private longPressTimeout;
    private longPressDetected;
    constructor(props: BaseButtonProps);
    private handleEvent;
    private onLongPress;
    private onHandlerStateChange;
    private onGestureEvent;
    render(): JSX.Element;
}
export declare class RectButton extends React.Component<RectButtonProps> {
    static defaultProps: {
        activeOpacity: number;
        underlayColor: string;
    };
    private opacity;
    constructor(props: RectButtonProps);
    private onActiveStateChange;
    render(): JSX.Element;
}
export declare class BorderlessButton extends React.Component<BorderlessButtonProps> {
    static defaultProps: {
        activeOpacity: number;
        borderless: boolean;
    };
    private opacity;
    constructor(props: BorderlessButtonProps);
    private onActiveStateChange;
    render(): JSX.Element;
}
export { default as PureNativeButton } from './GestureHandlerButton';
