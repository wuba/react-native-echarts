"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logDeviceArgument = logDeviceArgument;
exports.logProjectLogsLocation = logProjectLogsLocation;
var _chalk = _interopRequireDefault(require("chalk"));
var _log = require("../log");
var _interactive = require("../utils/interactive");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function logDeviceArgument(id) {
    _log.Log.log(_chalk.default.dim`› Using --device ${id}`);
}
function logProjectLogsLocation() {
    _log.Log.log(_chalk.default`\n› Logs for your project will appear below.${(0, _interactive).isInteractive() ? _chalk.default.dim(` Press Ctrl+C to exit.`) : ""}`);
}

//# sourceMappingURL=hints.js.map