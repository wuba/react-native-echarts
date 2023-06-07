"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createTemporaryProjectFile = createTemporaryProjectFile;
exports.ensureDotExpoProjectDirectoryInitialized = ensureDotExpoProjectDirectoryInitialized;
var _jsonFile = _interopRequireDefault(require("@expo/json-file"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function createTemporaryProjectFile(fileName, defaults) {
    function getFile(projectRoot) {
        const dotExpoDir = ensureDotExpoProjectDirectoryInitialized(projectRoot);
        return new _jsonFile.default(_path.default.join(dotExpoDir, fileName));
    }
    async function readAsync(projectRoot) {
        let projectSettings;
        try {
            projectSettings = await getFile(projectRoot).readAsync();
        } catch  {
            projectSettings = await getFile(projectRoot).writeAsync(defaults);
        }
        // Set defaults for any missing fields
        return {
            ...defaults,
            ...projectSettings
        };
    }
    async function setAsync(projectRoot, json) {
        try {
            return await getFile(projectRoot).mergeAsync(json, {
                cantReadFileDefault: defaults
            });
        } catch  {
            return await getFile(projectRoot).writeAsync({
                ...defaults,
                ...json
            });
        }
    }
    return {
        getFile,
        readAsync,
        setAsync
    };
}
function getDotExpoProjectDirectory(projectRoot) {
    return _path.default.join(projectRoot, ".expo");
}
function ensureDotExpoProjectDirectoryInitialized(projectRoot) {
    const dirPath = getDotExpoProjectDirectory(projectRoot);
    _fs.default.mkdirSync(dirPath, {
        recursive: true
    });
    const readmeFilePath = _path.default.resolve(dirPath, "README.md");
    if (!_fs.default.existsSync(readmeFilePath)) {
        _fs.default.writeFileSync(readmeFilePath, `> Why do I have a folder named ".expo" in my project?
The ".expo" folder is created when an Expo project is started using "expo start" command.
> What do the files contain?
- "devices.json": contains information about devices that have recently opened this project. This is used to populate the "Development sessions" list in your development builds.
- "settings.json": contains the server configuration that is used to serve the application manifest.
> Should I commit the ".expo" folder?
No, you should not share the ".expo" folder. It does not contain any information that is relevant for other developers working on the project, it is specific to your machine.
Upon project creation, the ".expo" folder is already added to your ".gitignore" file.
`);
    }
    return dirPath;
}

//# sourceMappingURL=dotExpo.js.map