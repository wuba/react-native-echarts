"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.activateWindowAsync = activateWindowAsync;
var osascript = _interopRequireWildcard(require("@expo/osascript"));
var _childProcess = require("child_process");
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
const debug = require("debug")("expo:start:platforms:android:activateWindow");
function getUnixPID(port) {
    var ref;
    // Runs like `lsof -i:8081 -P -t -sTCP:LISTEN`
    const args = [
        `-i:${port}`,
        "-P",
        "-t",
        "-sTCP:LISTEN"
    ];
    debug("lsof " + args.join(" "));
    return (ref = (0, _childProcess).execFileSync("lsof", args, {
        encoding: "utf8",
        stdio: [
            "pipe",
            "pipe",
            "ignore"
        ]
    }).split("\n")[0]) == null ? void 0 : ref.trim == null ? void 0 : ref.trim();
}
async function activateWindowAsync(device) {
    var ref;
    debug(`Activating window for device (pid: ${device.pid}, type: ${device.type})`);
    if (// only mac is supported for now.
    process.platform !== "darwin" || // can only focus emulators
    device.type !== "emulator") {
        return false;
    }
    // Google Emulator ID: `emulator-5554` -> `5554`
    const androidPid = (ref = device.pid.match(/-(\d+)/)) == null ? void 0 : ref[1];
    if (!androidPid) {
        return false;
    }
    // Unix PID
    const pid = getUnixPID(androidPid);
    if (!pid) {
        return false;
    }
    debug(`Activate window for pid:`, pid);
    try {
        await osascript.execAsync(`
    tell application "System Events"
      set frontmost of the first process whose unix id is ${pid} to true
    end tell`);
        return true;
    } catch  {
        // noop -- this feature is very specific and subject to failure.
        return false;
    }
}

//# sourceMappingURL=activateWindow.js.map