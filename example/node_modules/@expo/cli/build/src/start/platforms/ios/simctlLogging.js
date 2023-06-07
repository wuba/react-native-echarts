"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onMessage = onMessage;
var _chalk = _interopRequireDefault(require("chalk"));
var _childProcess = require("child_process");
var _os = require("os");
var _path = _interopRequireDefault(require("path"));
var _wrapAnsi = _interopRequireDefault(require("wrap-ansi"));
var Log = _interopRequireWildcard(require("../../../log"));
var _errors = require("../../../utils/errors");
var _exit = require("../../../utils/exit");
var _simctl = require("./simctl");
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
class SimulatorLogStreamer {
    static cache = [];
    static getStreamer = (device, resolver)=>{
        var ref;
        return (ref = SimulatorLogStreamer.cache.find((streamer)=>streamer.device.udid === device.udid
        )) != null ? ref : new SimulatorLogStreamer(device, resolver);
    };
    constructor(device, resolver){
        this.device = device;
        this.resolver = resolver;
        this.childProcess = null;
        this.off = null;
    }
    isAttached() {
        return !!this.childProcess;
    }
    async resolvePidAsync() {
        if ("pid" in this.resolver) {
            return this.resolver.pid;
        }
        return getImageNameFromBundleIdentifierAsync(this.device.udid, this.resolver.appId);
    }
    async attachAsync() {
        await this.detachAsync();
        const pid = await this.resolvePidAsync();
        if (!pid) {
            throw new _errors.CommandError(`Could not find pid for ${this.device.udid}`);
        }
        // xcrun simctl spawn booted log stream --process --style json
        this.childProcess = (0, _childProcess).spawn("xcrun", [
            "simctl",
            "spawn",
            this.device.udid,
            "log",
            "stream",
            "--process",
            pid,
            // ndjson provides a better format than json.
            "--style",
            "ndjson",
            // Provide the source so we can filter logs better
            "--source",
            // log, activity, trace -- activity was related to layouts, trace didn't work, so that leaves log.
            // Passing nothing combines all three, but we don't use activity.
            "--type",
            "log",
            // backtrace doesn't seem very useful in basic cases.
            // TODO: Maybe we can format as a stack trace for native errors.
            "--no-backtrace", 
        ]);
        this.childProcess.stdout.on("data", (data)=>{
            // Sometimes more than one chunk comes at a time, here we split by system newline,
            // then trim and filter.
            const strings = data.toString().split(_os.EOL).map((value)=>value.trim()
            )// This filters out the first log which says something like:
            // Filtering the log data using "process BEGINSWITH[cd] "my-app" AND type == 1024"
            .filter((value)=>value.startsWith("{")
            );
            strings.forEach((str)=>{
                const simLog = parseMessageJson(str);
                if (!simLog) {
                    return;
                }
                onMessage(simLog);
            });
        });
        this.childProcess.on("error", ({ message  })=>{
            Log.debug("[simctl error]:", message);
        });
        this.off = (0, _exit).installExitHooks(()=>{
            this.detachAsync.bind(this);
        });
    }
    detachAsync() {
        var _obj, ref2;
        (ref2 = (_obj = this).off) == null ? void 0 : ref2.call(_obj);
        this.off = null;
        if (this.childProcess) {
            return new Promise((resolve)=>{
                var ref, ref1;
                (ref = this.childProcess) == null ? void 0 : ref.on("close", resolve);
                (ref1 = this.childProcess) == null ? void 0 : ref1.kill();
                this.childProcess = null;
            });
        }
        return Promise.resolve();
    }
}
exports.SimulatorLogStreamer = SimulatorLogStreamer;
function parseMessageJson(data) {
    const stringData = data.toString();
    try {
        return JSON.parse(stringData);
    } catch  {
        Log.debug("Failed to parse simctl JSON message:\n" + stringData);
    }
    return null;
}
// There are a lot of networking logs in RN that aren't relevant to the user.
function isNetworkLog(simLog) {
    var ref;
    return simLog.subsystem === "com.apple.network" || simLog.category === "connection" || ((ref = simLog.source) == null ? void 0 : ref.image) === "CFNetwork";
}
function isReactLog(simLog) {
    var ref;
    return simLog.subsystem === "com.facebook.react.log" && ((ref = simLog.source) == null ? void 0 : ref.file) === "RCTLog.mm";
}
// It's not clear what these are but they aren't very useful.
// (The connection to service on pid 0 named com.apple.commcenter.coretelephony.xpc was invalidated)
// We can add them later if need.
function isCoreTelephonyLog(simLog) {
    // [CoreTelephony] Updating selectors failed with: Error Domain=NSCocoaErrorDomain Code=4099
    // "The connection to service on pid 0 named com.apple.commcenter.coretelephony.xpc was invalidated." UserInfo={NSDebugDescription=The connection to service on pid 0 named com.apple.commcenter.coretelephony.xpc was invalidated.}
    return simLog.subsystem === "com.apple.CoreTelephony";
}
// https://stackoverflow.com/a/65313219/4047926
function isWebKitLog(simLog) {
    // [WebKit] 0x1143ca500 - ProcessAssertion: Failed to acquire RBS Background assertion 'WebProcess Background Assertion' for process with PID 27084, error: Error Domain=RBSAssertionErrorDomain Code=3 "Target is not running or required target
    // entitlement is missing" UserInfo={RBSAssertionAttribute=<RBSDomainAttribute| domain:"com.apple.webkit" name:"Background" sourceEnvironment:"(null)">, NSLocalizedFailureReason=Target is not running or required target entitlement is missing}
    return simLog.subsystem === "com.apple.WebKit";
}
// Similar to WebKit logs
function isRunningBoardServicesLog(simLog) {
    // [RunningBoardServices] Error acquiring assertion: <Error Domain=RBSAssertionErrorDomain Code=3 "Target is not running or required target entitlement is missing" UserInfo={RBSAssertionAttribute=<RBSDomainAttribute| domain:"com.apple.webkit"
    // name:"Background" sourceEnvironment:"(null)">, NSLocalizedFailureReason=Target is not running or required target entitlement is missing}>
    return simLog.subsystem === "com.apple.runningboard";
}
function formatMessage(simLog) {
    var ref;
    var ref3;
    // TODO: Maybe change "TCC" to "Consent" or "System".
    const category = _chalk.default.gray(`[${(ref3 = (ref = simLog.source) == null ? void 0 : ref.image) != null ? ref3 : simLog.subsystem}]`);
    const message = simLog.eventMessage;
    return (0, _wrapAnsi).default(category + " " + message, process.stdout.columns || 80);
}
function onMessage(simLog) {
    let hasLogged = false;
    if (simLog.messageType === "Error") {
        if (// Hide all networking errors which are mostly useless.
        !isNetworkLog(simLog) && // Showing React errors will result in duplicate messages.
        !isReactLog(simLog) && !isCoreTelephonyLog(simLog) && !isWebKitLog(simLog) && !isRunningBoardServicesLog(simLog)) {
            hasLogged = true;
            // Sim: This app has crashed because it attempted to access privacy-sensitive data without a usage description.  The app's Info.plist must contain an NSCameraUsageDescription key with a string value explaining to the user how the app uses this data.
            Log.error(formatMessage(simLog));
        }
    } else if (simLog.eventMessage) {
        var ref;
        // If the source has a file (i.e. not a system log).
        if (((ref = simLog.source) == null ? void 0 : ref.file) || simLog.eventMessage.includes("Terminating app due to uncaught exception")) {
            hasLogged = true;
            Log.log(formatMessage(simLog));
        }
    }
    if (!hasLogged) {
        Log.debug(formatMessage(simLog));
    } else {
    // console.log('DATA:', JSON.stringify(simLog));
    }
}
/**
 *
 * @param udid
 * @param bundleIdentifier
 * @returns Image name like `Exponent` and `null` when the app is not installed on the provided simulator.
 */ async function getImageNameFromBundleIdentifierAsync(udid, bundleIdentifier) {
    const containerPath = await (0, _simctl).getContainerPathAsync({
        udid
    }, {
        appId: bundleIdentifier
    });
    if (containerPath) {
        return getImageNameFromContainerPath(containerPath);
    }
    return null;
}
function getImageNameFromContainerPath(binaryPath) {
    return _path.default.basename(binaryPath).split(".")[0];
}

//# sourceMappingURL=simctlLogging.js.map