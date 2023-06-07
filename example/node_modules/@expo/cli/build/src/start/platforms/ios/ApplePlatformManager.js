"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _platformManager = require("../PlatformManager");
var _appleAppIdResolver = require("./AppleAppIdResolver");
var _appleDeviceManager = require("./AppleDeviceManager");
class ApplePlatformManager extends _platformManager.PlatformManager {
    constructor(projectRoot, port, options){
        super(projectRoot, {
            platform: "ios",
            ...options,
            resolveDeviceAsync: _appleDeviceManager.AppleDeviceManager.resolveAsync
        });
        this.projectRoot = projectRoot;
        this.port = port;
    }
    async openAsync(options, resolveSettings) {
        await _appleDeviceManager.AppleDeviceManager.assertSystemRequirementsAsync();
        return super.openAsync(options, resolveSettings);
    }
    _getAppIdResolver() {
        return new _appleAppIdResolver.AppleAppIdResolver(this.projectRoot);
    }
    _resolveAlternativeLaunchUrl(applicationId, props) {
        return applicationId;
    }
}
exports.ApplePlatformManager = ApplePlatformManager;

//# sourceMappingURL=ApplePlatformManager.js.map