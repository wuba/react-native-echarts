import { Compilation, Compiler } from 'webpack';
import { BeforeEmitOptions } from './JsonWebpackPlugin';
export declare type Options = {
    path: string;
    json: any;
    pretty?: boolean;
};
export default class ModifyJsonWebpackPlugin {
    modifyAsync(compiler: Compiler, compilation: Compilation, data: BeforeEmitOptions): Promise<BeforeEmitOptions>;
    apply(compiler: Compiler): void;
}
