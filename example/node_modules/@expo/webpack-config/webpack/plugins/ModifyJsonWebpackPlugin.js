"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = require("webpack");
function maybeFetchPlugin(compiler, name) {
    var _a, _b;
    return (_b = (_a = compiler.options) === null || _a === void 0 ? void 0 : _a.plugins) === null || _b === void 0 ? void 0 : _b.map(({ constructor }) => constructor).find(constructor => constructor && constructor.name.endsWith(name));
}
class ModifyJsonWebpackPlugin {
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
                const JsonWebpackPlugin = maybeFetchPlugin(compiler, 'PwaManifestWebpackPlugin');
                if (JsonWebpackPlugin) {
                    if (typeof JsonWebpackPlugin.getHooks === 'undefined') {
                        compilation.errors.push(new webpack_1.WebpackError('ModifyJsonWebpackPlugin - This ModifyJsonWebpackPlugin version is not compatible with your current JsonWebpackPlugin version.\n'));
                        return;
                    }
                    JsonWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(this.constructor.name, async (data, callback) => {
                        try {
                            data = await this.modifyAsync(compiler, compilation, data);
                        }
                        catch (error) {
                            compilation.errors.push(error);
                        }
                        callback(null, data);
                    });
                }
            });
        });
    }
}
exports.default = ModifyJsonWebpackPlugin;
//# sourceMappingURL=ModifyJsonWebpackPlugin.js.map