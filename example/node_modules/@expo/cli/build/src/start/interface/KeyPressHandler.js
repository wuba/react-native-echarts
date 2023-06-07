"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var Log = _interopRequireWildcard(require("../../log"));
var _errors = require("../../utils/errors");
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
const CTRL_C = "\x03";
const debug = require("debug")("expo:start:interface:keyPressHandler");
class KeyPressHandler {
    constructor(onPress){
        this.onPress = onPress;
        this.isInterceptingKeyStrokes = false;
        this.isHandlingKeyPress = false;
        this.handleKeypress = async (key)=>{
            // Prevent sending another event until the previous event has finished.
            if (this.isHandlingKeyPress && key !== CTRL_C) {
                return;
            }
            this.isHandlingKeyPress = true;
            try {
                debug(`Key pressed: ${key}`);
                await this.onPress(key);
            } catch (error) {
                await (0, _errors).logCmdError(error);
            } finally{
                this.isHandlingKeyPress = false;
            }
        };
    }
    /** Start observing interaction pause listeners. */ createInteractionListener() {
        // Support observing prompts.
        let wasIntercepting = false;
        const listener = ({ pause  })=>{
            if (pause) {
                // Track if we were already intercepting key strokes before pausing, so we can
                // resume after pausing.
                wasIntercepting = this.isInterceptingKeyStrokes;
                this.stopInterceptingKeyStrokes();
            } else if (wasIntercepting) {
                // Only start if we were previously intercepting.
                this.startInterceptingKeyStrokes();
            }
        };
        return listener;
    }
    /** Start intercepting all key strokes and passing them to the input `onPress` method. */ startInterceptingKeyStrokes() {
        if (this.isInterceptingKeyStrokes) {
            return;
        }
        this.isInterceptingKeyStrokes = true;
        const { stdin  } = process;
        // TODO: This might be here because of an old Node version.
        if (!stdin.setRawMode) {
            Log.warn("Using a non-interactive terminal, keyboard commands are disabled.");
            return;
        }
        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding("utf8");
        stdin.on("data", this.handleKeypress);
    }
    /** Stop intercepting all key strokes. */ stopInterceptingKeyStrokes() {
        if (!this.isInterceptingKeyStrokes) {
            return;
        }
        this.isInterceptingKeyStrokes = false;
        const { stdin  } = process;
        stdin.removeListener("data", this.handleKeypress);
        // TODO: This might be here because of an old Node version.
        if (!stdin.setRawMode) {
            Log.warn("Using a non-interactive terminal, keyboard commands are disabled.");
            return;
        }
        stdin.setRawMode(false);
        stdin.resume();
    }
}
exports.KeyPressHandler = KeyPressHandler;

//# sourceMappingURL=KeyPressHandler.js.map