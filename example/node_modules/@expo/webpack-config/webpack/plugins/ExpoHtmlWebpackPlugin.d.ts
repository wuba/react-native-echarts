import OriginalHtmlWebpackPlugin from 'html-webpack-plugin';
import { Environment } from '../types';
/**
 * Generates an `index.html` file with the <script> injected.
 *
 * @category plugins
 */
export default class HtmlWebpackPlugin extends OriginalHtmlWebpackPlugin {
    constructor(env: Environment, templateHtmlData?: any);
}
