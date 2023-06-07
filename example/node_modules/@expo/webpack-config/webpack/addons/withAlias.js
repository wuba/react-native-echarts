"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Apply aliases to a Webpack config
 *
 * @param webpackConfig Existing Webpack config to modify.
 * @param alias Extra aliases to inject
 * @category addons
 */
function withAlias(webpackConfig, alias = {}) {
    // Mix in aliases
    if (!webpackConfig.resolve)
        webpackConfig.resolve = {};
    webpackConfig.resolve.alias = {
        ...(webpackConfig.resolve.alias || {}),
        ...alias,
    };
    return webpackConfig;
}
exports.default = withAlias;
//# sourceMappingURL=withAlias.js.map