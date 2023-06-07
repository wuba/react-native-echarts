"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _spawnAsync = _interopRequireDefault(require("@expo/spawn-async"));
var _chalk = _interopRequireDefault(require("chalk"));
var _childProcess = require("child_process");
var _delay = require("../../../utils/delay");
var _errors = require("../../../utils/errors");
var _prompts = require("../../../utils/prompts");
var _prerequisite = require("../Prerequisite");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function isXcrunInstalledAsync() {
    try {
        (0, _childProcess).execSync("xcrun --version", {
            stdio: "ignore"
        });
        return true;
    } catch  {
        return false;
    }
}
class XcrunPrerequisite extends _prerequisite.Prerequisite {
    static instance = new XcrunPrerequisite();
    /**
   * Ensure Xcode CLI is installed.
   */ async assertImplementation() {
        if (await isXcrunInstalledAsync()) {
            // Run this second to ensure the Xcode version check is run.
            return;
        }
        async function pendingAsync() {
            if (!await isXcrunInstalledAsync()) {
                await (0, _delay).delayAsync(100);
                return await pendingAsync();
            }
        }
        // This prompt serves no purpose accept informing the user what to do next, we could just open the App Store but it could be confusing if they don't know what's going on.
        const confirm = await (0, _prompts).confirmAsync({
            initial: true,
            message: _chalk.default`Xcode {bold Command Line Tools} needs to be installed (requires {bold sudo}), continue?`
        });
        if (confirm) {
            try {
                await (0, _spawnAsync).default("sudo", [
                    "xcode-select",
                    "--install"
                ]);
                // Most likely the user will cancel the process, but if they don't this will continue checking until the CLI is available.
                return await pendingAsync();
            } catch  {
            // TODO: Figure out why this might get called (cancel early, network issues, server problems)
            // TODO: Handle me
            }
        }
        throw new _errors.AbortCommandError();
    }
}
exports.XcrunPrerequisite = XcrunPrerequisite;

//# sourceMappingURL=XcrunPrerequisite.js.map