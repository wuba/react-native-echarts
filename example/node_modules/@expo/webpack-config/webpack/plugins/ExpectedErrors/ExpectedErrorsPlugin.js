"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getModuleBuildError_1 = require("./getModuleBuildError");
class ExpectedErrorsPlugin {
    parseErrorsAsync(compilation, errors) {
        return Promise.all(errors.map(async (error) => {
            try {
                const parsed = await (0, getModuleBuildError_1.getModuleBuildError)(compilation, error);
                return parsed === false ? error : parsed;
            }
            catch (e) {
                console.log(e);
                return error;
            }
        }));
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(this.constructor.name, compilation => {
            compilation.hooks.afterSeal.tapPromise(this.constructor.name, async () => {
                var _a, _b;
                // Warnings
                if ((_a = compilation.warnings) === null || _a === void 0 ? void 0 : _a.length) {
                    compilation.warnings = await this.parseErrorsAsync(compilation, compilation.warnings);
                }
                // Errors
                if ((_b = compilation.errors) === null || _b === void 0 ? void 0 : _b.length) {
                    compilation.errors = await this.parseErrorsAsync(compilation, compilation.errors);
                }
            });
        });
    }
}
exports.default = ExpectedErrorsPlugin;
//# sourceMappingURL=ExpectedErrorsPlugin.js.map