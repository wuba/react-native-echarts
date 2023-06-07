"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveBundlerPropsAsync = resolveBundlerPropsAsync;
var _log = require("../log");
var _errors = require("../utils/errors");
var _port = require("../utils/port");
async function resolveBundlerPropsAsync(projectRoot, options) {
    var _bundler;
    options.bundler = (_bundler = options.bundler) != null ? _bundler : true;
    if (// If the user disables the bundler then they should not pass in the port property.
    !options.bundler && options.port) {
        throw new _errors.CommandError("BAD_ARGS", "--port and --no-bundler are mutually exclusive arguments");
    }
    // Resolve the port if the bundler is used.
    let port = options.bundler ? await (0, _port).resolvePortAsync(projectRoot, {
        reuseExistingPort: true,
        defaultPort: options.port
    }) : null;
    // Skip bundling if the port is null -- meaning skip the bundler if the port is already running the app.
    options.bundler = !!port;
    if (!port) {
        // any random number
        port = 8081;
    }
    _log.Log.debug(`Resolved port: ${port}, start dev server: ${options.bundler}`);
    return {
        shouldStartBundler: !!options.bundler,
        port
    };
}

//# sourceMappingURL=resolveBundlerProps.js.map