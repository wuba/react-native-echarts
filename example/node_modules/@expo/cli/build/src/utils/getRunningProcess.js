"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPID = getPID;
exports.getDirectoryOfProcessById = getDirectoryOfProcessById;
exports.getRunningProcess = getRunningProcess;
var _childProcess = require("child_process");
var path = _interopRequireWildcard(require("path"));
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
const debug = require("debug")("expo:utils:getRunningProcess");
const defaultOptions = {
    encoding: "utf8",
    stdio: [
        "pipe",
        "pipe",
        "ignore"
    ]
};
function getPID(port) {
    try {
        const results = (0, _childProcess).execFileSync("lsof", [
            `-i:${port}`,
            "-P",
            "-t",
            "-sTCP:LISTEN"
        ], defaultOptions).split("\n")[0].trim();
        const pid = Number(results);
        debug(`pid: ${pid} for port: ${port}`);
        return pid;
    } catch (error) {
        debug(`No pid found for port: ${port}. Error: ${error}`);
        return null;
    }
}
/** Get `package.json` `name` field for a given directory. Returns `null` if none exist. */ function getPackageName(packageRoot) {
    const packageJson = path.join(packageRoot, "package.json");
    try {
        return require(packageJson).name || null;
    } catch  {
        return null;
    }
}
/** Returns a command like `node /Users/evanbacon/.../bin/expo start` or the package.json name. */ function getProcessCommand(pid, procDirectory) {
    const name = getPackageName(procDirectory);
    if (name) {
        return name;
    }
    return (0, _childProcess).execSync(`ps -o command -p ${pid} | sed -n 2p`, defaultOptions).replace(/\n$/, "").trim();
}
function getDirectoryOfProcessById(processId) {
    return (0, _childProcess).execSync(`lsof -p ${processId} | awk '$4=="cwd" {for (i=9; i<=NF; i++) printf "%s ", $i}'`, defaultOptions).trim();
}
function getRunningProcess(port) {
    // 63828
    const pid = getPID(port);
    if (!pid) {
        return null;
    }
    try {
        // /Users/evanbacon/Documents/GitHub/lab/myapp
        const directory = getDirectoryOfProcessById(pid);
        // /Users/evanbacon/Documents/GitHub/lab/myapp/package.json
        const command = getProcessCommand(pid, directory);
        // TODO: Have a better message for reusing another process.
        return {
            pid,
            directory,
            command
        };
    } catch  {
        return null;
    }
}

//# sourceMappingURL=getRunningProcess.js.map