import { Compilation, Compiler } from 'webpack';
export declare type HTMLPluginData = {
    assetTags: any;
    outputName: string;
    plugin: any;
};
export declare type HTMLLinkNode = {
    rel?: string;
    name?: string;
    content?: string;
    media?: string;
    href?: string;
    sizes?: string;
    node: any;
};
export default class ModifyHtmlWebpackPlugin {
    private modifyOptions;
    constructor(modifyOptions?: {
        inject?: boolean | Function;
    });
    modifyAsync(compiler: Compiler, compilation: Compilation, data: HTMLPluginData): Promise<HTMLPluginData>;
    apply(compiler: Compiler): void;
}
