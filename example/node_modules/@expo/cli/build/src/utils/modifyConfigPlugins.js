"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.attemptAddingPluginsAsync = attemptAddingPluginsAsync;
var _config = require("@expo/config");
var Log = _interopRequireWildcard(require("../log"));
var _modifyConfigAsync = require("./modifyConfigAsync");
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
async function attemptAddingPluginsAsync(projectRoot, exp, plugins) {
    if (!plugins.length) return;
    const edits = {
        plugins: [
            ...new Set((exp.plugins || []).concat(plugins))
        ]
    };
    const modification = await (0, _config).modifyConfigAsync(projectRoot, edits, {
        skipSDKVersionRequirement: true,
        skipPlugins: true
    });
    if (modification.type === "success") {
        Log.log(`\u203A Added config plugin${plugins.length === 1 ? "" : "s"}: ${plugins.join(", ")}`);
    } else {
        const exactEdits = {
            plugins
        };
        (0, _modifyConfigAsync).warnAboutConfigAndThrow(modification.type, modification.message, exactEdits);
    }
}

//# sourceMappingURL=modifyConfigPlugins.js.map