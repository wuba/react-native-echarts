"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _platformManager = require("../PlatformManager");
var _androidAppIdResolver = require("./AndroidAppIdResolver");
var _androidDeviceManager = require("./AndroidDeviceManager");
var _adbReverse = require("./adbReverse");
class AndroidPlatformManager extends _platformManager.PlatformManager {
    constructor(projectRoot, port, options){
        super(projectRoot, {
            platform: "android",
            ...options,
            resolveDeviceAsync: _androidDeviceManager.AndroidDeviceManager.resolveAsync
        });
        this.projectRoot = projectRoot;
        this.port = port;
    }
    async openAsync(options, resolveSettings) {
        await (0, _adbReverse).startAdbReverseAsync([
            this.port
        ]);
        return super.openAsync(options, resolveSettings);
    }
    _getAppIdResolver() {
        return new _androidAppIdResolver.AndroidAppIdResolver(this.projectRoot);
    }
    _resolveAlternativeLaunchUrl(applicationId, props) {
        var ref;
        return (ref = props == null ? void 0 : props.launchActivity) != null ? ref : `${applicationId}/.MainActivity`;
    }
}
exports.AndroidPlatformManager = AndroidPlatformManager;

//# sourceMappingURL=AndroidPlatformManager.js.map