import { Environment, FilePaths, InputEnvironment } from '../types';
/**
 * Sync method for getting default paths used throughout the Webpack config.
 * This is useful for Next.js which doesn't support async Webpack configs.
 *
 * @param projectRoot
 * @category env
 */
export declare function getPaths(projectRoot: string, env?: Pick<InputEnvironment, 'platform'>): FilePaths;
/**
 * Async method for getting default paths used throughout the Webpack config.
 *
 * @param projectRoot
 * @category env
 */
export declare function getPathsAsync(projectRoot: string, env?: Pick<InputEnvironment, 'platform'>): Promise<FilePaths>;
/**
 * Get paths dictating where the app is served regardless of the current Webpack mode.
 *
 * @param projectRoot
 * @category env
 */
export declare function getServedPath(projectRoot: string): string;
/**
 * Get paths dictating where the app is served. In development mode this returns default values.
 *
 * @param env
 * @category env
 */
export declare function getPublicPaths(env: Pick<Environment, 'mode' | 'projectRoot'>): {
    /**
     * Webpack uses `publicPath` to determine where the app is being served from.
     * It requires a trailing slash, or the file assets will get an incorrect path.
     * In development, we always serve from the root. This makes config easier.
     */
    publicPath: string;
    /**
     * `publicUrl` is just like `publicPath`, but we will provide it to our app
     * as %WEB_PUBLIC_URL% in `index.html` and `process.env.WEB_PUBLIC_URL` in JavaScript.
     * Omit trailing slash as %WEB_PUBLIC_URL%/xyz looks better than %WEB_PUBLIC_URL%xyz.
     */
    publicUrl: string;
};
/**
 * Get the output folder path. Defaults to `web-build`.
 *
 * @param projectRoot
 * @category env
 */
export declare function getProductionPath(projectRoot: string): string;
/**
 * Get an absolute path relative to the project root while accounting for remote paths (`https://`).
 *
 * @param projectRoot
 * @category env
 */
export declare function getAbsolute(projectRoot: string, ...pathComponents: string[]): string;
