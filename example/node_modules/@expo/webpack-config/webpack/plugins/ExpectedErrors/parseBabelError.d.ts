import { WebpackFileError } from './WebpackFileError';
export declare function getBabelError(fileName: string, err: Error & {
    code?: 'BABEL_PARSE_ERROR';
    loc?: {
        line: number;
        column: number;
    };
}): WebpackFileError | false;
