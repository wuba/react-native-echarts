"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _config = require("@expo/config");
var _settings = require("../../api/settings");
var _updateDevelopmentSession = require("../../api/updateDevelopmentSession");
var _user = require("../../api/user/user");
var ProjectDevices = _interopRequireWildcard(require("../project/devices"));
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
const debug = require("debug")("expo:start:server:developmentSession");
const UPDATE_FREQUENCY = 20 * 1000; // 20 seconds
async function isAuthenticatedAsync() {
    return !!await (0, _user).getUserAsync().catch(()=>null
    );
}
class DevelopmentSession {
    constructor(projectRoot, url, onError){
        this.projectRoot = projectRoot;
        this.url = url;
        this.onError = onError;
        this.timeout = null;
    }
    /**
   * Notify the Expo servers that a project is running, this enables the Expo Go app
   * and Dev Clients to offer a "recently in development" section for quick access.
   *
   * This method starts an interval that will continue to ping the servers until we stop it.
   *
   * @param projectRoot Project root folder, used for retrieving device installation IDs.
   * @param props.exp Partial Expo config with values that will be used in the Expo Go app.
   * @param props.runtime which runtime the app should be opened in. `native` for dev clients, `web` for web browsers.
   */ async startAsync({ exp =(0, _config).getConfig(this.projectRoot).exp , runtime  }) {
        try {
            if (_settings.APISettings.isOffline) {
                debug("Development session will not ping because the server is offline.");
                this.stopNotifying();
                return;
            }
            const deviceIds = await this.getDeviceInstallationIdsAsync();
            if (!await isAuthenticatedAsync() && !(deviceIds == null ? void 0 : deviceIds.length)) {
                debug("Development session will not ping because the user is not authenticated and there are no devices.");
                this.stopNotifying();
                return;
            }
            if (this.url) {
                debug(`Development session ping (runtime: ${runtime}, url: ${this.url})`);
                await (0, _updateDevelopmentSession).updateDevelopmentSessionAsync({
                    url: this.url,
                    runtime,
                    exp,
                    deviceIds
                });
            }
            this.stopNotifying();
            this.timeout = setTimeout(()=>this.startAsync({
                    exp,
                    runtime
                })
            , UPDATE_FREQUENCY);
        } catch (error) {
            debug(`Error updating development session API: ${error}`);
            this.stopNotifying();
            this.onError(error);
        }
    }
    /** Get all recent devices for the project. */ async getDeviceInstallationIdsAsync() {
        const { devices  } = await ProjectDevices.getDevicesInfoAsync(this.projectRoot);
        return devices.map(({ installationId  })=>installationId
        );
    }
    /** Stop notifying the Expo servers that the development session is running. */ stopNotifying() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = null;
    }
    async closeAsync() {
        this.stopNotifying();
        const deviceIds = await this.getDeviceInstallationIdsAsync();
        if (!await isAuthenticatedAsync() && !(deviceIds == null ? void 0 : deviceIds.length)) {
            return;
        }
        if (this.url) {
            await (0, _updateDevelopmentSession).closeDevelopmentSessionAsync({
                url: this.url,
                deviceIds
            });
        }
    }
}
exports.DevelopmentSession = DevelopmentSession;

//# sourceMappingURL=DevelopmentSession.js.map