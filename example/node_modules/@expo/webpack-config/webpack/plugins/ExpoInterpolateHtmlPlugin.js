"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @borrows https://github.com/facebook/create-react-app/blob/f0a837c1f07ebd963ddbba2c2937d04fc1b79d40/packages/react-dev-utils/InterpolateHtmlPlugin.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../env");
const escapeStringRegexp_1 = require("../utils/escapeStringRegexp");
class InterpolateHtmlPlugin {
    constructor(htmlWebpackPlugin, replacements) {
        this.htmlWebpackPlugin = htmlWebpackPlugin;
        this.replacements = replacements;
    }
    apply(compiler) {
        const logger = compiler.getInfrastructureLogger('interpolate-html-plugin');
        compiler.hooks.compilation.tap(this.constructor.name, compilation => {
            this.htmlWebpackPlugin
                // @ts-ignore
                .getHooks(compilation)
                .afterTemplateExecution.tap(this.constructor.name, (data) => {
                // Run HTML through a series of user-specified string replacements.
                Object.keys(this.replacements).forEach(key => {
                    const value = this.replacements[key];
                    logger.debug(`Replace: "${key}" with: ${value}`);
                    data.html = data.html.replace(new RegExp('%' + (0, escapeStringRegexp_1.escapeStringRegexp)(key) + '%', 'g'), value);
                });
            });
        });
    }
}
exports.default = InterpolateHtmlPlugin;
InterpolateHtmlPlugin.fromEnv = (env, htmlWebpackPlugin) => {
    var _a, _b;
    const config = env.config || (0, env_1.getConfig)(env);
    const { publicPath } = (0, env_1.getPublicPaths)(env);
    // @ts-ignore
    return new InterpolateHtmlPlugin(htmlWebpackPlugin, {
        WEB_PUBLIC_URL: publicPath,
        // @ts-ignore Type 'string | undefined' is not assignable to type 'string'.
        WEB_TITLE: (_a = config.web) === null || _a === void 0 ? void 0 : _a.name,
        LANG_ISO_CODE: (_b = config.web) === null || _b === void 0 ? void 0 : _b.lang,
        // These are for legacy ejected web/index.html files
        NO_SCRIPT: `<form action="" style="background-color:#fff;position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;"><div style="font-size:18px;font-family:Helvetica,sans-serif;line-height:24px;margin:10%;width:80%;"> <p>Oh no! It looks like JavaScript is not enabled in your browser.</p> <p style="margin:20px 0;"> <button type="submit" style="background-color: #4630EB; border-radius: 100px; border: none; box-shadow: none; color: #fff; cursor: pointer; font-weight: bold; line-height: 20px; padding: 6px 16px;">Reload</button> </p> </div> </form>`,
        ROOT_ID: 'root',
    });
};
//# sourceMappingURL=ExpoInterpolateHtmlPlugin.js.map