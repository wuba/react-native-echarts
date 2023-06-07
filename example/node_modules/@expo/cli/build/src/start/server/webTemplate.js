"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createTemplateHtmlFromExpoConfigAsync = createTemplateHtmlFromExpoConfigAsync;
exports.createTemplateHtmlAsync = createTemplateHtmlAsync;
var _config = require("@expo/config");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _templates = require("../../customize/templates");
var _env = require("../../utils/env");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function createTemplateHtmlFromExpoConfigAsync(projectRoot, { scripts , exp =(0, _config).getConfig(projectRoot, {
    skipSDKVersionRequirement: true
}).exp  }) {
    var ref, ref1, ref2;
    var ref3, _webName;
    return createTemplateHtmlAsync(projectRoot, {
        langIsoCode: (ref3 = (ref = exp.web) == null ? void 0 : ref.lang) != null ? ref3 : "en",
        scripts,
        title: (_webName = (0, _config).getNameFromConfig(exp).webName) != null ? _webName : "Expo App",
        description: (ref1 = exp.web) == null ? void 0 : ref1.description,
        themeColor: (ref2 = exp.web) == null ? void 0 : ref2.themeColor
    });
}
function getFileFromLocalPublicFolder(projectRoot, { publicFolder , filePath  }) {
    const localFilePath = _path.default.resolve(projectRoot, publicFolder, filePath);
    if (!_fs.default.existsSync(localFilePath)) {
        return null;
    }
    return localFilePath;
}
/** Attempt to read the `index.html` from the local project before falling back on the template `index.html`. */ async function getTemplateIndexHtmlAsync(projectRoot) {
    let filePath = getFileFromLocalPublicFolder(projectRoot, {
        // TODO: Maybe use the app.json override.
        publicFolder: _env.env.EXPO_PUBLIC_FOLDER,
        filePath: "index.html"
    });
    if (!filePath) {
        filePath = _templates.TEMPLATES.find((value)=>value.id === "index.html"
        ).file(projectRoot);
    }
    return _fs.default.promises.readFile(filePath, "utf8");
}
async function createTemplateHtmlAsync(projectRoot, { scripts , description , langIsoCode , title , themeColor  }) {
    // Resolve the best possible index.html template file.
    let contents = await getTemplateIndexHtmlAsync(projectRoot);
    contents = contents.replace("%LANG_ISO_CODE%", langIsoCode);
    contents = contents.replace("%WEB_TITLE%", title);
    contents = contents.replace("</body>", scripts.map((url)=>`<script src="${url}"></script>`
    ).join("") + "</body>");
    if (themeColor) {
        contents = addMeta(contents, `name="theme-color" content="${themeColor}"`);
    }
    if (description) {
        contents = addMeta(contents, `name="description" content="${description}"`);
    }
    return contents;
}
/** Add a `<meta />` tag to the `<head />` element. */ function addMeta(contents, meta) {
    return contents.replace("</head>", `<meta ${meta}>\n</head>`);
}

//# sourceMappingURL=webTemplate.js.map