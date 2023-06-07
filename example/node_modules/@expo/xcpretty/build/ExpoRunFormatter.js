"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpoRunFormatter = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Formatter_1 = require("./Formatter");
const MetroParser_1 = require("./MetroParser");
const PodfileTracer_1 = require("./utils/PodfileTracer");
const parsePodfileLock_1 = require("./utils/parsePodfileLock");
const symbols_1 = require("./utils/symbols");
/**
 * A superset of `Formatter` which adds support for Metro build errors and cleaner formatting for Node projects.
 */
class ExpoRunFormatter extends Formatter_1.Formatter {
    constructor(props) {
        var _a;
        super(props);
        this.props = props;
        let podfile = {};
        const podfileLock = path_1.default.join(props.projectRoot, 'ios', 'Podfile.lock');
        try {
            const podfileContents = fs_1.default.readFileSync(podfileLock, 'utf8');
            podfile = (_a = parsePodfileLock_1.parsePodfileLock(podfileContents)) !== null && _a !== void 0 ? _a : {};
        }
        catch { }
        this.podfileTracer = new PodfileTracer_1.PodfileTracer({
            ...props,
            podfile,
        });
    }
    static create(projectRoot, { xcodeProject, isDebug, } = {}) {
        var _a;
        const appName = ((_a = xcodeProject === null || xcodeProject === void 0 ? void 0 : xcodeProject.name.match(/.*\/(.*)\.\w+/)) === null || _a === void 0 ? void 0 : _a[1]) || '';
        const formatter = new ExpoRunFormatter({
            projectRoot,
            appName,
            isDebug,
        });
        return formatter;
    }
    get parser() {
        if (this._parser) {
            return this._parser;
        }
        this._parser = new MetroParser_1.MetroParser(this);
        return this._parser;
    }
    formatMetroAssetCollectionError(errorContents) {
        const results = `\n${chalk_1.default.red(symbols_1.ERROR +
            // Provide proper attribution.
            'Metro encountered an error:\n' +
            errorContents)}\nLearn more: https://docs.expo.dev/build-reference/troubleshooting\n`;
        this.errors.push(results);
        return results;
    }
    shouldShowCompileWarning(filePath, lineNumber, columnNumber) {
        if (this.props.isDebug) {
            return true;
        }
        return (!filePath.match(/node_modules/) &&
            !filePath.match(/\/ios\/Pods\//) &&
            // Don't show warnings in the generated build folder.
            !Formatter_1.Formatter.getAppRoot(filePath));
    }
    getNodeModuleName(filePath, target) {
        const results = this.podfileTracer.getNodeModuleName(filePath, target);
        return (results === null || results === void 0 ? void 0 : results.name) ? chalk_1.default.cyan(results.name) : null;
    }
    formatFileOperation(props) {
        const title = this.getFileOperationTitle(props.type);
        const moduleNameTag = this.getNodeModuleName(props.filePath, props.target);
        return Formatter_1.Formatter.format(title, [moduleNameTag, Formatter_1.Formatter.formatBreadCrumb(props.fileName, props.target, props.project)]
            .filter(Boolean)
            .join(' '));
    }
    formatCopy({ from, to, target }) {
        let relativeFile = Formatter_1.Formatter.relativePath(this.props.projectRoot, from);
        // If the relative file reaches outside of the project root, we
        // should attempt to resolve relative to the app output directory.
        if (relativeFile.startsWith('../../')) {
            const appFileRoot = Formatter_1.Formatter.getAppRoot(from);
            relativeFile = Formatter_1.Formatter.highlightLastPathComponent(Formatter_1.Formatter.relativePath(appFileRoot, from));
        }
        const appFileRoot = Formatter_1.Formatter.getAppRoot(to);
        const relativeAppFile = Formatter_1.Formatter.highlightLastPathComponent(Formatter_1.Formatter.relativePath(appFileRoot, to));
        const moduleNameTag = this.getNodeModuleName('', target);
        return Formatter_1.Formatter.format('Copying  ', [moduleNameTag, [relativeFile, relativeAppFile].join(' ➜ ')].filter(Boolean).join(' '));
    }
    formatPhaseScriptExecution(scriptName, target, project) {
        const moduleNameTag = this.getNodeModuleName('', target);
        if (scriptName === 'Start Packager') {
            const port = process.env.RCT_METRO_PORT || '8081';
            const isDisabled = isTruthy(process.env.RCT_NO_LAUNCH_PACKAGER);
            const status = isDisabled ? 'disabled' : `http://localhost:${port}`;
            // Add some insight into if the bundler was started or not, and which port was used.
            if (isDisabled) {
                scriptName = chalk_1.default.gray(`${scriptName} (disabled)`);
            }
            else {
                scriptName = scriptName + chalk_1.default.gray(` on ${status}`);
            }
        }
        return Formatter_1.Formatter.format('Executing', [moduleNameTag, Formatter_1.Formatter.formatBreadCrumb(scriptName, target, project)]
            .filter(Boolean)
            .join(' '));
    }
}
exports.ExpoRunFormatter = ExpoRunFormatter;
function isTruthy(value) {
    return value === 'true' || value === 1 || value === '1';
}
//# sourceMappingURL=ExpoRunFormatter.js.map