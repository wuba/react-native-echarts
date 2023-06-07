"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tapable_1 = require("tapable");
const webpack_1 = require("webpack");
const hooksMap = new WeakMap();
function createWebpackPluginHooks() {
    return {
        beforeEmit: new tapable_1.AsyncSeriesWaterfallHook(['pluginArgs']),
        afterEmit: new tapable_1.AsyncSeriesWaterfallHook(['pluginArgs']),
    };
}
class JsonWebpackPlugin {
    constructor(options) {
        this.options = options;
        this.writeObject = async (compilation) => {
            let result = {
                json: this.options.json,
                path: this.options.path,
                plugin: this,
            };
            try {
                result = await JsonWebpackPlugin.getHooks(compilation).beforeEmit.promise(result);
            }
            catch (error) {
                compilation.errors.push(error);
            }
            const json = JSON.stringify(result.json, undefined, this.options.pretty ? 2 : undefined);
            // Once all files are added to the webpack compilation
            // let the webpack compiler continue
            compilation.emitAsset(result.path, new webpack_1.sources.RawSource(json));
            await JsonWebpackPlugin.getHooks(compilation).afterEmit.promise({
                json,
                outputName: result.path,
                plugin: this,
            });
        };
        if (!this.options.path || !this.options.json) {
            throw new Error('Failed to write json because either `path` or `json` were not defined.');
        }
    }
    static getHooks(compilation) {
        let hooks = hooksMap.get(compilation);
        // Setup the hooks only once
        if (hooks === undefined) {
            hooks = createWebpackPluginHooks();
            hooksMap.set(compilation, hooks);
        }
        return hooks;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(this.constructor.name, (compilation) => {
            compilation.hooks.processAssets.tapPromise({
                name: this.constructor.name,
                // https://github.com/webpack/webpack/blob/master/lib/Compilation.js#L3280
                stage: webpack_1.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
            }, async () => {
                await this.writeObject(compilation);
            });
        });
    }
}
exports.default = JsonWebpackPlugin;
//# sourceMappingURL=JsonWebpackPlugin.js.map