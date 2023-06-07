"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveOptionsAsync = resolveOptionsAsync;
var _resolveBundlerProps = require("../resolveBundlerProps");
var _resolveDevice = require("./resolveDevice");
var _resolveGradleProps = require("./resolveGradleProps");
var _resolveLaunchProps = require("./resolveLaunchProps");
async function resolveOptionsAsync(projectRoot, options) {
    var _variant;
    return {
        ...await (0, _resolveBundlerProps).resolveBundlerPropsAsync(projectRoot, options),
        ...(0, _resolveGradleProps).resolveGradleProps(projectRoot, options),
        ...await (0, _resolveLaunchProps).resolveLaunchPropsAsync(projectRoot),
        variant: (_variant = options.variant) != null ? _variant : "debug",
        // Resolve the device based on the provided device id or prompt
        // from a list of devices (connected or simulated) that are filtered by the scheme.
        device: await (0, _resolveDevice).resolveDeviceAsync(options.device),
        buildCache: !!options.buildCache,
        install: !!options.install
    };
}

//# sourceMappingURL=resolveOptions.js.map