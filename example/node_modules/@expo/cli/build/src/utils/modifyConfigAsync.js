"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.attemptModification = attemptModification;
exports.warnAboutConfigAndThrow = warnAboutConfigAndThrow;
var _config = require("@expo/config");
var _chalk = _interopRequireDefault(require("chalk"));
var Log = _interopRequireWildcard(require("../log"));
var _errors = require("./errors");
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
async function attemptModification(projectRoot, edits, exactEdits) {
    const modification = await (0, _config).modifyConfigAsync(projectRoot, edits, {
        skipSDKVersionRequirement: true
    });
    if (modification.type === "success") {
        Log.log();
    } else {
        warnAboutConfigAndThrow(modification.type, modification.message, exactEdits);
    }
}
function logNoConfig() {
    Log.log(_chalk.default.yellow(`No Expo config was found. Please create an Expo config (${_chalk.default.bold`app.json`} or ${_chalk.default.bold`app.config.js`}) in your project root.`));
}
function warnAboutConfigAndThrow(type, message, edits) {
    Log.log();
    if (type === "warn") {
        // The project is using a dynamic config, give the user a helpful log and bail out.
        Log.log(_chalk.default.yellow(message));
    } else {
        logNoConfig();
    }
    notifyAboutManualConfigEdits(edits);
    throw new _errors.SilentError();
}
function notifyAboutManualConfigEdits(edits) {
    Log.log(_chalk.default.cyan(`Please add the following to your Expo config`));
    Log.log();
    Log.log(JSON.stringify(edits, null, 2));
    Log.log();
}

//# sourceMappingURL=modifyConfigAsync.js.map