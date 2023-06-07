import { Configuration } from 'webpack';
import { ProxyConfigArray, ProxyConfigMap, Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { Environment } from '../types';
declare type SelectiveEnv = Pick<Environment, 'mode' | 'locations' | 'projectRoot' | 'https' | 'platform'>;
declare type DevServerOptions = {
    allowedHost?: string;
    proxy?: ProxyConfigMap | ProxyConfigArray;
};
/**
 * Add a valid dev server to the provided Webpack config.
 *
 * @param webpackConfig Existing Webpack config to modify.
 * @param env locations, projectRoot, and https options.
 * @param options Configure how the dev server is setup.
 * @category addons
 */
export default function withDevServer(webpackConfig: Configuration, env: SelectiveEnv, options?: DevServerOptions): Configuration;
/**
 * Create a valid Webpack dev server config.
 *
 * @param env locations, projectRoot, and https options.
 * @param options Configure how the dev server is setup.
 * @internal
 */
export declare function createDevServer(env: SelectiveEnv, { allowedHost, proxy }?: DevServerOptions): WebpackDevServerConfiguration;
export {};
