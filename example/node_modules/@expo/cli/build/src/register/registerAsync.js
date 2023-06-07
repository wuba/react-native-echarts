"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerAsync = registerAsync;
var _betterOpn = _interopRequireDefault(require("better-opn"));
var _errors = require("../utils/errors");
var _interactive = require("../utils/interactive");
var _link = require("../utils/link");
var _ora = require("../utils/ora");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function registerAsync() {
    if (!(0, _interactive).isInteractive()) {
        throw new _errors.CommandError("NON_INTERACTIVE", `Cannot register an account in CI. Use the EXPO_TOKEN environment variable to authenticate in CI (${(0, _link).learnMore("https://docs.expo.dev/accounts/programmatic-access/")})`);
    }
    const registrationUrl = `https://expo.dev/signup`;
    const failedMessage = `Unable to open a web browser. Register an account at: ${registrationUrl}`;
    const spinner = (0, _ora).ora(`Opening ${registrationUrl}`).start();
    try {
        const opened = await (0, _betterOpn).default(registrationUrl);
        if (opened) {
            spinner.succeed(`Opened ${registrationUrl}`);
        } else {
            spinner.fail(failedMessage);
        }
        return;
    } catch (error) {
        spinner.fail(failedMessage);
        throw error;
    }
}

//# sourceMappingURL=registerAsync.js.map