"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getResolvedLocalesAsync = getResolvedLocalesAsync;
var _jsonFile = _interopRequireDefault(require("@expo/json-file"));
var _path = _interopRequireDefault(require("path"));
var _errors = require("../utils/errors");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function getResolvedLocalesAsync(projectRoot, exp) {
    if (!exp.locales) {
        return {};
    }
    const locales = {};
    for (const [lang, localeJsonPath] of Object.entries(exp.locales)){
        if (typeof localeJsonPath === "string") {
            try {
                locales[lang] = await _jsonFile.default.readAsync(_path.default.join(projectRoot, localeJsonPath));
            } catch (error) {
                throw new _errors.CommandError("EXPO_CONFIG", JSON.stringify(error));
            }
        } else {
            // In the off chance that someone defined the locales json in the config, pass it directly to the object.
            // We do this to make the types more elegant.
            locales[lang] = localeJsonPath;
        }
    }
    return locales;
}

//# sourceMappingURL=getResolvedLocales.js.map