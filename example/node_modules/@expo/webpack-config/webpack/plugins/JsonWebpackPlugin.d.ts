import { AsyncSeriesWaterfallHook } from 'tapable';
import { Compilation, Compiler } from 'webpack';
export declare type Options = {
    path: string;
    json: any;
    pretty?: boolean;
};
export declare type BeforeEmitOptions = Options & {
    plugin: JsonWebpackPlugin;
};
export declare type AfterEmitOptions = Pick<Options, 'json'> & {
    outputName: string;
    plugin: JsonWebpackPlugin;
};
export default class JsonWebpackPlugin {
    options: Options;
    static getHooks(compilation: Compilation): {
        beforeEmit: AsyncSeriesWaterfallHook<BeforeEmitOptions, import("tapable").UnsetAdditionalOptions>;
        afterEmit: AsyncSeriesWaterfallHook<AfterEmitOptions, import("tapable").UnsetAdditionalOptions>;
    };
    constructor(options: Options);
    apply(compiler: Compiler): void;
    private writeObject;
}
