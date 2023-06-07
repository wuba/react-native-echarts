"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatUsingNodeStandardLibraryError = formatUsingNodeStandardLibraryError;
exports.isNodeStdLibraryModule = isNodeStdLibraryModule;
exports.stripMetroInfo = stripMetroInfo;
var _chalk = _interopRequireDefault(require("chalk"));
var _path = _interopRequireDefault(require("path"));
var _link = require("../../../utils/link");
var _terminalReporter = require("./TerminalReporter");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const MAX_PROGRESS_BAR_CHAR_WIDTH = 16;
const DARK_BLOCK_CHAR = "\u2593";
const LIGHT_BLOCK_CHAR = "\u2591";
class MetroTerminalReporter extends _terminalReporter.TerminalReporter {
    constructor(projectRoot, terminal){
        super(terminal);
        this.projectRoot = projectRoot;
    }
    // Used for testing
    _getElapsedTime(startTime) {
        return Date.now() - startTime;
    }
    /**
   * Extends the bundle progress to include the current platform that we're bundling.
   *
   * @returns `iOS path/to/bundle.js ▓▓▓▓▓░░░░░░░░░░░ 36.6% (4790/7922)`
   */ _getBundleStatusMessage(progress, phase) {
        const platform = getPlatformTagForBuildDetails(progress.bundleDetails);
        const inProgress = phase === "in_progress";
        if (!inProgress) {
            const status = phase === "done" ? `Bundling complete ` : `Bundling failed `;
            const color = phase === "done" ? _chalk.default.green : _chalk.default.red;
            const startTime = this._bundleTimers.get(progress.bundleDetails.buildID);
            const time = startTime != null ? _chalk.default.dim(this._getElapsedTime(startTime) + "ms") : "";
            // iOS Bundling complete 150ms
            return color(platform + status) + time;
        }
        const localPath = _path.default.relative(".", progress.bundleDetails.entryFile);
        const filledBar = Math.floor(progress.ratio * MAX_PROGRESS_BAR_CHAR_WIDTH);
        const _progress = inProgress ? _chalk.default.green.bgGreen(DARK_BLOCK_CHAR.repeat(filledBar)) + _chalk.default.bgWhite.white(LIGHT_BLOCK_CHAR.repeat(MAX_PROGRESS_BAR_CHAR_WIDTH - filledBar)) + _chalk.default.bold(` ${(100 * progress.ratio).toFixed(1).padStart(4)}% `) + _chalk.default.dim(`(${progress.transformedFileCount.toString().padStart(progress.totalFileCount.toString().length)}/${progress.totalFileCount})`) : "";
        return platform + _chalk.default.reset.dim(`${_path.default.dirname(localPath)}/`) + _chalk.default.bold(_path.default.basename(localPath)) + " " + _progress;
    }
    _logInitializing(port, hasReducedPerformance) {
        // Don't print a giant logo...
        this.terminal.log("Starting Metro Bundler");
    }
    shouldFilterClientLog(event) {
        return isAppRegistryStartupMessage(event.data);
    }
    /** Print the cache clear message. */ transformCacheReset() {
        (0, _terminalReporter).logWarning(this.terminal, _chalk.default`Bundler cache is empty, rebuilding {dim (this may take a minute)}`);
    }
    /** One of the first logs that will be printed */ dependencyGraphLoading(hasReducedPerformance) {
        // this.terminal.log('Dependency graph is loading...');
        if (hasReducedPerformance) {
            // Extends https://github.com/facebook/metro/blob/347b1d7ed87995d7951aaa9fd597c04b06013dac/packages/metro/src/lib/TerminalReporter.js#L283-L290
            this.terminal.log(_chalk.default.red([
                "Metro is operating with reduced performance.",
                "Please fix the problem above and restart Metro.", 
            ].join("\n")));
        }
    }
    _logBundlingError(error) {
        const moduleResolutionError = formatUsingNodeStandardLibraryError(this.projectRoot, error);
        if (moduleResolutionError) {
            return this.terminal.log(maybeAppendCodeFrame(moduleResolutionError, error.message));
        }
        return super._logBundlingError(error);
    }
}
exports.MetroTerminalReporter = MetroTerminalReporter;
function formatUsingNodeStandardLibraryError(projectRoot, error) {
    if (!error.message) {
        return null;
    }
    const { targetModuleName , originModulePath  } = error;
    if (!targetModuleName || !originModulePath) {
        return null;
    }
    const relativePath = _path.default.relative(projectRoot, originModulePath);
    const DOCS_PAGE_URL = "https://docs.expo.dev/workflow/using-libraries/#using-third-party-libraries";
    if (isNodeStdLibraryModule(targetModuleName)) {
        if (originModulePath.includes("node_modules")) {
            return [
                `The package at "${_chalk.default.bold(relativePath)}" attempted to import the Node standard library module "${_chalk.default.bold(targetModuleName)}".`,
                `It failed because the native React runtime does not include the Node standard library.`,
                (0, _link).learnMore(DOCS_PAGE_URL), 
            ].join("\n");
        } else {
            return [
                `You attempted attempted to import the Node standard library module "${_chalk.default.bold(targetModuleName)}" from "${_chalk.default.bold(relativePath)}".`,
                `It failed because the native React runtime does not include the Node standard library.`,
                (0, _link).learnMore(DOCS_PAGE_URL), 
            ].join("\n");
        }
    }
    return `Unable to resolve "${targetModuleName}" from "${relativePath}"`;
}
function isNodeStdLibraryModule(moduleName) {
    return /^node:/.test(moduleName) || NODE_STDLIB_MODULES.includes(moduleName);
}
/** If the code frame can be found then append it to the existing message.  */ function maybeAppendCodeFrame(message, rawMessage) {
    const codeFrame = stripMetroInfo(rawMessage);
    if (codeFrame) {
        message += "\n" + codeFrame;
    }
    return message;
}
function stripMetroInfo(errorMessage) {
    // Newer versions of Metro don't include the list.
    if (!errorMessage.includes("4. Remove the cache")) {
        return null;
    }
    const lines = errorMessage.split("\n");
    const index = lines.findIndex((line)=>line.includes("4. Remove the cache")
    );
    if (index === -1) {
        return null;
    }
    return lines.slice(index + 1).join("\n");
}
/** @returns if the message matches the initial startup log */ function isAppRegistryStartupMessage(body) {
    return body.length === 1 && (/^Running application "main" with appParams:/.test(body[0]) || /^Running "main" with \{/.test(body[0]));
}
/** @returns platform specific tag for a `BundleDetails` object */ function getPlatformTagForBuildDetails(bundleDetails) {
    var ref;
    const platform = (ref = bundleDetails == null ? void 0 : bundleDetails.platform) != null ? ref : null;
    if (platform) {
        const formatted = {
            ios: "iOS",
            android: "Android",
            web: "Web"
        }[platform] || platform;
        return `${_chalk.default.bold(formatted)} `;
    }
    return "";
}
// A list of the Node.js standard library modules.
const NODE_STDLIB_MODULES = [
    "assert",
    "async_hooks",
    "buffer",
    "child_process",
    "cluster",
    "crypto",
    "dgram",
    "dns",
    "domain",
    "events",
    "fs",
    "fs/promises",
    "http",
    "https",
    "net",
    "os",
    "path",
    "punycode",
    "querystring",
    "readline",
    "repl",
    "stream",
    "string_decoder",
    "tls",
    "tty",
    "url",
    "util",
    "v8",
    "vm",
    "zlib", 
];

//# sourceMappingURL=MetroTerminalReporter.js.map