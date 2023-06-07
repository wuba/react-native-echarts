import { IconOptions, ProjectOptions } from 'expo-pwa';
import { Compilation, Compiler } from 'webpack';
import ModifyHtmlWebpackPlugin, { HTMLLinkNode, HTMLPluginData } from './ModifyHtmlWebpackPlugin';
export default class FaviconWebpackPlugin extends ModifyHtmlWebpackPlugin {
    private pwaOptions;
    private favicon;
    constructor(pwaOptions: ProjectOptions & {
        links: HTMLLinkNode[];
    }, favicon: IconOptions | null);
    modifyAsync(compiler: Compiler, compilation: Compilation, data: HTMLPluginData): Promise<HTMLPluginData>;
}
