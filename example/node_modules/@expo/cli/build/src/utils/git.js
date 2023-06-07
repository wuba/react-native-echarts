"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.maybeBailOnGitStatusAsync = maybeBailOnGitStatusAsync;
exports.validateGitStatusAsync = validateGitStatusAsync;
var _spawnAsync = _interopRequireDefault(require("@expo/spawn-async"));
var _chalk = _interopRequireDefault(require("chalk"));
var Log = _interopRequireWildcard(require("../log"));
var _env = require("./env");
var _interactive = require("./interactive");
var _prompts = require("./prompts");
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
async function maybeBailOnGitStatusAsync() {
    if (_env.env.EXPO_NO_GIT_STATUS) {
        Log.warn("Git status is dirty but the command will continue because EXPO_NO_GIT_STATUS is enabled...");
        return false;
    }
    const isGitStatusClean = await validateGitStatusAsync();
    // Give people a chance to bail out if git working tree is dirty
    if (!isGitStatusClean) {
        if (!(0, _interactive).isInteractive()) {
            Log.warn(`Git status is dirty but the command will continue because the terminal is not interactive.`);
            return false;
        }
        Log.log();
        const answer = await (0, _prompts).confirmAsync({
            message: `Would you like to proceed?`
        });
        if (!answer) {
            return true;
        }
        Log.log();
    }
    return false;
}
async function validateGitStatusAsync() {
    let workingTreeStatus = "unknown";
    try {
        const result = await (0, _spawnAsync).default("git", [
            "status",
            "--porcelain"
        ]);
        workingTreeStatus = result.stdout === "" ? "clean" : "dirty";
    } catch  {
    // Maybe git is not installed?
    // Maybe this project is not using git?
    }
    if (workingTreeStatus === "clean") {
        Log.log(`Your git working tree is ${_chalk.default.green("clean")}`);
        Log.log("To revert the changes after this command completes, you can run the following:");
        Log.log("  git clean --force && git reset --hard");
        return true;
    } else if (workingTreeStatus === "dirty") {
        Log.log(`${_chalk.default.bold("Warning!")} Your git working tree is ${_chalk.default.red("dirty")}.`);
        Log.log(`It's recommended to ${_chalk.default.bold("commit all your changes before proceeding")}, so you can revert the changes made by this command if necessary.`);
    } else {
        Log.log("We couldn't find a git repository in your project directory.");
        Log.log("It's recommended to back up your project before proceeding.");
    }
    return false;
}

//# sourceMappingURL=git.js.map