import webpack from 'webpack';
import { WebpackFileError } from './WebpackFileError';
export declare function getModuleBuildError(compilation: webpack.Compilation, input: any): Promise<WebpackFileError | false>;
