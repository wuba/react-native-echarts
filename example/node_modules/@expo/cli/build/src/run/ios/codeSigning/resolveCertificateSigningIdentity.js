"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sortDefaultIdToBeginningAsync = sortDefaultIdToBeginningAsync;
exports.resolveCertificateSigningIdentityAsync = resolveCertificateSigningIdentityAsync;
exports.selectDevelopmentTeamAsync = selectDevelopmentTeamAsync;
var _chalk = _interopRequireDefault(require("chalk"));
var Log = _interopRequireWildcard(require("../../../log"));
var _errors = require("../../../utils/errors");
var _interactive = require("../../../utils/interactive");
var _link = require("../../../utils/link");
var _prompts = require("../../../utils/prompts");
var Security = _interopRequireWildcard(require("./Security"));
var _settings = require("./settings");
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
async function sortDefaultIdToBeginningAsync(identities) {
    const lastSelected = await (0, _settings).getLastDeveloperCodeSigningIdAsync();
    if (lastSelected) {
        let iterations = 0;
        while(identities[0].signingCertificateId !== lastSelected && iterations < identities.length){
            identities.push(identities.shift());
            iterations++;
        }
    }
    return [
        identities,
        lastSelected
    ];
}
/**
 * Assert that the computer needs code signing setup.
 * This links to an FYI page that was user tested internally.
 */ function assertCodeSigningSetup() {
    // TODO: We can probably do this too automatically.
    Log.log(`\u203A Your computer requires some additional setup before you can build onto physical iOS devices.\n  ${_chalk.default.bold((0, _link).learnMore("https://expo.fyi/setup-xcode-signing"))}`);
    throw new _errors.CommandError("No code signing certificates are available to use.");
}
async function resolveCertificateSigningIdentityAsync(ids) {
    // The user has no valid code signing identities.
    if (!ids.length) {
        assertCodeSigningSetup();
    }
    //  One ID available 🤝 Program is not interactive
    //
    //     using the the first available option
    if (ids.length === 1 || !(0, _interactive).isInteractive()) {
        // This method is cheaper than `resolveIdentitiesAsync` and checking the
        // cached user preference so we should use this as early as possible.
        return Security.resolveCertificateSigningInfoAsync(ids[0]);
    }
    // Get identities and sort by the one that the user is most likely to choose.
    const [identities, preferred] = await sortDefaultIdToBeginningAsync(await Security.resolveIdentitiesAsync(ids));
    const selected = await selectDevelopmentTeamAsync(identities, preferred);
    // Store the last used value and suggest it as the first value
    // next time the user has to select a code signing identity.
    await (0, _settings).setLastDeveloperCodeSigningIdAsync(selected.signingCertificateId);
    return selected;
}
async function selectDevelopmentTeamAsync(identities, preferredId) {
    const index = await (0, _prompts).selectAsync("Development team for signing the app", identities.map((value, i)=>{
        const format = value.signingCertificateId === preferredId ? _chalk.default.bold : (message)=>message
        ;
        return {
            // Formatted like: `650 Industries, Inc. (A1BCDEF234) - Apple Development: Evan Bacon (AA00AABB0A)`
            title: format([
                value.appleTeamName,
                `(${value.appleTeamId}) -`,
                value.codeSigningInfo
            ].join(" ")),
            value: i
        };
    }));
    return identities[index];
}

//# sourceMappingURL=resolveCertificateSigningIdentity.js.map