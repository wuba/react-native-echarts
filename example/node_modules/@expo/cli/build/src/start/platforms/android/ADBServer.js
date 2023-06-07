"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _spawnAsync = _interopRequireDefault(require("@expo/spawn-async"));
var _childProcess = require("child_process");
var _log = require("../../../log");
var _errors = require("../../../utils/errors");
var _exit = require("../../../utils/exit");
var _androidSdk = require("./AndroidSdk");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:start:platforms:android:adbServer");
const BEGINNING_OF_ADB_ERROR_MESSAGE = "error: ";
class ADBServer {
    isRunning = false;
    removeExitHook = ()=>{};
    /** Returns the command line reference to ADB. */ getAdbExecutablePath() {
        try {
            const sdkRoot = (0, _androidSdk).assertSdkRoot();
            if (sdkRoot) {
                return `${sdkRoot}/platform-tools/adb`;
            }
        } catch (error) {
            _log.Log.warn(error.message);
        }
        _log.Log.debug("Failed to resolve the Android SDK path, falling back to global adb executable");
        return "adb";
    }
    /** Start the ADB server. */ async startAsync() {
        if (this.isRunning) {
            return false;
        }
        // clean up
        this.removeExitHook = (0, _exit).installExitHooks(()=>{
            if (this.isRunning) {
                this.stopAsync();
            }
        });
        const adb = this.getAdbExecutablePath();
        const result = await this.resolveAdbPromise((0, _spawnAsync).default(adb, [
            "start-server"
        ]));
        const lines = result.stderr.trim().split(/\r?\n/);
        const isStarted = lines.includes("* daemon started successfully");
        this.isRunning = isStarted;
        return isStarted;
    }
    /** Kill the ADB server. */ async stopAsync() {
        debug("Stopping ADB server");
        if (!this.isRunning) {
            debug("ADB server is not running");
            return false;
        }
        this.removeExitHook();
        try {
            await this.runAsync([
                "kill-server"
            ]);
            return true;
        } catch (error) {
            _log.Log.error("Failed to stop ADB server: " + error.message);
            return false;
        } finally{
            debug("Stopped ADB server");
            this.isRunning = false;
        }
    }
    /** Execute an ADB command with given args. */ async runAsync(args) {
        // TODO: Add a global package that installs adb to the path.
        const adb = this.getAdbExecutablePath();
        await this.startAsync();
        debug([
            adb,
            ...args
        ].join(" "));
        const result = await this.resolveAdbPromise((0, _spawnAsync).default(adb, args));
        return result.output.join("\n");
    }
    /** Get ADB file output. Useful for reading device state/settings. */ async getFileOutputAsync(args) {
        // TODO: Add a global package that installs adb to the path.
        const adb = this.getAdbExecutablePath();
        await this.startAsync();
        const results = await this.resolveAdbPromise((0, _childProcess).execFileSync(adb, args, {
            encoding: "latin1",
            stdio: "pipe"
        }));
        debug("[ADB] File output:\n", results);
        return results;
    }
    /** Formats error info. */ async resolveAdbPromise(promise) {
        try {
            return await promise;
        } catch (error) {
            // User pressed ctrl+c to cancel the process...
            if (error.signal === "SIGINT") {
                throw new _errors.AbortCommandError();
            }
            // TODO: Support heap corruption for adb 29 (process exits with code -1073740940) (windows and linux)
            let errorMessage = (error.stderr || error.stdout || error.message).trim();
            if (errorMessage.startsWith(BEGINNING_OF_ADB_ERROR_MESSAGE)) {
                errorMessage = errorMessage.substring(BEGINNING_OF_ADB_ERROR_MESSAGE.length);
            }
            error.message = errorMessage;
            throw error;
        }
    }
}
exports.ADBServer = ADBServer;

//# sourceMappingURL=ADBServer.js.map