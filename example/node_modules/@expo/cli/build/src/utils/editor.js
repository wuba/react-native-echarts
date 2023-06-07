"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.guessEditor = guessEditor;
exports.openInEditorAsync = openInEditorAsync;
var _spawnAsync = _interopRequireDefault(require("@expo/spawn-async"));
var _envEditor = _interopRequireDefault(require("env-editor"));
var Log = _interopRequireWildcard(require("../log"));
var _env = require("./env");
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
const debug = require("debug")("expo:utils:editor");
function guessEditor() {
    try {
        const editor = _env.env.EXPO_EDITOR;
        if (editor) {
            debug("Using $EXPO_EDITOR:", editor);
            return _envEditor.default.getEditor(editor);
        }
        debug("Falling back on $EDITOR:", editor);
        return _envEditor.default.defaultEditor();
    } catch  {
        debug("Falling back on vscode");
        return _envEditor.default.getEditor("vscode");
    }
}
async function openInEditorAsync(path) {
    const editor = guessEditor();
    debug(`Opening ${path} in ${editor == null ? void 0 : editor.name} (bin: ${editor == null ? void 0 : editor.binary}, id: ${editor == null ? void 0 : editor.id})`);
    if (editor) {
        try {
            await (0, _spawnAsync).default(editor.binary, [
                path
            ]);
            return true;
        } catch (error) {
            debug(`Failed to auto open path in editor (path: ${path}, binary: ${editor.binary}):`, error);
        }
    }
    Log.error('Could not open editor, you can set it by defining the $EDITOR environment variable with the binary of your editor. (e.g. "vscode" or "atom")');
    return false;
}

//# sourceMappingURL=editor.js.map