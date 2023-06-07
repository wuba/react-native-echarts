import React, { ComponentClass } from "react";
import { TextProps, TouchableHighlightProps, ViewProps, OpaqueColorValue, TextStyle, ViewStyle } from "react-native";
export { DEFAULT_ICON_COLOR, DEFAULT_ICON_SIZE, } from "./vendor/react-native-vector-icons/lib/create-icon-set";
export interface IconProps<GLYPHS extends string> extends TextProps {
    /**
     * Size of the icon, can also be passed as fontSize in the style object.
     *
     * @default 12
     */
    size?: number;
    /**
     * Name of the icon to show
     *
     * See Icon Explorer app
     * {@link https://expo.github.io/vector-icons/}
     */
    name: GLYPHS;
    /**
     * Color of the icon. Can be a string or OpaqueColorValue (returned from
     * PlatformColor(..))
     *
     */
    color?: string | OpaqueColorValue;
}
export interface IconButtonProps<GLYPHS extends string> extends IconProps<GLYPHS>, ViewProps, TouchableHighlightProps {
    /**
     * Text and icon color
     * Use iconStyle or nest a Text component if you need different colors.
     * Can be a string or OpaqueColorValue (returned from PlatformColor(..))
     *
     *  @default 'white'
     */
    color?: string | OpaqueColorValue;
    /**
     * Border radius of the button
     * Set to 0 to disable.
     *
     * @default 5
     */
    borderRadius?: number;
    /**
     * Styles applied to the icon only
     * Good for setting margins or a different color.
     *
     * @default {marginRight: 10}
     */
    iconStyle?: TextStyle;
    /**
     * Style prop inherited from TextProps and TouchableWithoutFeedbackProperties
     * Only exist here so we can have ViewStyle or TextStyle
     *
     */
    style?: ViewStyle | TextStyle;
    /**
     * Background color of the button. Can be a string or OpaqueColorValue (returned from
     * PlatformColor(..))
     *
     * @default '#007AFF'
     */
    backgroundColor?: string | OpaqueColorValue;
}
export declare type GlyphMap<G extends string> = {
    [K in G]: number | string;
};
export interface Icon<G extends string, FN extends string> {
    defaultProps: any;
    Button: ComponentClass<IconButtonProps<G>>;
    glyphMap: GlyphMap<G>;
    getRawGlyphMap: () => GlyphMap<G>;
    getFontFamily: () => FN;
    loadFont: () => Promise<void>;
    font: {
        [x: string]: any;
    };
    new (props: IconProps<G>): React.Component<IconProps<G>>;
}
export default function <G extends string, FN extends string>(glyphMap: GlyphMap<G>, fontName: FN, expoAssetId: any, fontStyle?: any): Icon<G, FN>;
