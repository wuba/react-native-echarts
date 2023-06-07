import type { Config } from '@react-native-community/cli-types';
export type { Config };
export declare type ConfigLoadingContext = Pick<Config, 'root' | 'reactNativePath' | 'platforms'>;
export interface MetroConfig {
    resolver: {
        resolveRequest?: (context: any, realModuleName: string, platform: string, moduleName: string) => any;
        resolverMainFields: string[];
        platforms: string[];
    };
    serializer: {
        getModulesRunBeforeMainModule: () => string[];
        getPolyfills: () => any;
    };
    server: {
        port: number;
        enhanceMiddleware?: Function;
    };
    symbolicator: {
        customizeFrame: (frame: {
            file: string | null;
        }) => {
            collapse: boolean;
        };
    };
    transformer: {
        allowOptionalDependencies?: boolean;
        babelTransformerPath: string;
        assetRegistryPath: string;
        assetPlugins?: Array<string>;
        asyncRequireModulePath?: string;
    };
    watchFolders: ReadonlyArray<string>;
    reporter?: any;
}
/**
 * Default configuration
 */
export declare const getDefaultConfig: (ctx: Pick<Config, "root" | "reactNativePath" | "platforms">) => MetroConfig;
export interface ConfigOptionsT {
    maxWorkers?: number;
    port?: number;
    projectRoot?: string;
    resetCache?: boolean;
    watchFolders?: string[];
    sourceExts?: string[];
    reporter?: any;
    config?: string;
}
/**
 * Loads Metro Config and applies `options` on top of the resolved config.
 *
 * This allows the CLI to always overwrite the file settings.
 */
export default function loadMetroConfig(ctx: ConfigLoadingContext, options?: ConfigOptionsT): Promise<MetroConfig>;
//# sourceMappingURL=loadMetroConfig.d.ts.map