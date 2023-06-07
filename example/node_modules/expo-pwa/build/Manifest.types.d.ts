/// <reference types="node" />
import { ExpoConfig } from '@expo/config';
import { ImageOptions } from '@expo/image-utils';
declare type ExpoWebConfig = Required<ExpoConfig>['web'];
export declare type WebPlatformConfigWithDefaults = Omit<ExpoWebConfig, 'build' | 'lang' | 'meta'> & Required<Pick<ExpoWebConfig, 'build' | 'lang' | 'meta'>>;
export declare type PWAConfig = ExpoConfig & {
    web: WebPlatformConfigWithDefaults;
};
export declare type Direction = 'ltr' | 'rtl' | 'auto';
export declare type Display = 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';
export declare type Orientation = 'any' | 'natural' | 'landscape' | 'landscape-primary' | 'landscape-secondary' | 'portrait' | 'portrait-primary' | 'portrait-secondary' | 'omit';
export declare type CrossOrigin = 'use-credentials' | 'anonymous';
export interface RelatedApplications {
    platform?: string;
    url: string;
    id?: string;
}
export declare type Manifest = Partial<{
    background_color: string;
    description: string;
    dir: Direction;
    display: Display;
    lang: string;
    name: string;
    orientation: Orientation;
    prefer_related_applications: boolean;
    related_applications: RelatedApplications[];
    scope: string;
    short_name: string;
    start_url: string;
    theme_color: string;
    crossorigin: CrossOrigin;
}>;
export declare type WebpackAsset = {
    source: Buffer;
    path: string;
};
export declare type HtmlTag = {
    tagName: 'link';
    attributes: {
        rel?: string;
        href?: string;
        media?: string;
        sizes?: string;
        type?: string;
    };
};
export declare type SplashIcon = ImageOptions & {
    media: string;
};
export declare type ProjectOptions = {
    projectRoot: string;
    publicPath: string;
    destination?: string;
};
export declare type HTMLOutput = {
    asset: WebpackAsset;
    tag?: HtmlTag;
    manifest?: ManifestIcon;
};
export declare type IconOptions = Omit<ImageOptions, 'name' | 'width' | 'height'>;
export declare type ManifestIcon = {
    src: string;
    sizes: string;
    type: 'image/png';
    purpose?: string;
};
export {};
