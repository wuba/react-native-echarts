import { Compiler } from 'webpack';
import JsonWebpackPlugin from './JsonWebpackPlugin';
export declare type Icon = {
    src: string;
    sizes: string;
    type: 'image/png';
};
export declare type PwaManifestOptions = {
    path: string;
    inject?: boolean | Function;
    publicPath: string;
};
export default class PwaManifestWebpackPlugin extends JsonWebpackPlugin {
    private pwaOptions;
    rel: string;
    constructor(pwaOptions: PwaManifestOptions, manifest: any);
    apply(compiler: Compiler): void;
}
