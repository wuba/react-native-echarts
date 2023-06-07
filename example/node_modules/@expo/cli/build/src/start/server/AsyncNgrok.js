"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _chalk = _interopRequireDefault(require("chalk"));
var _crypto = _interopRequireDefault(require("crypto"));
var path = _interopRequireWildcard(require("path"));
var _slugify = _interopRequireDefault(require("slugify"));
var _userSettings = _interopRequireDefault(require("../../api/user/UserSettings"));
var _user = require("../../api/user/user");
var Log = _interopRequireWildcard(require("../../log"));
var _delay = require("../../utils/delay");
var _env = require("../../utils/env");
var _errors = require("../../utils/errors");
var _ngrokResolver = require("../doctor/ngrok/NgrokResolver");
var _adbReverse = require("../platforms/android/adbReverse");
var _settings = require("../project/settings");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
const debug = require("debug")("expo:start:server:ngrok");
const NGROK_CONFIG = {
    authToken: "5W1bR67GNbWcXqmxZzBG1_56GezNeaX6sSRvn8npeQ8",
    domain: "exp.direct"
};
const TUNNEL_TIMEOUT = 10 * 1000;
class AsyncNgrok {
    constructor(projectRoot, port){
        this.projectRoot = projectRoot;
        this.port = port;
        this.serverUrl = null;
        this.resolver = new _ngrokResolver.NgrokResolver(projectRoot);
    }
    getActiveUrl() {
        return this.serverUrl;
    }
    /** Exposed for testing. */ async _getIdentifyingUrlSegmentsAsync() {
        const user = await (0, _user).getUserAsync();
        if ((user == null ? void 0 : user.__typename) === "Robot") {
            throw new _errors.CommandError("NGROK_ROBOT", "Cannot use ngrok with a robot user.");
        }
        const username = (0, _user).getActorDisplayName(user);
        return [
            // NOTE: https://github.com/expo/expo/pull/16556#discussion_r822944286
            await this.getProjectRandomnessAsync(),
            (0, _slugify).default(username),
            // Use the port to distinguish between multiple tunnels (webpack, metro).
            String(this.port), 
        ];
    }
    /** Exposed for testing. */ async _getProjectHostnameAsync() {
        return [
            ...await this._getIdentifyingUrlSegmentsAsync(),
            NGROK_CONFIG.domain
        ].join(".");
    }
    /** Exposed for testing. */ async _getProjectSubdomainAsync() {
        return (await this._getIdentifyingUrlSegmentsAsync()).join("-");
    }
    /** Start ngrok on the given port for the project. */ async startAsync({ timeout  } = {}) {
        // Ensure the instance is loaded first, this can linger so we should run it before the timeout.
        await this.resolver.resolveAsync({
            // For now, prefer global install since the package has native code (harder to install) and doesn't change very often.
            prefersGlobalInstall: true
        });
        // NOTE(EvanBacon): If the user doesn't have ADB installed,
        // then skip attempting to reverse the port.
        if ((0, _adbReverse).hasAdbReverseAsync()) {
            // Ensure ADB reverse is running.
            if (!await (0, _adbReverse).startAdbReverseAsync([
                this.port
            ])) {
                // TODO: Better error message.
                throw new _errors.CommandError("NGROK_ADB", `Cannot start tunnel URL because \`adb reverse\` failed for the connected Android device(s).`);
            }
        }
        this.serverUrl = await this._connectToNgrokAsync({
            timeout
        });
        debug("Tunnel URL:", this.serverUrl);
        Log.log("Tunnel ready.");
    }
    /** Stop the ngrok process if it's running. */ async stopAsync() {
        var ref;
        debug("Stopping Tunnel");
        await ((ref = this.resolver.get()) == null ? void 0 : ref.kill == null ? void 0 : ref.kill());
        this.serverUrl = null;
    }
    /** Exposed for testing. */ async _connectToNgrokAsync(options = {}, attempts = 0) {
        // Attempt to stop any hanging processes, this increases the chances of a successful connection.
        await this.stopAsync();
        // Get the instance quietly or assert otherwise.
        const instance = await this.resolver.resolveAsync({
            shouldPrompt: false,
            autoInstall: false
        });
        var _timeout;
        // TODO(Bacon): Consider dropping the timeout functionality:
        // https://github.com/expo/expo/pull/16556#discussion_r822307373
        const results = await (0, _delay).resolveWithTimeout(()=>this.connectToNgrokInternalAsync(instance, attempts)
        , {
            timeout: (_timeout = options.timeout) != null ? _timeout : TUNNEL_TIMEOUT,
            errorMessage: "ngrok tunnel took too long to connect."
        });
        if (typeof results === "string") {
            return results;
        }
        // Wait 100ms and then try again
        await (0, _delay).delayAsync(100);
        return this._connectToNgrokAsync(options, attempts + 1);
    }
    async _getConnectionPropsAsync() {
        const userDefinedSubdomain = _env.env.EXPO_TUNNEL_SUBDOMAIN;
        if (userDefinedSubdomain) {
            const subdomain = typeof userDefinedSubdomain === "string" ? userDefinedSubdomain : await this._getProjectSubdomainAsync();
            debug("Subdomain:", subdomain);
            return {
                subdomain
            };
        } else {
            const hostname = await this._getProjectHostnameAsync();
            debug("Hostname:", hostname);
            return {
                hostname
            };
        }
    }
    async connectToNgrokInternalAsync(instance, attempts = 0) {
        try {
            // Global config path.
            const configPath = path.join(_userSettings.default.getDirectory(), "ngrok.yml");
            debug("Global config path:", configPath);
            const urlProps = await this._getConnectionPropsAsync();
            const url = await instance.connect({
                ...urlProps,
                authtoken: NGROK_CONFIG.authToken,
                proto: "http",
                configPath,
                onStatusChange (status) {
                    if (status === "closed") {
                        Log.error(_chalk.default.red("Tunnel connection has been closed. This is often related to intermittent connection problems with the Ngrok servers. Restart the dev server to try connecting to Ngrok again."));
                    } else if (status === "connected") {
                        Log.log("Tunnel connected.");
                    }
                },
                port: this.port
            });
            return url;
        } catch (error) {
            const assertNgrok = ()=>{
                if ((0, _ngrokResolver).isNgrokClientError(error)) {
                    var ref;
                    throw new _errors.CommandError("NGROK_CONNECT", [
                        error.body.msg,
                        (ref = error.body.details) == null ? void 0 : ref.err
                    ].filter(Boolean).join("\n\n"));
                }
                throw new _errors.CommandError("NGROK_CONNECT", error.toString());
            };
            // Attempt to connect 3 times
            if (attempts >= 2) {
                assertNgrok();
            }
            // Attempt to fix the issue
            if ((0, _ngrokResolver).isNgrokClientError(error) && error.body.error_code === 103) {
                // Assert early if a custom subdomain is used since it cannot
                // be changed and retried. If the tunnel subdomain is a boolean
                // then we can reset the randomness and try again.
                if (typeof _env.env.EXPO_TUNNEL_SUBDOMAIN === "string") {
                    assertNgrok();
                }
                // Change randomness to avoid conflict if killing ngrok doesn't help
                await this._resetProjectRandomnessAsync();
            }
            return false;
        }
    }
    async getProjectRandomnessAsync() {
        const { urlRandomness: randomness  } = await _settings.ProjectSettings.readAsync(this.projectRoot);
        if (randomness) {
            return randomness;
        }
        return await this._resetProjectRandomnessAsync();
    }
    async _resetProjectRandomnessAsync() {
        const randomness = _crypto.default.randomBytes(5).toString("base64url");
        await _settings.ProjectSettings.setAsync(this.projectRoot, {
            urlRandomness: randomness
        });
        debug("Resetting project randomness:", randomness);
        return randomness;
    }
}
exports.AsyncNgrok = AsyncNgrok;

//# sourceMappingURL=AsyncNgrok.js.map