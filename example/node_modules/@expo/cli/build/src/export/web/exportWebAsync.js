"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.exportWebAsync = exportWebAsync;
var _config = require("@expo/config");
var _chalk = _interopRequireDefault(require("chalk"));
var _log = require("../../log");
var _webSupportProjectPrerequisite = require("../../start/doctor/web/WebSupportProjectPrerequisite");
var _platformBundlers = require("../../start/server/platformBundlers");
var _webpackBundlerDevServer = require("../../start/server/webpack/WebpackBundlerDevServer");
var _errors = require("../../utils/errors");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function exportWebAsync(projectRoot, options) {
    // Ensure webpack is available
    await new _webSupportProjectPrerequisite.WebSupportProjectPrerequisite(projectRoot).assertAsync();
    const { exp  } = (0, _config).getConfig(projectRoot);
    const platformBundlers = (0, _platformBundlers).getPlatformBundlers(exp);
    // Create a bundler interface
    const bundler = new _webpackBundlerDevServer.WebpackBundlerDevServer(projectRoot, platformBundlers, false);
    // If the user set `web.bundler: 'metro'` then they should use `expo export` instead.
    if (!bundler.isTargetingWeb()) {
        throw new _errors.CommandError(_chalk.default`{bold expo export:web} can only be used with Webpack. Use {bold expo export} for other bundlers.`);
    }
    _log.Log.log(`Exporting with Webpack...`);
    // Bundle the app
    await bundler.bundleAsync({
        mode: options.dev ? "development" : "production",
        clear: options.clear
    });
}

//# sourceMappingURL=exportWebAsync.js.map