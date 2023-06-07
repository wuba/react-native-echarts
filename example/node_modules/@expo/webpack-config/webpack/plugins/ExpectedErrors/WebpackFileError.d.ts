export declare class WebpackFileError extends Error {
    file: string;
    constructor(file: {
        filePath: string | null;
        line?: number | null;
        col?: number | null;
    }, message: string);
}
