"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFreePortAsync = getFreePortAsync;
exports.choosePortAsync = choosePortAsync;
exports.resolvePortAsync = resolvePortAsync;
var _chalk = _interopRequireDefault(require("chalk"));
var _freeportAsync = _interopRequireDefault(require("freeport-async"));
var Log = _interopRequireWildcard(require("../log"));
var _env = require("./env");
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
async function getFreePortAsync(rangeStart) {
    const port = await (0, _freeportAsync).default(rangeStart, {
        hostnames: [
            null,
            "localhost"
        ]
    });
    if (!port) {
        throw new _errors.CommandError("NO_PORT_FOUND", "No available port found");
    }
    return port;
}
async function choosePortAsync(projectRoot, { defaultPort , host , reuseExistingPort  }) {
    const [{ getRunningProcess  }, { confirmAsync  }, isRoot, Log1] = await Promise.all([
        Promise.resolve().then(function() {
            return _interopRequireWildcard(require("./getRunningProcess"));
        }),
        Promise.resolve().then(function() {
            return _interopRequireWildcard(require("./prompts"));
        }),
        Promise.resolve().then(function() {
            return _interopRequireWildcard(require("is-root"));
        }),
        Promise.resolve().then(function() {
            return _interopRequireWildcard(require("../log"));
        }), 
    ]);
    try {
        const port = await (0, _freeportAsync).default(defaultPort, {
            hostnames: [
                host != null ? host : null
            ]
        });
        if (port === defaultPort) {
            return port;
        }
        const isRestricted = process.platform !== "win32" && defaultPort < 1024 && !isRoot.default();
        let message = isRestricted ? `Admin permissions are required to run a server on a port below 1024` : `Port ${_chalk.default.bold(defaultPort)} is`;
        const runningProcess = isRestricted ? null : getRunningProcess(defaultPort);
        if (runningProcess) {
            const pidTag = _chalk.default.gray(`(pid ${runningProcess.pid})`);
            if (runningProcess.directory === projectRoot) {
                message += ` running this app in another window`;
                if (reuseExistingPort) {
                    return null;
                }
            } else {
                message += ` running ${_chalk.default.cyan(runningProcess.command)} in another window`;
            }
            message += "\n" + _chalk.default.gray(`  ${runningProcess.directory} ${pidTag}`);
        }
        Log1.log(`\u203A ${message}`);
        const change = await confirmAsync({
            message: `Use port ${port} instead?`,
            initial: true
        });
        return change ? port : null;
    } catch (error) {
        if (error.code === "ABORTED") {
            throw error;
        } else if (error.code === "NON_INTERACTIVE") {
            Log1.warn(_chalk.default.yellow(error.message));
            return null;
        }
        throw error;
    }
}
async function resolvePortAsync(projectRoot, { /** Should opt to reuse a port that is running the same project in another window. */ reuseExistingPort , /** Preferred port. */ defaultPort , /** Backup port for when the default isn't available. */ fallbackPort  } = {}) {
    let port;
    if (typeof defaultPort === "string") {
        port = parseInt(defaultPort, 10);
    } else if (typeof defaultPort === "number") {
        port = defaultPort;
    } else {
        port = _env.env.RCT_METRO_PORT || fallbackPort || 8081;
    }
    // Only check the port when the bundler is running.
    const resolvedPort = await choosePortAsync(projectRoot, {
        defaultPort: port,
        reuseExistingPort
    });
    if (resolvedPort == null) {
        Log.log("\u203A Skipping dev server");
    // Skip bundling if the port is null
    } else {
        // Use the new or resolved port
        process.env.RCT_METRO_PORT = String(resolvedPort);
    }
    return resolvedPort;
}

//# sourceMappingURL=port.js.map