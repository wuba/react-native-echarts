"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const env_1 = require("../env");
const utils_1 = require("../utils");
const DEFAULT_MINIFY = {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
};
/**
 * Generates an `index.html` file with the <script> injected.
 *
 * @category plugins
 */
class HtmlWebpackPlugin extends html_webpack_plugin_1.default {
    constructor(env, templateHtmlData) {
        var _a, _b, _c, _d, _e, _f, _g;
        const locations = env.locations || (0, env_1.getPaths)(env.projectRoot, env);
        const config = (0, env_1.getConfig)(env);
        const isProduction = (0, env_1.getMode)(env) === 'production';
        /**
         * The user can disable minify with
         * `web.minifyHTML = false || {}`
         */
        const minify = (0, utils_1.overrideWithPropertyOrConfig)(isProduction ? (_b = (_a = config.web) === null || _a === void 0 ? void 0 : _a.build) === null || _b === void 0 ? void 0 : _b.minifyHTML : false, DEFAULT_MINIFY);
        const meta = {};
        if (templateHtmlData && templateHtmlData.querySelectorAll) {
            // @ts-ignore
            const templateMeta = templateHtmlData.querySelectorAll('meta');
            // Ensure there is no viewport meta tag in the default `web/index.html`.
            // Because the viewport tag has been moved into the template, this will
            // ensure that legacy `web/index.html`s get a viewport meta tag added to them.
            if (!templateMeta.some((node) => node.getAttribute('name') === 'viewport')) {
                console.warn(chalk_1.default.bgYellow.black('Warning: No viewport meta tag is defined in the <head /> of `web/index.html`. Please update your `web/index.html` to include one. The default value is:\n\n') +
                    chalk_1.default.magenta('<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1.00001,viewport-fit=cover">'));
                meta.viewport =
                    'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1.00001, viewport-fit=cover';
            }
            // Meta tag to define a suggested color that browsers should use to customize the display of the page or of the surrounding user interface.
            // The meta tag overrides any theme-color set in the web app manifest.
            if (((_c = config.web) === null || _c === void 0 ? void 0 : _c.themeColor) &&
                !templateMeta.some((node) => node.getAttribute('name') === 'theme-color')) {
                meta['theme-color'] = (_d = config.web) === null || _d === void 0 ? void 0 : _d.themeColor;
            }
            if (((_e = config.web) === null || _e === void 0 ? void 0 : _e.description) &&
                !templateMeta.some((node) => node.getAttribute('name') === 'description')) {
                meta['description'] = (_f = config.web) === null || _f === void 0 ? void 0 : _f.description;
            }
        }
        super({
            // The file to write the HTML to.
            filename: locations.production.indexHtml,
            // The title to use for the generated HTML document.
            title: (_g = config.web) === null || _g === void 0 ? void 0 : _g.name,
            // Pass a html-minifier options object to minify the output.
            // https://github.com/kangax/html-minifier#options-quick-reference
            minify,
            // The `webpack` require path to the template.
            template: locations.template.indexHtml,
            meta,
        });
    }
}
exports.default = HtmlWebpackPlugin;
//# sourceMappingURL=ExpoHtmlWebpackPlugin.js.map