import { IconOptions, ProjectOptions } from 'expo-pwa';
import { Compilation, Compiler } from 'webpack';
import ModifyHtmlWebpackPlugin, { HTMLLinkNode, HTMLPluginData } from './ModifyHtmlWebpackPlugin';
export declare type ApplePwaMeta = {
    name?: string;
    barStyle?: string;
    isWebAppCapable?: boolean;
    isFullScreen?: boolean;
};
export default class ApplePwaWebpackPlugin extends ModifyHtmlWebpackPlugin {
    private pwaOptions;
    private meta;
    private icon;
    private startupImage;
    constructor(pwaOptions: ProjectOptions & {
        links: HTMLLinkNode[];
        meta: HTMLLinkNode[];
    }, meta: ApplePwaMeta, icon: IconOptions | null, startupImage: IconOptions | null);
    modifyAsync(compiler: Compiler, compilation: Compilation, data: HTMLPluginData): Promise<HTMLPluginData>;
}
