"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ensureDeviceIsCodeSignedForDeploymentAsync = ensureDeviceIsCodeSignedForDeploymentAsync;
var _chalk = _interopRequireDefault(require("chalk"));
var Log = _interopRequireWildcard(require("../../../log"));
var Security = _interopRequireWildcard(require("./Security"));
var _resolveCertificateSigningIdentity = require("./resolveCertificateSigningIdentity");
var _xcodeCodeSigning = require("./xcodeCodeSigning");
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
async function ensureDeviceIsCodeSignedForDeploymentAsync(projectRoot) {
    if (isCodeSigningConfigured(projectRoot)) {
        return null;
    }
    return configureCodeSigningAsync(projectRoot);
}
function isCodeSigningConfigured(projectRoot) {
    // Check if the app already has a development team defined.
    const signingInfo = (0, _xcodeCodeSigning).getCodeSigningInfoForPbxproj(projectRoot);
    const allTargetsHaveTeams = Object.values(signingInfo).reduce((prev, curr)=>{
        return prev && !!curr.developmentTeams.length;
    }, true);
    if (allTargetsHaveTeams) {
        const teamList = Object.values(signingInfo).reduce((prev, curr)=>{
            return prev.concat([
                curr.developmentTeams[0]
            ]);
        }, []);
        Log.log(_chalk.default.dim`\u203A Auto signing app using team(s): ${teamList.join(", ")}`);
        return true;
    }
    const allTargetsHaveProfiles = Object.values(signingInfo).reduce((prev, curr)=>{
        return prev && !!curr.provisioningProfiles.length;
    }, true);
    if (allTargetsHaveProfiles) {
        // this indicates that the user has manual code signing setup (possibly for production).
        return true;
    }
    return false;
}
async function configureCodeSigningAsync(projectRoot) {
    const ids = await Security.findIdentitiesAsync();
    const id = await (0, _resolveCertificateSigningIdentity).resolveCertificateSigningIdentityAsync(ids);
    Log.log(`\u203A Signing and building iOS app with: ${id.codeSigningInfo}`);
    (0, _xcodeCodeSigning).setAutoCodeSigningInfoForPbxproj(projectRoot, {
        appleTeamId: id.appleTeamId
    });
    return id.appleTeamId;
}

//# sourceMappingURL=configureCodeSigning.js.map