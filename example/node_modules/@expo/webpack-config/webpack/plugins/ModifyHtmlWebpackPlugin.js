"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = require("webpack");
function maybeFetchPlugin(compiler, name) {
    var _a, _b;
    return (_b = (_a = compiler.options) === null || _a === void 0 ? void 0 : _a.plugins) === null || _b === void 0 ? void 0 : _b.map(({ constructor }) => constructor).find(constructor => constructor && constructor.name === name);
}
class ModifyHtmlWebpackPlugin {
    constructor(modifyOptions = {}) {
        this.modifyOptions = modifyOptions;
    }
    async modifyAsync(compiler, compilation, data) {
        return data;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(this.constructor.name, (compilation) => {
            compilation.hooks.processAssets.tapPromise({
                name: this.constructor.name,
                // https://github.com/webpack/webpack/blob/master/lib/Compilation.js#L3280
                stage: webpack_1.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
            }, async () => {
                // Hook into the html-webpack-plugin processing and add the html
                const HtmlWebpackPlugin = maybeFetchPlugin(compiler, 'HtmlWebpackPlugin');
                if (HtmlWebpackPlugin) {
                    if (typeof HtmlWebpackPlugin.getHooks === 'undefined') {
                        compilation.errors.push(new webpack_1.WebpackError('ModifyHtmlWebpackPlugin - This ModifyHtmlWebpackPlugin version is not compatible with your current HtmlWebpackPlugin version.\n'));
                        return;
                    }
                    HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(this.constructor.name, async (data, htmlCallback) => {
                        // Skip if a custom injectFunction returns false or if
                        // the htmlWebpackPlugin optuons includes a `favicons: false` flag
                        const isInjectionAllowed = typeof this.modifyOptions.inject === 'function'
                            ? this.modifyOptions.inject(data.plugin)
                            : data.plugin.options.pwaManifest !== false;
                        if (isInjectionAllowed === false) {
                            return htmlCallback(null, data);
                        }
                        try {
                            data = await this.modifyAsync(compiler, compilation, data);
                        }
                        catch (error) {
                            compilation.errors.push(error);
                        }
                        htmlCallback(null, data);
                    });
                }
            });
        });
    }
}
exports.default = ModifyHtmlWebpackPlugin;
//# sourceMappingURL=ModifyHtmlWebpackPlugin.js.map