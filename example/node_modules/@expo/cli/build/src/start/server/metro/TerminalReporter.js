"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logWarning = logWarning;
exports.logError = logError;
var _chalk = _interopRequireDefault(require("chalk"));
var _terminalReporter = _interopRequireDefault(require("metro/src/lib/TerminalReporter"));
var _util = _interopRequireDefault(require("util"));
var _ansi = require("../../../utils/ansi");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function logWarning(terminal, format, ...args) {
    const str = _util.default.format(format, ...args);
    terminal.log("%s: %s", _chalk.default.yellow("warning"), str);
}
function logError(terminal, format, ...args) {
    terminal.log("%s: %s", _chalk.default.red("error"), // Syntax errors may have colors applied for displaying code frames
    // in various places outside of where Metro is currently running.
    // If the current terminal does not support color, we'll strip the colors
    // here.
    _util.default.format(_chalk.default.supportsColor ? format : (0, _ansi).stripAnsi(format), ...args));
}
const XTerminalReporter = _terminalReporter.default;
class TerminalReporter extends XTerminalReporter {
    /**
   * A cache of { [buildID]: BundleDetails } which can be used to
   * add more contextual logs. BundleDetails is currently only sent with `bundle_build_started`
   * so we need to cache the details in order to print the platform info with other event types.
   */ _bundleDetails = new Map();
    /** Keep track of how long a bundle takes to complete */ _bundleTimers = new Map();
    _log(event) {
        switch(event.type){
            case "transform_cache_reset":
                return this.transformCacheReset();
            case "dep_graph_loading":
                return this.dependencyGraphLoading(event.hasReducedPerformance);
            case "client_log":
                if (this.shouldFilterClientLog(event)) {
                    return;
                }
                break;
        }
        return super._log(event);
    }
    /** Gives subclasses an easy interface for filtering out logs. Return `true` to skip. */ shouldFilterClientLog(event) {
        return false;
    }
    /** Cache has been reset. */ transformCacheReset() {}
    /** One of the first logs that will be printed. */ dependencyGraphLoading(hasReducedPerformance) {}
    /**
   * Custom log event representing the end of the bundling.
   *
   * @param event event object.
   * @param duration duration of the build in milliseconds.
   */ bundleBuildEnded(event, duration) {}
    /**
   * This function is exclusively concerned with updating the internal state.
   * No logging or status updates should be done at this point.
   */ _updateState(event) {
        // Append the buildID to the bundleDetails.
        if (event.bundleDetails) {
            event.bundleDetails.buildID = event.buildID;
        }
        super._updateState(event);
        switch(event.type){
            case "bundle_build_done":
            case "bundle_build_failed":
                {
                    const startTime = this._bundleTimers.get(event.buildID);
                    // Observed a bug in Metro where the `bundle_build_done` is invoked twice during a static bundle
                    // i.e. `expo export`.
                    if (startTime == null) {
                        break;
                    }
                    this.bundleBuildEnded(event, startTime ? Date.now() - startTime : 0);
                    this._bundleTimers.delete(event.buildID);
                    break;
                }
            case "bundle_build_started":
                this._bundleDetails.set(event.buildID, event.bundleDetails);
                this._bundleTimers.set(event.buildID, Date.now());
                break;
        }
    }
}
exports.TerminalReporter = TerminalReporter;

//# sourceMappingURL=TerminalReporter.js.map