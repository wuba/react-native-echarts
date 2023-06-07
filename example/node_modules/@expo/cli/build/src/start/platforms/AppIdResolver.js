"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _config = require("@expo/config");
var _errors = require("../../utils/errors");
var _obj = require("../../utils/obj");
class AppIdResolver {
    constructor(projectRoot, platform, configProperty){
        this.projectRoot = projectRoot;
        this.platform = platform;
        this.configProperty = configProperty;
    }
    /** Resolve the application ID for the project. */ async getAppIdAsync() {
        if (await this.hasNativeProjectAsync()) {
            return this.getAppIdFromNativeAsync();
        }
        return this.getAppIdFromConfigAsync();
    }
    /** Returns `true` if the project has native project code. */ async hasNativeProjectAsync() {
        throw new _errors.UnimplementedError();
    }
    /** Return the app ID from the Expo config or assert. */ async getAppIdFromConfigAsync() {
        const config = (0, _config).getConfig(this.projectRoot);
        const appId = (0, _obj).get(config.exp, this.configProperty);
        if (!appId) {
            throw new _errors.CommandError("NO_APP_ID", `Required property '${this.configProperty}' is not found in the project ${(0, _config).getProjectConfigDescriptionWithPaths(this.projectRoot, config)}. This is required to open the app.`);
        }
        return appId;
    }
    /** Return the app ID from the native project files or null if the app ID cannot be found. */ async resolveAppIdFromNativeAsync() {
        throw new _errors.UnimplementedError();
    }
    /** Return the app ID from the native project files or assert. */ async getAppIdFromNativeAsync() {
        const appId = await this.resolveAppIdFromNativeAsync();
        if (!appId) {
            throw new _errors.CommandError("NO_APP_ID", `Failed to locate the ${this.platform} application identifier in the "${this.platform}/" folder. This is required to open the app.`);
        }
        return appId;
    }
}
exports.AppIdResolver = AppIdResolver;

//# sourceMappingURL=AppIdResolver.js.map