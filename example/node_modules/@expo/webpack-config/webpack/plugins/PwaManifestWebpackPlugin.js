"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expo_pwa_1 = require("expo-pwa");
const webpack_1 = require("webpack");
const JsonWebpackPlugin_1 = __importDefault(require("./JsonWebpackPlugin"));
function maybeFetchPlugin(compiler, name) {
    var _a, _b;
    return (_b = (_a = compiler.options) === null || _a === void 0 ? void 0 : _a.plugins) === null || _b === void 0 ? void 0 : _b.map(({ constructor }) => constructor).find(constructor => constructor && constructor.name === name);
}
class PwaManifestWebpackPlugin extends JsonWebpackPlugin_1.default {
    constructor(pwaOptions, manifest) {
        super({
            path: pwaOptions.path,
            json: manifest,
            pretty: true,
        });
        this.pwaOptions = pwaOptions;
        this.rel = 'manifest';
    }
    apply(compiler) {
        super.apply(compiler);
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
                        compilation.errors.push(new webpack_1.WebpackError('PwaManifestWebpackPlugin - This PwaManifestWebpackPlugin version is not compatible with your current HtmlWebpackPlugin version.\n'));
                        return;
                    }
                    HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(this.constructor.name, (data, htmlCallback) => {
                        // Skip if a custom injectFunction returns false or if
                        // the htmlWebpackPlugin options includes a `favicons: false` flag
                        let isInjectionAllowed;
                        if (typeof this.pwaOptions.inject === 'boolean') {
                            isInjectionAllowed = this.pwaOptions.inject;
                        }
                        else if (typeof this.pwaOptions.inject === 'function') {
                            isInjectionAllowed = this.pwaOptions.inject(data.plugin);
                        }
                        else {
                            isInjectionAllowed = data.plugin.options.pwaManifest !== false;
                        }
                        if (isInjectionAllowed === false) {
                            return htmlCallback(null, data);
                        }
                        data.assetTags.meta.push({
                            tagName: 'link',
                            voidTag: true,
                            attributes: {
                                rel: this.rel,
                                href: (0, expo_pwa_1.joinUrlPath)(this.pwaOptions.publicPath, this.pwaOptions.path),
                            },
                        });
                        htmlCallback(null, data);
                    });
                }
            });
        });
    }
}
exports.default = PwaManifestWebpackPlugin;
//# sourceMappingURL=PwaManifestWebpackPlugin.js.map