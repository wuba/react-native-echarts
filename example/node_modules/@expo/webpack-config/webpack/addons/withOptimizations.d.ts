import { Configuration } from 'webpack';
/**
 * Returns `true` if the Expo web environment variable enabled.
 * @internal
 */
export declare function isDebugMode(): boolean;
/**
 * Add the minifier and other optimizations for production builds.
 *
 * @param webpackConfig Existing Webpack config to modify.
 * @category addons
 */
export default function withOptimizations(webpackConfig: Configuration): Configuration;
