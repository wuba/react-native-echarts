"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PromptType", {
    enumerable: true,
    get: function() {
        return _prompts.PromptType;
    }
});
exports.default = prompt;
exports.confirmAsync = confirmAsync;
exports.selectAsync = selectAsync;
exports.addInteractionListener = addInteractionListener;
exports.removeInteractionListener = removeInteractionListener;
exports.pauseInteractions = pauseInteractions;
exports.resumeInteractions = resumeInteractions;
exports.createSelectionFilter = createSelectionFilter;
exports.promptAsync = void 0;
var _assert = _interopRequireDefault(require("assert"));
var _prompts = _interopRequireWildcard(require("prompts"));
var _errors = require("./errors");
var _interactive = require("./interactive");
async function prompt(questions, { nonInteractiveHelp , ...options } = {}) {
    questions = Array.isArray(questions) ? questions : [
        questions
    ];
    if (!(0, _interactive).isInteractive() && questions.length !== 0) {
        let message = `Input is required, but 'npx expo' is in non-interactive mode.\n`;
        if (nonInteractiveHelp) {
            message += nonInteractiveHelp;
        } else {
            const question = questions[0];
            const questionMessage = typeof question.message === "function" ? question.message(undefined, {}, question) : question.message;
            message += `Required input:\n${(questionMessage || "").trim().replace(/^/gm, "> ")}`;
        }
        throw new _errors.CommandError("NON_INTERACTIVE", message);
    }
    pauseInteractions();
    try {
        const results = await (0, _prompts).default(questions, {
            onCancel () {
                throw new _errors.AbortCommandError();
            },
            ...options
        });
        return results;
    } finally{
        resumeInteractions();
    }
}
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
const debug = require("debug")("expo:utils:prompts");
/** Interaction observers for detecting when keystroke tracking should pause/resume. */ const listeners = [];
async function confirmAsync(questions, options) {
    const { value  } = await prompt({
        initial: true,
        ...questions,
        name: "value",
        type: "confirm"
    }, options);
    return value != null ? value : null;
}
async function selectAsync(message, choices, options) {
    const { value  } = await prompt({
        message,
        choices,
        name: "value",
        type: "select"
    }, options);
    return value != null ? value : null;
}
const promptAsync = prompt;
exports.promptAsync = promptAsync;
function addInteractionListener(callback) {
    listeners.push(callback);
}
function removeInteractionListener(callback) {
    const listenerIndex = listeners.findIndex((_callback)=>_callback === callback
    );
    (0, _assert).default(listenerIndex >= 0, "removeInteractionListener(): cannot remove an unregistered event listener.");
    listeners.splice(listenerIndex, 1);
}
function pauseInteractions(options = {}) {
    debug("Interaction observers paused");
    for (const listener of listeners){
        listener({
            pause: true,
            ...options
        });
    }
}
function resumeInteractions(options = {}) {
    debug("Interaction observers resumed");
    for (const listener of listeners){
        listener({
            pause: false,
            ...options
        });
    }
}
function createSelectionFilter() {
    function escapeRegex(string) {
        return string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    return async (input, choices)=>{
        try {
            const regex = new RegExp(escapeRegex(input), "i");
            return choices.filter((choice)=>regex.test(choice.title)
            );
        } catch (error) {
            debug("Error filtering choices", error);
            return [];
        }
    };
}

//# sourceMappingURL=prompts.js.map