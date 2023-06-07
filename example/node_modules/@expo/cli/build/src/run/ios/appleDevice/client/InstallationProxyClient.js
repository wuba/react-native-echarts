"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _debug = _interopRequireDefault(require("debug"));
var _lockdownProtocol = require("../protocol/LockdownProtocol");
var _serviceClient = require("./ServiceClient");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = (0, _debug).default("expo:apple-device:client:installation_proxy");
function isIPLookupResponse(resp) {
    return resp.length && resp[0].LookupResult !== undefined;
}
function isIPInstallPercentCompleteResponse(resp) {
    return resp.length && resp[0].PercentComplete !== undefined;
}
function isIPInstallCFBundleIdentifierResponse(resp) {
    return resp.length && resp[0].CFBundleIdentifier !== undefined;
}
function isIPInstallCompleteResponse(resp) {
    return resp.length && resp[0].Status === "Complete";
}
class InstallationProxyClient extends _serviceClient.ServiceClient {
    constructor(socket){
        super(socket, new _lockdownProtocol.LockdownProtocolClient(socket));
        this.socket = socket;
    }
    async lookupApp(bundleIds, options = {
        ReturnAttributes: [
            "Path",
            "Container",
            "CFBundleExecutable",
            "CFBundleIdentifier"
        ],
        ApplicationsType: "Any"
    }) {
        debug(`lookupApp, options: ${JSON.stringify(options)}`);
        let resp = await this.protocolClient.sendMessage({
            Command: "Lookup",
            ClientOptions: {
                BundleIDs: bundleIds,
                ...options
            }
        });
        if (resp && !Array.isArray(resp)) resp = [
            resp
        ];
        if (isIPLookupResponse(resp)) {
            return resp[0].LookupResult;
        } else {
            throw new _serviceClient.ResponseError(`There was an error looking up app`, resp);
        }
    }
    async installApp(packagePath, bundleId, options = {
        ApplicationsType: "Any",
        PackageType: "Developer"
    }, onProgress) {
        debug(`installApp, packagePath: ${packagePath}, bundleId: ${bundleId}`);
        return this.protocolClient.sendMessage({
            Command: "Install",
            PackagePath: packagePath,
            ClientOptions: {
                CFBundleIdentifier: bundleId,
                ...options
            }
        }, (resp, resolve, reject)=>{
            if (resp && !Array.isArray(resp)) resp = [
                resp
            ];
            if (isIPInstallCompleteResponse(resp)) {
                onProgress({
                    isComplete: true,
                    progress: 100,
                    status: resp[0].Status
                });
                resolve();
            } else if (isIPInstallPercentCompleteResponse(resp)) {
                onProgress({
                    isComplete: false,
                    progress: resp[0].PercentComplete,
                    status: resp[0].Status
                });
                debug(`Installation status: ${resp[0].Status}, %${resp[0].PercentComplete}`);
            } else if (isIPInstallCFBundleIdentifierResponse(resp)) {
                debug(`Installed app: ${resp[0].CFBundleIdentifier}`);
            } else {
                reject(new _serviceClient.ResponseError("There was an error installing app: " + require("util").inspect(resp), resp));
            }
        });
    }
}
exports.InstallationProxyClient = InstallationProxyClient;

//# sourceMappingURL=InstallationProxyClient.js.map