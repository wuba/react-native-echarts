/// <reference types="expo__bunyan" />
import Log from '@expo/bunyan';
import webpack from 'webpack';
export default class WebpackBar extends webpack.ProgressPlugin {
    props: {
        logger: Log;
        nonInteractive?: boolean;
        bundleDetails: {
            bundleType: 'bundle' | 'delta' | 'meta' | 'map' | 'ram' | 'cli' | 'hmr' | 'todo' | 'graph';
            minify?: boolean;
            dev?: boolean;
            entryFile?: string | null;
            platform?: string;
        };
    };
    sendEvent: (name: string, props: any) => void;
    constructor(props: {
        logger: Log;
        nonInteractive?: boolean;
        bundleDetails: {
            bundleType: 'bundle' | 'delta' | 'meta' | 'map' | 'ram' | 'cli' | 'hmr' | 'todo' | 'graph';
            minify?: boolean;
            dev?: boolean;
            entryFile?: string | null;
            platform?: string;
        };
    });
    _nextBundleBuildID: number;
    getNewBuildID(): string;
    buildID: string;
    apply(compiler: webpack.Compiler): void;
}
