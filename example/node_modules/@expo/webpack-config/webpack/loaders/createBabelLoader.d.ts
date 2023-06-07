import { RuleSetRule } from 'webpack';
import { Environment, Mode } from '../types';
/**
 * Creates a Rule for loading Application code and packages from the Expo ecosystem.
 * This method attempts to recreate how Metro loads ES modules in the `node_modules` folder.
 *
 * @param env
 * @internal
 */
export declare function createBabelLoaderFromEnvironment(env: Pick<Environment, 'babel' | 'locations' | 'projectRoot' | 'config' | 'mode' | 'platform'>): RuleSetRule;
/**
 * A complex babel loader which uses the project's `babel.config.js`
 * to resolve all of the Unimodules which are shipped as ES modules (early 2019).
 * @category loaders
 */
export default function createBabelLoader({ 
/**
 * The webpack mode: `"production" | "development"`
 */
mode, projectRoot: inputProjectRoot, babelProjectRoot, include, verbose, platform, useCustom, ...options }?: {
    projectRoot?: string;
    useCustom?: boolean;
    mode?: Mode;
    babelProjectRoot?: string;
    include?: string[];
    verbose?: boolean;
    [key: string]: any;
}): RuleSetRule;
