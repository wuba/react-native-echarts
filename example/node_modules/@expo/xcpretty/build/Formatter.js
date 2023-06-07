"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formatter = void 0;
const code_frame_1 = require("@babel/code-frame");
const chalk_1 = __importDefault(require("chalk"));
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const Matchers_1 = require("./Matchers");
const Parser_1 = require("./Parser");
const switchRegex_1 = require("./switchRegex");
const symbols_1 = require("./utils/symbols");
var Status;
(function (Status) {
    Status["Pass"] = "pass";
    Status["Fail"] = "fail";
    Status["Pending"] = "pending";
    Status["Error"] = "error";
    Status["Completion"] = "completion";
    Status["Measure"] = "measure";
})(Status || (Status = {}));
function highlightLastPathComponent(filePath) {
    return chalk_1.default.dim(path.dirname(filePath) + '/') + path.basename(filePath);
}
function format(command, argumentText = '', success = true) {
    const symbol = statusSymbol(success ? Status.Completion : Status.Fail);
    return [symbol, chalk_1.default.bold(command), argumentText].join(' ').trim();
}
function formatTest(testCase, status) {
    return [statusSymbol(status), testCase].join(' ').trim();
}
function heading(prefix, text, description) {
    return [prefix, chalk_1.default.white(text), description].join(' ').trim();
}
function statusSymbol(status) {
    switch (status) {
        case Status.Pass:
            return chalk_1.default.green(symbols_1.PASS);
        case Status.Fail:
            return chalk_1.default.red(symbols_1.FAIL);
        case Status.Pending:
            return chalk_1.default.cyan(symbols_1.PENDING);
        case Status.Error:
            return chalk_1.default.red(symbols_1.ERROR);
        case Status.Completion:
            return chalk_1.default.white(symbols_1.COMPLETION);
        case Status.Measure:
            return chalk_1.default.magenta(symbols_1.MEASURE);
        default:
            return '';
    }
}
function coloredTime(time) {
    const flt = parseFloat(time);
    if (flt >= 0 && flt <= 0.025) {
        return time;
    }
    else if (flt >= 0.026 && flt <= 0.1) {
        return chalk_1.default.yellow(time);
    }
    return chalk_1.default.red(time);
}
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function relativePath(projectRoot, filePath) {
    return slash(path.relative(projectRoot, filePath));
}
function formatBreadCrumb(fileName, target, project) {
    // TODO: Simplify
    return [project === target ? project : [project, target].filter(Boolean).join(`/`), fileName]
        .filter(Boolean)
        .join(` ${symbols_1.BREADCRUMB} `);
}
function getAppRoot(filePath) {
    let appRoot = filePath;
    const isBuildFolder = (path) => /((Debug|Release)-[^/\s\d]*$)|(.app$)/.test(path);
    while (!isBuildFolder(appRoot) && appRoot.length > 1) {
        appRoot = path.dirname(appRoot);
    }
    return isBuildFolder(appRoot) ? appRoot : '';
}
class Formatter {
    constructor(props) {
        this.props = props;
        this.errors = [];
        this.warnings = [];
    }
    get parser() {
        if (this._parser) {
            return this._parser;
        }
        this._parser = new Parser_1.Parser(this);
        return this._parser;
    }
    pipe(data) {
        const lines = [];
        data.split(os.EOL).forEach(line => {
            const results = this.parser.parse(line);
            if (typeof results === 'string' && results.trim()) {
                lines.push(results);
            }
        });
        return lines;
    }
    dimConfiguration(configuration) {
        return chalk_1.default.dim(`(${configuration})`);
    }
    getTitleForConfigurationType(type) {
        switch (type) {
            case 'Clean':
                return 'Cleaning';
            case 'Aggregate':
                return 'Aggregate';
            case 'Analyze':
                return 'Analyzing';
            case 'Build':
                return 'Building';
            default:
                return 'Unknown';
        }
    }
    formatTarget(props) {
        return format(this.getTitleForConfigurationType(props.type), this.dimConfiguration(formatBreadCrumb(props.configuration, props.target, props.project)));
    }
    formatCopy({ from, to }) {
        const relativeFile = relativePath(this.props.projectRoot, from);
        const appFileRoot = getAppRoot(to);
        const relativeAppFile = relativePath(appFileRoot, to);
        return format('Copying  ', [relativeFile, relativeAppFile].join(' ➜ '));
    }
    getFileOperationTitle(type) {
        switch (type) {
            case 'Analyze':
                return 'Analyzing';
            case 'GenerateDSYMFile':
                return `Generating debug`;
            case 'Ld':
                return 'Linking  ';
            case 'Libtool':
                return 'Packaging';
            case 'ProcessPCH':
                return 'Precompiling';
            case 'ProcessInfoPlistFile':
                return 'Preparing';
            case 'CodeSign':
                return 'Signing  ';
            case 'Touch':
                return 'Creating ';
            case 'CompileC':
            case 'CompileSwift':
            case 'CompileXIB':
            case 'CompileStoryboard':
                return 'Compiling';
            default:
                // Unknown file operation
                return '';
        }
    }
    formatFileOperation(props) {
        const title = this.getFileOperationTitle(props.type);
        switch (props.type) {
            case 'Analyze':
                return format(title, formatBreadCrumb(props.fileName, props.target, props.project));
            case 'GenerateDSYMFile':
                return format(title, formatBreadCrumb(`'${props.fileName}'`, props.target, props.project));
            case 'Ld':
                return format(title, formatBreadCrumb(props.fileName, props.target, props.project));
            case 'Libtool':
                return format(title, formatBreadCrumb(props.fileName, props.target, props.project));
            case 'ProcessPCH':
                return format(title, formatBreadCrumb(props.fileName, props.target, props.project));
            case 'ProcessInfoPlistFile':
                return format(title, formatBreadCrumb(props.fileName, props.target, props.project));
            case 'CodeSign':
                return format(title, formatBreadCrumb(props.fileName, props.target, props.project));
            case 'Touch':
                return format(title, props.fileName);
            case 'CompileC':
            case 'CompileSwift':
            case 'CompileXIB':
            case 'CompileStoryboard':
                return format(title, formatBreadCrumb(props.fileName, props.target, props.project));
            default:
                // Unknown file operation
                return '';
        }
    }
    formatPhaseSuccess(phaseName, duration) {
        return format(capitalize(phaseName.toLowerCase()), `Succeeded${duration ? ` (${duration})` : ''}`, true);
    }
    formatPhaseScriptExecution(scriptName, target, project) {
        // TODO: Track (scriptName === '[CP] Copy XCFrameworks')
        return format('Executing', formatBreadCrumb(`'${scriptName}'`, target, project));
    }
    formatPreprocess(file) {
        return format('Preprocessing', file);
    }
    formatShellCommand(command, args) {
        return '';
    }
    formatCompileCommand(compilerCommand, filePath) {
        return '';
    }
    formatProcessPchCommand(filePath) {
        return '';
    }
    formatWriteFile(file) {
        return '';
    }
    formatOther(text) {
        return '';
    }
    formatSingleLineCompileIssue(type, filePathAndLocation, fileName, reason, target, project) {
        // Allow disabling this warning.
        const { filePath, lineNumber, columnNumber } = splitPathInfo(filePathAndLocation);
        if (type === 'warning') {
            if (!this.shouldShowCompileWarning(filePath, lineNumber, columnNumber)) {
                return '';
            }
        }
        // Prevent `/foo/bar:1:1` instead using `/foo/bar` since it's a bit more focused.
        const sanitizedFilePath = lineNumber === '1' && columnNumber === '1' ? filePath : filePathAndLocation;
        // Get the `Project/Target` prefix.
        const packageName = [project, target].join('/');
        // Choose a color.
        const color = type === 'warning' ? chalk_1.default.yellow : chalk_1.default.red;
        const platform = color.bold(`${packageName}:`);
        // Choose a symbol.
        const symbol = type === 'warning' ? symbols_1.WARNING : symbols_1.ERROR;
        // Get a more concise file path when the issue is inside the build folder.
        const appFileRoot = getAppRoot(sanitizedFilePath);
        const relativeAppFile = appFileRoot
            ? chalk_1.default.gray('[app]/') + relativePath(appFileRoot, sanitizedFilePath)
            : sanitizedFilePath;
        // Create the message.
        const results = chalk_1.default `${symbol} ${platform} ${reason.trim()}\n   {gray └─${relativeAppFile}}`;
        // Ensure we track the message
        if (type === 'warning') {
            this.warnings.push(results);
        }
        else {
            this.errors.push(results);
        }
        return results;
    }
    // These are like comments but for Xcode logs.
    formatRemark(msg) {
        return '';
    }
    formatEmitSwiftModule(type, arch, target, project) {
        return '';
    }
    formatCompileSwiftSources(type, arch, pkg, target, project) {
        return '';
    }
    formatCleanRemove(msg) {
        return '';
    }
    formatWriteAuxiliaryFiles(text) {
        return '';
    }
    formatTiffutil(file) {
        return format('Validating', file);
    }
    formatCheckDependencies(text) {
        return format('Check Dependencies');
    }
    formatWillNotBeCodeSigned(message) {
        const results = `${chalk_1.default.yellow(symbols_1.WARNING + ' ' + message)}`;
        this.warnings.push(results);
        return results;
    }
    // COMPILER / LINKER ERRORS AND WARNINGS
    /**
     *
     * @param fileName 'SampleTest.m',
     * @param filePathAndLocation '/Users/foo/bar.m:12:59',
     * @param reason 'expected identifier',
     * @param line '                [[thread should] equal:thread.];',
     * @param cursor '                                           ^'
     */
    formatCompileError(fileName, filePathAndLocation, reason, line, cursor) {
        const { filePath, lineNumber, columnNumber } = splitPathInfo(filePathAndLocation);
        const results = formatWarningOrError({
            isError: true,
            filePath,
            reason,
            cursor,
            lineText: line,
            lineNumber,
            columnNumber,
            projectRoot: this.props.projectRoot,
            maxWarningLineLength: this.props.maxWarningLineLength,
        });
        this.errors.push(results);
        return results;
    }
    formatError(message) {
        const results = switchRegex_1.switchRegex(message, [
            [
                Matchers_1.Matchers.Errors.UNSUPPORTED_ENTITLEMENT_MATCHER,
                ([, $1, $2, $3, $4, $5]) => {
                    return this.formatUnsupportedEntitlementError($1, $2, $3, $4, $5);
                },
            ],
            [null, () => this.formatGenericError(message)],
        ]);
        this.errors.push(results);
        return results;
    }
    /**
     * In: `error: Provisioning profile "iOS Team Provisioning Profile: *" doesn't support the Push Notifications capability. (in target 'yolo90' from project 'yolo90')`
     * Out: `❌  yolo90/yolo90: Provisioning Profile "iOS Team Provisioning Profile: *" does not support the Push Notifications capability.`
     *
     * In: `error: Provisioning profile "iOS Team Provisioning Profile: *" doesn't include the aps-environment entitlement. (in target 'yolo90' from project 'yolo90')`
     * Out: `❌  yolo90/yolo90: Entitlements file defines the value "aps-environment" which is not registered for profile "iOS Team Provisioning Profile: *".`
     *
     * @param profileName `"iOS Team Provisioning Profile: *"`
     * @param entitlementName `Push Notifications` | `aps-environment`
     * @param entitlementType `capability` | `entitlement`
     * @param target boost-for-react-native
     * @param project Pods
     */
    formatUnsupportedEntitlementError(profileName, entitlementName, entitlementType, target, project) {
        const packageName = [project, target].join('/');
        const platform = chalk_1.default.red.bold(`${packageName}:`);
        if (entitlementType === 'capability') {
            return chalk_1.default `${symbols_1.ERROR} ${platform} Provisioning Profile ${profileName} does not support the {red ${entitlementName}} capability.`;
        }
        return chalk_1.default `${symbols_1.ERROR} ${platform} Entitlements file defines the value {red "${entitlementName}"} which is not registered for profile ${profileName}.`;
    }
    formatFileMissingError(reason, filePath) {
        const results = `\n${chalk_1.default.red(symbols_1.ERROR + ' ' + reason)} ${filePath}\n\n`;
        this.errors.push(results);
        return results;
    }
    formatLdWarning(reason) {
        const results = switchRegex_1.switchRegex(reason, [
            [
                Matchers_1.Matchers.Warnings.LINKER_METHOD_OVERRIDE,
                ([, $1, $2, $3, $4, $5]) => {
                    return this.formatLdMethodOverride($1, [
                        { filePath: $2, name: $3 },
                        { filePath: $4, name: $5 },
                    ]);
                },
            ],
            [null, () => `${chalk_1.default.yellow(symbols_1.WARNING + ' ' + reason)}`],
        ]);
        this.warnings.push(results);
        return results;
    }
    formatUndefinedSymbols(message, symbol, reference) {
        const symbols = chalk_1.default.gray(`┌─ Symbol: ${symbol}\n└─ Referenced from: ${reference}`);
        const results = `${chalk_1.default.red(symbols_1.ERROR + ' ' + message)}\n${symbols}\n`;
        this.errors.push(results);
        return results;
    }
    formatLdMethodOverride(methodName, collisions) {
        const formattedMessage = chalk_1.default.yellow(symbols_1.WARNING + ` ld: duplicate method '${chalk_1.default.bold(methodName)}' in`);
        const types = ['category', 'class'];
        const symbols = chalk_1.default.gray(collisions
            .map(({ filePath, name }, i) => {
            const appFileRoot = getAppRoot(filePath);
            const relativeAppFile = relativePath(appFileRoot, filePath);
            const branch = i === collisions.length - 1 ? '└─' : i === 0 ? '┌─' : '├─';
            return `${branch}${`[${types[i]}]`}: ${name} ${chalk_1.default.dim(relativeAppFile)}`;
        })
            .join('\n'));
        return `${formattedMessage}\n${symbols}\n`;
    }
    formatDuplicateSymbols(message, filePaths, isWarning) {
        const formattedMessage = isWarning
            ? chalk_1.default.yellow(symbols_1.WARNING + ' ' + message)
            : chalk_1.default.red(symbols_1.ERROR + ' ' + message);
        const symbols = chalk_1.default.gray(filePaths
            .map((p, i) => {
            const branch = i === filePaths.length - 1 ? '└─' : i === 0 ? '┌─' : '├─';
            return `${branch} ${path.basename(p)}`;
        })
            .join('\n'));
        const results = `${formattedMessage}\n${symbols}\n`;
        if (isWarning) {
            this.warnings.push(results);
        }
        else {
            this.errors.push(results);
        }
        return results;
    }
    /**
     * In: `The iOS Simulator deployment target 'IPHONEOS_DEPLOYMENT_TARGET' is set to 8.0, but the range of supported deployment target versions is 9.0 to 14.3.99. (in target 'boost-for-react-native' from project 'Pods')`
     * Out: `⚠️ Pods/boost-for-react-native: iOS@8.0 version mismatch. Expected >= 9.0 < 14.3.99`
     *
     * @param os iOS
     * @param deploymentTarget IPHONEOS_DEPLOYMENT_TARGET
     * @param version 8.0
     * @param minVersion 9.0
     * @param maxVersion 14.3.99
     * @param target boost-for-react-native
     * @param project Pods
     */
    formatVersionMismatchWarning(os, deploymentTarget, version, minVersion, maxVersion, target, project) {
        const packageName = [project, target].join('/');
        const platform = chalk_1.default.bold(`${packageName}:`);
        const packageNameWithVersion = chalk_1.default.greenBright(os) + chalk_1.default.cyan `@` + chalk_1.default.magenta(version);
        const expectedRange = `>= ${minVersion} <= ${maxVersion}`;
        return `${symbols_1.WARNING} ${platform} ${packageNameWithVersion} deployment version mismatch, expected ${expectedRange}`;
    }
    /**
     * In: `warning: [CP] Vendored binary '/Users/evanbacon/Library/Developer/Xcode/DerivedData/yolo67-hcjsxsdqyxnsgdednlbpylgeffja/Build/Intermediates.noindex/Pods.build/Debug-iphonesimulator/hermes-engine.build/DerivedSources/hermes.framework.dSYM/Contents/Resources/DWARF/hermes' contains architectures (armv7 armv7s arm64) none of which match the current build architectures (x86_64).`
     * Out: `⚠️  Vendored binary '[app]/hermes-engine.build/DerivedSources/hermes.framework.dSYM/Contents/Resources/DWARF/hermes' does not support current build architecture (x86_64). Supported architectures: armv7, armv7s, arm64.`
     *
     * @param os iOS
     * @param deploymentTarget IPHONEOS_DEPLOYMENT_TARGET
     * @param version 8.0
     * @param minVersion 9.0
     * @param maxVersion 14.3.99
     * @param target boost-for-react-native
     * @param project Pods
     */
    formatMissingArchitectureWarning(binaryPath, architectures, currentArchitectures) {
        const appFileRoot = getAppRoot(binaryPath);
        const relativeAppFile = appFileRoot
            ? chalk_1.default.gray('[app]/') + relativePath(appFileRoot, binaryPath)
            : binaryPath;
        const architectureString = currentArchitectures.length === 1 ? 'architecture' : 'architectures';
        const supportedString = chalk_1.default.dim(`Supported architectures: ${architectures.join(', ')}.`);
        return (chalk_1.default.yellow(`${symbols_1.WARNING} Vendored binary '${relativeAppFile}' does not support current build ${architectureString} (${chalk_1.default.bold(currentArchitectures.join(', '))}). `) + supportedString);
    }
    /**
     * In: `Skipping duplicate build file in Compile Sources build phase: /Users/evanbacon/Documents/GitHub/expo/ios/Exponent/Kernel/ReactAppManager/EXReactAppManager.mm (in target 'Exponent' from project 'Exponent')`
     * Out:
     * `⚠️ Skipping duplicate file: Exponent/Kernel/ReactAppManager/EXReactAppManager.mm:
     *    Remove: Exponent » Exponent » Build Phases » Compile Sources » EXReactAppManager.mm`
     *
     * @param filePath
     * @param buildPhase 'Compile Sources'
     * @param target Exponent-watch-app
     * @param project Exponent
     */
    formatDuplicateFileCompilerWarning(filePath, buildPhase, target, project) {
        const message = `${chalk_1.default.yellow `Skipping duplicate file:`} ${relativePath(this.props.projectRoot, filePath)}`;
        const fileName = path.basename(filePath);
        const crumbs = chalk_1.default.gray('Remove: ' +
            ['Xcode', `${project}/${target}`, 'Build Phases', buildPhase, fileName].join(` ${symbols_1.BREADCRUMB} `));
        return `${symbols_1.WARNING} ${message}\n   ${crumbs}\n`;
    }
    /**
     * In: `The Copy Bundle Resources build phase contains this target's Info.plist file '/Users/evanbacon/Documents/GitHub/expo/ios/Exponent/Supporting/Info.plist'. (in target 'Exponent' from project 'Exponent')`
     * Out:
     * `⚠️ Target's Info.plist file is incorrectly linked: Exponent/Supporting/Info.plist:
     *    Remove: Exponent » Exponent » Build Phases » Copy Bundle Resources » Info.plist`
     *
     * @param filePath
     * @param reservedFileDescription 'entitlements'
     * @param target Exponent-watch-app
     * @param project Exponent
     */
    formatReservedFileInCopyBundleResourcesCompilerWarning(filePath, reservedFileDescription, target, project) {
        const message = `${chalk_1.default.yellow `Target's ${chalk_1.default.bold(reservedFileDescription)} file is incorrectly linked:`} ${relativePath(this.props.projectRoot, filePath)}`;
        const fileName = path.basename(filePath);
        const crumbs = chalk_1.default.gray('Remove: ' +
            ['Xcode', `${project}/${target}`, 'Build Phases', 'Copy Bundle Resources', fileName].join(` ${symbols_1.BREADCRUMB} `));
        return `${symbols_1.WARNING} ${message}\n   ${crumbs}\n`;
    }
    formatMissingFileCompilerWarning(filePath) {
        return `${symbols_1.WARNING} ${chalk_1.default.yellow `No such file or directory:`} ${filePath}`;
    }
    formatGenericError(message) {
        return `\n${chalk_1.default.red(symbols_1.ERROR + ' ' + message)}\n\n`;
    }
    formatGenericWarning(message) {
        return symbols_1.INDENT + chalk_1.default.yellow(message);
    }
    formatWarning(message) {
        const results = switchRegex_1.switchRegex(message, [
            [
                Matchers_1.Matchers.Warnings.MISSING_ARCHITECTURE,
                ([, $1, $2, $3]) => {
                    return this.formatMissingArchitectureWarning($1, $2 === null || $2 === void 0 ? void 0 : $2.split(' ').map(value => value.trim()), $3 === null || $3 === void 0 ? void 0 : $3.split(' ').map(value => value.trim()));
                },
            ],
            [
                Matchers_1.Matchers.Warnings.VERSION_MISMATCH,
                ([, $1, $2, $3, $4, $5, $6, $7]) => {
                    return this.formatVersionMismatchWarning($1, $2, $3, $4, $5, $6, $7);
                },
            ],
            [
                Matchers_1.Matchers.Warnings.MISSING_FILE_COMPILER_WARNING_MATCHER,
                ([, $1]) => {
                    return this.formatMissingFileCompilerWarning($1);
                },
            ],
            [
                Matchers_1.Matchers.Warnings.SKIPPING_DUPLICATE_FILE,
                ([, $1, $2, $3, $4]) => {
                    return this.formatDuplicateFileCompilerWarning($2, $1, $3, $4);
                },
            ],
            [
                Matchers_1.Matchers.Warnings.TARGETS_FILE_INCLUDED,
                ([, $1, $2, $3, $4]) => {
                    return this.formatReservedFileInCopyBundleResourcesCompilerWarning($2, $1, $3, $4);
                },
            ],
            [null, () => this.formatGenericWarning(message)],
        ]);
        this.warnings.push(results);
        return results;
    }
    // TODO: see how we can unify formatError and formatCompileError,
    //       the same for warnings
    formatCompileWarning(fileName, filePathAndLocation, reason, line, cursor) {
        const { filePath, lineNumber, columnNumber } = splitPathInfo(filePathAndLocation);
        if (this.shouldShowCompileWarning(filePath, lineNumber, columnNumber)) {
            const results = formatWarningOrError({
                isError: false,
                filePath,
                reason,
                cursor,
                lineText: line,
                lineNumber,
                columnNumber,
                projectRoot: this.props.projectRoot,
                maxWarningLineLength: this.props.maxWarningLineLength,
            });
            this.warnings.push(results);
            return results;
        }
        return '';
    }
    shouldShowCompileWarning(filePath, lineNumber, columnNumber) {
        return true;
    }
    formatPendingTest(suite, test) {
        return symbols_1.INDENT + formatTest(`${test} [PENDING]`, Status.Pending);
    }
    formatPassingTest(suite, test, time) {
        return symbols_1.INDENT + formatTest(`${test} (${coloredTime(time)} seconds)`, Status.Pass);
    }
    formatMeasuringTest(suite, test, time) {
        return symbols_1.INDENT + formatTest(`${test} measured (${coloredTime(time)} seconds)`, Status.Measure);
    }
    formatFailingTest(suite, test, reason, filePath) {
        return symbols_1.INDENT + formatTest(`${test}, ${reason}`, Status.Fail);
    }
    formatTestRunStarted(name) {
        return heading('Test Suite', name, 'started');
    }
    formatTestSuiteStarted(name) {
        return heading('', name, '');
    }
    formatTestRunFinished(name, time) {
        return '';
    }
    // Will be printed by default. Override with '' if you don't want summary
    formatTestSummary(executedMessage, failuresPerSuite) {
        const failures = this.formatFailures(failuresPerSuite);
        let finalMessage = '';
        if (!failures) {
            finalMessage = chalk_1.default.green(executedMessage);
        }
        else {
            finalMessage = chalk_1.default.red(executedMessage);
        }
        const text = [failures, finalMessage].join('\n\n\n').trim();
        return `\n\n${text}`;
    }
    formatFailures(failuresPerSuite) {
        return Object.entries(failuresPerSuite)
            .map(([suite, failures]) => {
            const formattedFailures = failures.map(failure => this.formatFailure(failure)).join('\n\n');
            return `\n${suite}\n${formattedFailures}`;
        })
            .join('\n');
    }
    formatFailure(f) {
        const { filePath, lineNumber, columnNumber } = splitPathInfo(f.filePath);
        return formatWarningOrError({
            isError: true,
            testName: f.testCase,
            filePath,
            reason: f.reason,
            // cursor,
            lineNumber,
            columnNumber,
            projectRoot: this.props.projectRoot,
            maxWarningLineLength: this.props.maxWarningLineLength,
        });
    }
    finish() { }
    // Override if you want to catch something specific with your regex
    prettyFormat(text) {
        return this.parser.parse(text);
    }
    // If you want to print inline, override #optionalNewline with ''
    optionalNewline() {
        return '\n';
    }
    getBuildSummary() {
        return `\n\u203A ${this.errors.length} error(s), and ${this.warnings.length} warning(s)\n`;
    }
}
exports.Formatter = Formatter;
Formatter.format = format;
Formatter.formatBreadCrumb = formatBreadCrumb;
Formatter.getAppRoot = getAppRoot;
Formatter.highlightLastPathComponent = highlightLastPathComponent;
Formatter.relativePath = relativePath;
function formatPaths(config) {
    const filePath = chalk_1.default.reset.cyan(config.filePath);
    return (chalk_1.default.dim('(') +
        filePath +
        chalk_1.default.dim(`:${[config.line, config.col].filter(Boolean).join(':')})`));
}
/**
 * Split a string like `/Users/foo/bar.m:420:68` into its components.
 *
 * @param filePath '/Users/foo/bar.m:420:68'
 */
function splitPathInfo(filePathAndLocation) {
    const [path, line, column] = filePathAndLocation.split(':');
    return {
        filePath: path || filePathAndLocation,
        lineNumber: line,
        columnNumber: column,
    };
}
function parseOptionalInt(text) {
    if (!text)
        return undefined;
    try {
        const result = parseInt(text, 10);
        return isNaN(result) ? undefined : result;
    }
    catch {
        return undefined;
    }
}
function formatWarningOrError({ projectRoot, filePath, reason, cursor, lineText, lineNumber, columnNumber, isError, maxWarningLineLength = 200, }) {
    var _a;
    const line = parseOptionalInt(lineNumber) || 0;
    const column = parseOptionalInt(columnNumber);
    const color = isError ? chalk_1.default.red : chalk_1.default.yellow;
    const icon = color(isError ? symbols_1.ERROR : symbols_1.WARNING);
    const displayFilePath = !filePath
        ? // If no file path, use null
            null
        : // If the file path is inside of the build folder (Hermes), then use absolute path.
            getAppRoot(filePath)
                ? filePath
                : // Otherwise, use relative path
                    slash(path.relative(projectRoot, filePath));
    const formattedPath = formatPaths({
        filePath: displayFilePath,
        col: column,
        line,
    });
    const pathWithPrefix = `${icon} ${formattedPath}`;
    const formattedReason = color(grayOutMatch(reason, /(\[-.*?\])/).replace(/(\(.*?\)\s?)/, ''));
    // Add special case for .jsbundle files that are parsed with Hermes.
    const isHermes = filePath.endsWith('.jsbundle');
    const isPreviewTooLong = isHermes || (lineText && lineText.length > maxWarningLineLength);
    // When the preview is too long, we skip reading the file and attempting to apply
    // code coloring, this is because it can get very slow.
    if (isPreviewTooLong) {
        let previewLine = '';
        let cursorLine = formattedReason;
        // Create a curtailed preview line like:
        // `...transition:'fade'},k._updatePropsStack=function(){clearImmediate(k._updateImmediate),k._updateImmediate...`
        // If there is no text preview or column number, we can't do anything.
        if (lineText && column != null) {
            const rangeWindow = Math.round(Math.max((_a = displayFilePath === null || displayFilePath === void 0 ? void 0 : displayFilePath.length) !== null && _a !== void 0 ? _a : 0, 80) / 2);
            let minBounds = Math.max(0, column - rangeWindow);
            const maxBounds = Math.min(minBounds + rangeWindow * 2, lineText.length);
            previewLine = lineText.slice(minBounds, maxBounds);
            // If we splice content off the start, then we should append `...`.
            // This is unlikely to happen since we limit the activation size.
            if (minBounds > 0) {
                // Adjust the min bounds so the cursor is aligned after we add the "..."
                minBounds -= 3;
                previewLine = chalk_1.default.dim('...') + previewLine;
            }
            if (maxBounds < lineText.length) {
                previewLine += chalk_1.default.dim('...');
            }
            // If the column property could be found, then use that to fix the cursor location which is often broken in regex.
            cursorLine =
                (column == null ? chalk_1.default.reset(cursor) : fill(column) + chalk_1.default.reset('^')).slice(minBounds) +
                    ' ' +
                    formattedReason;
        }
        return ['', pathWithPrefix, '', previewLine, cursorLine, chalk_1.default.dim('(warning truncated)')].join('\n');
    }
    try {
        const raw = fs.readFileSync(filePath, 'utf8');
        const location = { start: { line, column } };
        const framed = code_frame_1.codeFrameColumns(raw, location, {
            // TODO: Support iOS languages: C++, Objc, swift, Ruby, Bash
            // Maybe something like prism but for terminals?
            highlightCode: false,
            // Remove `(_Nonnull, _Nullable, or _Null_unspecified)` options
            message: formattedReason,
        });
        return `\n${pathWithPrefix}\n\n${framed}\n`;
    }
    catch {
        // If the column property could be found, then use that to fix the cursor location which is often broken in regex.
        const customCursor = column == null ? chalk_1.default.reset(cursor) : fill(column) + chalk_1.default.reset('^');
        const framed = `${lineText}\n${customCursor} ${formattedReason}`;
        return `\n${pathWithPrefix}\n\n${framed}\n`;
    }
}
function fill(width) {
    return Array(width).join(' ');
}
// Dim values like `[-Wnullability-completeness]`
function grayOutMatch(text, reg) {
    return replaceMatch(text, reg, chalk_1.default.gray.dim);
}
function replaceMatch(text, reg, callback) {
    const match = text.match(reg);
    if (match === null || match === void 0 ? void 0 : match.length) {
        return text.replace(reg, callback(match[0]));
    }
    return text;
}
function slash(path) {
    const isExtendedLengthPath = /^\\\\\?\\/.test(path);
    const hasNonAscii = /[^\u0000-\u0080]+/.test(path); // eslint-disable-line no-control-regex
    if (isExtendedLengthPath || hasNonAscii) {
        return path;
    }
    return path.replace(/\\/g, '/');
}
//# sourceMappingURL=Formatter.js.map