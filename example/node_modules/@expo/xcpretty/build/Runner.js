"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorLogFilePath = exports.writeBuildLogs = exports.createXcodeBuildHooks = exports.formatXcodeBuildPipeProcessAsync = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const ExpoRunFormatter_1 = require("./ExpoRunFormatter");
function formatXcodeBuildPipeProcessAsync(projectRoot, { xcodeProjectName } = {}) {
    return new Promise(async (resolve, reject) => {
        const hooks = createXcodeBuildHooks(projectRoot, { xcodeProjectName, resolve, reject });
        process.stdin.on('data', hooks.onData);
        process.stdin.on('end', () => {
            hooks.onEnd(0);
        });
    });
}
exports.formatXcodeBuildPipeProcessAsync = formatXcodeBuildPipeProcessAsync;
function createXcodeBuildHooks(projectRoot, { xcodeProjectName, resolve, reject, }) {
    const formatter = ExpoRunFormatter_1.ExpoRunFormatter.create(projectRoot, {
        xcodeProject: xcodeProjectName ? { name: xcodeProjectName } : undefined,
        isDebug: isTruthy(process.env.EXPO_DEBUG),
    });
    let buildOutput = '';
    let errorOutput = '';
    let currentBuffer = '';
    // Data can be sent in chunks that would have no relevance to our regex
    // this can cause massive slowdowns, so we need to ensure the data is complete before attempting to parse it.
    function flushBuffer() {
        if (!currentBuffer) {
            return;
        }
        const data = currentBuffer;
        currentBuffer = '';
        const lines = formatter.pipe(data);
        for (const line of lines) {
            console.log(line);
        }
    }
    const onData = (data) => {
        const stringData = data.toString();
        buildOutput += stringData;
        currentBuffer += stringData;
        if (currentBuffer.endsWith(os_1.default.EOL)) {
            flushBuffer();
        }
    };
    const onErr = (data) => {
        flushBuffer();
        const stringData = data instanceof Buffer ? data.toString() : data;
        errorOutput += stringData;
    };
    const onEnd = (code) => {
        flushBuffer();
        console.log(formatter.getBuildSummary());
        const logFilePath = writeBuildLogs(projectRoot, buildOutput, errorOutput);
        if (code !== 0) {
            // Determine if the logger found any errors;
            const wasErrorPresented = !!formatter.errors.length;
            const errorTitle = `Failed to build iOS project. "xcodebuild" exited with error code ${code}.`;
            if (wasErrorPresented) {
                // This has a flaw, if the user is missing a file, and there is a script error, only the missing file error will be shown.
                // They will only see the script error if they fix the missing file and rerun.
                // The flaw can be fixed by catching script errors in the custom logger.
                reject(new Error(errorTitle));
                return;
            }
            // Show all the log info because often times the error is coming from a shell script,
            // that invoked a node script, that started metro, which threw an error.
            reject(new Error(`${errorTitle}\nTo view more error logs, try building the app with Xcode directly, by opening ${'unknown'}.\n\n` +
                buildOutput +
                '\n\n' +
                errorOutput +
                `Build logs written to ${chalk_1.default.underline(logFilePath)}`));
            return;
        }
        resolve(buildOutput);
    };
    return { onData, onErr, onEnd };
}
exports.createXcodeBuildHooks = createXcodeBuildHooks;
function writeBuildLogs(projectRoot, buildOutput, errorOutput) {
    const [logFilePath, errorFilePath] = getErrorLogFilePath(projectRoot);
    fs_1.default.writeFileSync(logFilePath, buildOutput);
    fs_1.default.writeFileSync(errorFilePath, errorOutput);
    return logFilePath;
}
exports.writeBuildLogs = writeBuildLogs;
function getErrorLogFilePath(projectRoot) {
    const folder = path_1.default.join(projectRoot, '.expo');
    fs_1.default.mkdirSync(folder, { recursive: true });
    return [path_1.default.join(folder, 'xcodebuild.log'), path_1.default.join(folder, 'xcodebuild-error.log')];
}
exports.getErrorLogFilePath = getErrorLogFilePath;
function isTruthy(value) {
    const str = String(value).toLowerCase();
    return str === 'true' || str === '1';
}
//# sourceMappingURL=Runner.js.map