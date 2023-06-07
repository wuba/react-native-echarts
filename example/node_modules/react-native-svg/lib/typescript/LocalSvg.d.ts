import { Component } from 'react';
import { ImageSourcePropType } from 'react-native';
import { SvgProps } from './elements/Svg';
export declare function getUriFromSource(source: ImageSourcePropType): string;
export declare function loadLocalRawResourceDefault(source: ImageSourcePropType): Promise<string>;
export declare function isUriAnAndroidResourceIdentifier(uri?: string): boolean;
export declare function loadAndroidRawResource(uri: string): Promise<any>;
export declare function loadLocalRawResourceAndroid(source: ImageSourcePropType): Promise<any>;
export declare const loadLocalRawResource: typeof loadLocalRawResourceAndroid;
export declare type LocalProps = SvgProps & {
    asset: ImageSourcePropType;
    override?: Object;
};
export declare type LocalState = {
    xml: string | null;
};
export declare function LocalSvg(props: LocalProps): JSX.Element;
export declare class WithLocalSvg extends Component<LocalProps, LocalState> {
    state: {
        xml: null;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: {
        asset: ImageSourcePropType;
    }): void;
    load(asset: ImageSourcePropType): Promise<void>;
    render(): JSX.Element;
}
export default LocalSvg;
