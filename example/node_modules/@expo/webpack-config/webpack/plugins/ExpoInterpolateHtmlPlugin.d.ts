/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @borrows https://github.com/facebook/create-react-app/blob/f0a837c1f07ebd963ddbba2c2937d04fc1b79d40/packages/react-dev-utils/InterpolateHtmlPlugin.js
 */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Compiler } from 'webpack';
import { Environment } from '../types';
export default class InterpolateHtmlPlugin {
    htmlWebpackPlugin: HtmlWebpackPlugin;
    replacements: Record<string, string>;
    static fromEnv: (env: Pick<Environment, 'mode' | 'config' | 'locations' | 'projectRoot'>, htmlWebpackPlugin: typeof HtmlWebpackPlugin) => InterpolateHtmlPlugin;
    constructor(htmlWebpackPlugin: HtmlWebpackPlugin, replacements: Record<string, string>);
    apply(compiler: Compiler): void;
}
