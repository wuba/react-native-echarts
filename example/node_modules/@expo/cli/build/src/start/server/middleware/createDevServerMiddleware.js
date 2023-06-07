"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createDevServerMiddleware = createDevServerMiddleware;
var _devServer = require("@expo/dev-server");
function createDevServerMiddleware(projectRoot, { watchFolders , port  }) {
    const shim = function() {};
    return (0, _devServer).createDevServerMiddleware(projectRoot, {
        // Attach a fake logger to the expo `/logs` middleware so we can collect devices for analytics.
        // We utilize the WebSocket logs now so we don't need to print anything.
        // TODO: Migrate to a system that uses WebSockets so we can detect when a device disconnects.
        logger: {
            info: shim,
            warn: shim,
            error: shim,
            debug: shim
        },
        port,
        watchFolders
    });
}

//# sourceMappingURL=createDevServerMiddleware.js.map