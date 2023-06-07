"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const path_1 = require("path");
const Matchers_1 = require("./Matchers");
const switchRegex_1 = require("./switchRegex");
function unescaped(args) {
    return args.map(v => v.replace(/\\/g, ''));
}
class Parser {
    constructor(formatter) {
        this.formatter = formatter;
        this.formattedSummary = false;
        this.failures = {};
        this.linkerFailure = {
            files: [],
        };
        this.currentIssue = {};
    }
    parse(text) {
        const matchedErrorResults = this.updateErrorState(text);
        if (this.shouldFormatWarning()) {
            return this.formatCompileWarning();
        }
        if (this.shouldFormatError()) {
            return this.formatCompileError();
        }
        if (matchedErrorResults) {
            return '';
        }
        const matchedLinkerResults = this.updateLinkerFailureState(text);
        if (this.shouldFormatUndefinedSymbols()) {
            return this.formatUndefinedSymbols();
        }
        if (this.shouldFormatDuplicateSymbols()) {
            return this.formatDuplicateSymbols();
        }
        if (matchedLinkerResults) {
            return '';
        }
        this.updateTestState(text);
        const { formatter } = this;
        return switchRegex_1.switchRegex(text, [
            [
                Matchers_1.Matchers.ANALYZE_MATCHER,
                ([, $1, $2, $3, $4]) => formatter.formatFileOperation({
                    type: 'Analyze',
                    filePath: $1,
                    fileName: $2,
                    target: $3,
                    project: $4,
                }),
            ],
            [
                Matchers_1.Matchers.BUILD_TARGET_MATCHER,
                ([, $1, $2, $3]) => formatter.formatTarget({
                    type: 'Build',
                    configuration: $3,
                    target: $1,
                    project: $2,
                }),
            ],
            [
                Matchers_1.Matchers.AGGREGATE_TARGET_MATCHER,
                ([, $1, $2, $3]) => formatter.formatTarget({
                    type: 'Aggregate',
                    configuration: $3,
                    target: $1,
                    project: $2,
                }),
            ],
            [
                Matchers_1.Matchers.ANALYZE_TARGET_MATCHER,
                ([, $1, $2, $3]) => formatter.formatTarget({
                    type: 'Analyze',
                    configuration: $3,
                    target: $1,
                    project: $2,
                }),
            ],
            [Matchers_1.Matchers.CLEAN_REMOVE_MATCHER, ([$0]) => formatter.formatCleanRemove($0)],
            [
                Matchers_1.Matchers.CLEAN_TARGET_MATCHER,
                ([, $1, $2, $3]) => formatter.formatTarget({
                    type: 'Clean',
                    configuration: $3,
                    target: $1,
                    project: $2,
                }),
            ],
            [
                Matchers_1.Matchers.ANY_COPY_MATCHER,
                ([, $1, $2, $3, $4, $5]) => {
                    let from = $3;
                    let to = $2;
                    // Flipped with CpResource and CpHeader
                    if ($1.startsWith('Cp')) {
                        from = $2;
                        to = $3;
                    }
                    return formatter.formatCopy({ type: $1, from, to, target: $4, project: $5 });
                },
            ],
            [Matchers_1.Matchers.CHECK_DEPENDENCIES_MATCHER, ([$0]) => formatter.formatCheckDependencies($0)],
            [Matchers_1.Matchers.Errors.CLANG_ERROR_MATCHER, ([, $1]) => formatter.formatError($1)],
            [
                Matchers_1.Matchers.CODESIGN_FRAMEWORK_MATCHER,
                ([, $1, $2, $3, $4]) => formatter.formatFileOperation({
                    type: 'CodeSign',
                    fileName: $2,
                    filePath: $1,
                    target: $3,
                    project: $4,
                }),
            ],
            [
                Matchers_1.Matchers.CODESIGN_MATCHER,
                ([, $1, $2, $3, $4]) => formatter.formatFileOperation({
                    type: 'CodeSign',
                    fileName: $2,
                    filePath: $1,
                    target: $3,
                    project: $4,
                }),
            ],
            [Matchers_1.Matchers.Errors.CHECK_DEPENDENCIES_ERRORS_MATCHER, ([, $1]) => formatter.formatError($1)],
            [
                Matchers_1.Matchers.Errors.PROVISIONING_PROFILE_REQUIRED_MATCHER,
                ([, $1]) => formatter.formatError($1),
            ],
            [Matchers_1.Matchers.Errors.NO_CERTIFICATE_MATCHER, ([, $1]) => formatter.formatError($1)],
            [
                Matchers_1.Matchers.COMPILE_MATCHER,
                ([, $1, $2, $3, $4, $5]) => formatter.formatFileOperation({
                    type: $1,
                    fileName: $3,
                    filePath: $2,
                    target: $4,
                    project: $5,
                }),
            ],
            [Matchers_1.Matchers.COMPILE_COMMAND_MATCHER, ([, $1, $2]) => formatter.formatCompileCommand($1, $2)],
            [
                Matchers_1.Matchers.COMPILE_XIB_MATCHER,
                ([, $1, $2, $3, $4]) => formatter.formatFileOperation({
                    type: 'CompileXIB',
                    fileName: $2,
                    filePath: $1,
                    target: $3,
                    project: $4,
                }),
            ],
            [
                Matchers_1.Matchers.COMPILE_STORYBOARD_MATCHER,
                ([, $1, $2, $3, $4]) => formatter.formatFileOperation({
                    type: 'CompileStoryboard',
                    fileName: $2,
                    filePath: $1,
                    target: $3,
                    project: $4,
                }),
            ],
            [Matchers_1.Matchers.EXECUTED_MATCHER, () => this.formatSummaryIfNeeded(text)],
            [Matchers_1.Matchers.REMARK_MATCHER, ([, $1]) => formatter.formatRemark($1)],
            [
                Matchers_1.Matchers.COMPILE_SWIFT_SOURCES_MATCHER,
                ([, , $2, $3, $4, $5, $6]) => formatter.formatCompileSwiftSources($2, $3, $4, $5, $6),
            ],
            [
                Matchers_1.Matchers.EMIT_SWIFT_MODULE_MATCHER,
                ([, , $2, $3, $4, $5]) => formatter.formatEmitSwiftModule($2, $3, $4, $5),
            ],
            [
                Matchers_1.Matchers.RESTARTING_TESTS_MATCHER,
                () => formatter.formatFailingTest(this.testSuite, this.testCase, 'Test crashed', 'n/a'),
            ],
            [
                Matchers_1.Matchers.UI_FAILING_TEST_MATCHER,
                ([, $1, $2]) => formatter.formatFailingTest(this.testSuite, this.testCase, $2, $1),
            ],
            [
                Matchers_1.Matchers.FAILING_TEST_MATCHER,
                ([, $1, $2, $3, $4]) => formatter.formatFailingTest($2, $3, $4, $1),
            ],
            [Matchers_1.Matchers.Errors.FATAL_ERROR_MATCHER, ([, $1]) => formatter.formatError($1)],
            [Matchers_1.Matchers.Errors.RSYNC_ERROR_MATCHER, ([, $1]) => formatter.formatError($1)],
            [
                Matchers_1.Matchers.Errors.FILE_MISSING_ERROR_MATCHER,
                ([, $1, $2]) => formatter.formatFileMissingError($1, $2),
            ],
            [
                Matchers_1.Matchers.GENERATE_DSYM_MATCHER,
                ([, $1, $2, $3, $4]) => formatter.formatFileOperation({
                    type: 'GenerateDSYMFile',
                    filePath: $1,
                    fileName: $2,
                    target: $3,
                    project: $4,
                }),
            ],
            [
                Matchers_1.Matchers.Warnings.LD_WARNING_MATCHER,
                ([, $1, $2]) => {
                    // Skip printing ld warnings when we're collecting multiline ld duplicate symbol warnings.
                    if (this.linkerFailure.isWarning) {
                        return '';
                    }
                    return formatter.formatLdWarning($1 + $2);
                },
            ],
            [Matchers_1.Matchers.Errors.LD_ERROR_MATCHER, ([, $1]) => formatter.formatError($1)],
            [
                Matchers_1.Matchers.LIBTOOL_MATCHER,
                ([, $1, $2, $3, $4]) => formatter.formatFileOperation({
                    type: 'Libtool',
                    filePath: $1,
                    fileName: $2,
                    target: $3,
                    project: $4,
                }),
            ],
            [
                Matchers_1.Matchers.LINKING_MATCHER,
                ([, $1, $2, $3, $4, $5, $6]) => formatter.formatFileOperation({
                    type: 'Ld',
                    filePath: $1,
                    fileName: $2,
                    linkType: $3,
                    arch: $4,
                    target: $5,
                    project: $6,
                }),
            ],
            [Matchers_1.Matchers.Errors.MODULE_INCLUDES_ERROR_MATCHER, ([, $1]) => formatter.formatError($1)],
            [
                Matchers_1.Matchers.TEST_CASE_MEASURED_MATCHER,
                ([, $1, $2, $3]) => formatter.formatMeasuringTest($1, $2, $3),
            ],
            [Matchers_1.Matchers.TEST_CASE_PENDING_MATCHER, ([, $1, $2]) => formatter.formatPendingTest($1, $2)],
            [
                Matchers_1.Matchers.TEST_CASE_PASSED_MATCHER,
                ([, $1, $2, $3]) => formatter.formatPassingTest($1, $2, $3),
            ],
            [Matchers_1.Matchers.Errors.PODS_ERROR_MATCHER, ([, $1]) => formatter.formatError($1)],
            [
                Matchers_1.Matchers.PROCESS_INFO_PLIST_MATCHER,
                ([, $1, $2, $3, $4]) => {
                    const [filePath, fileName] = unescaped([$1, $2]);
                    return formatter.formatFileOperation({
                        type: 'ProcessInfoPlistFile',
                        fileName,
                        filePath,
                        target: $3,
                        project: $4,
                    });
                },
            ],
            [
                Matchers_1.Matchers.PHASE_SCRIPT_EXECUTION_MATCHER,
                // @ts-ignore: spread
                ([, $1, $2, $3]) => formatter.formatPhaseScriptExecution(...unescaped([$1]), $2, $3),
            ],
            [Matchers_1.Matchers.PHASE_SUCCESS_MATCHER, ([, $1, $2]) => formatter.formatPhaseSuccess($1, $2)],
            [
                Matchers_1.Matchers.PROCESS_PCH_MATCHER,
                ([, 
                // pch / gch
                $1, 
                // filename
                $2, 
                // extra pch
                $3, 
                // type
                $4, 
                // arch
                $5, $6, $7,]) => formatter.formatFileOperation({
                    type: 'ProcessPCH',
                    filePath: $1,
                    fileName: $2,
                    linkType: $4,
                    arch: $5,
                    target: $6,
                    project: $7,
                }),
            ],
            [Matchers_1.Matchers.PROCESS_PCH_COMMAND_MATCHER, ([, $1]) => formatter.formatProcessPchCommand($1)],
            [Matchers_1.Matchers.PREPROCESS_MATCHER, ([, $1]) => formatter.formatPreprocess($1)],
            [
                Matchers_1.Matchers.TESTS_RUN_COMPLETION_MATCHER,
                ([, $1, , $3]) => formatter.formatTestRunFinished($1, $3),
            ],
            [Matchers_1.Matchers.TEST_SUITE_STARTED_MATCHER, ([, $1]) => formatter.formatTestRunStarted($1)],
            [Matchers_1.Matchers.TEST_SUITE_START_MATCHER, ([, $1]) => formatter.formatTestSuiteStarted($1)],
            [Matchers_1.Matchers.TIFFUTIL_MATCHER, ([, $1]) => formatter.formatTiffutil($1)],
            [
                Matchers_1.Matchers.TOUCH_MATCHER,
                ([, $1, $2, $3, $4]) => formatter.formatFileOperation({
                    type: 'Touch',
                    filePath: $1,
                    // file name is undefined in newer projects
                    fileName: $2 || path_1.basename($1 || ''),
                    target: $3,
                    project: $4,
                }),
            ],
            [Matchers_1.Matchers.WRITE_FILE_MATCHER, ([, $1]) => formatter.formatWriteFile($1)],
            [Matchers_1.Matchers.WRITE_AUXILIARY_FILES, ([$0]) => formatter.formatWriteAuxiliaryFiles($0)],
            [Matchers_1.Matchers.SHELL_COMMAND_MATCHER, ([, $1, $2]) => formatter.formatShellCommand($1, $2)],
            [Matchers_1.Matchers.Warnings.GENERIC_WARNING_MATCHER, ([, $1]) => formatter.formatWarning($1)],
            [
                Matchers_1.Matchers.Warnings.WILL_NOT_BE_CODE_SIGNED_MATCHER,
                ([, $1]) => formatter.formatWillNotBeCodeSigned($1),
            ],
            [
                Matchers_1.Matchers.Errors.COMPILE_ERROR_MATCHER,
                ([, $1, $2, $3, $4, $5]) => {
                    return formatter.formatSingleLineCompileIssue('error', $1, $2, $3, $4, $5);
                },
            ],
            [
                Matchers_1.Matchers.Warnings.COMPILE_WARNING_INLINE_MATCHER,
                ([, $1, $2, $3, $4, $5]) => {
                    return formatter.formatSingleLineCompileIssue('warning', $1, $2, $3, $4, $5);
                },
            ],
            [null, () => formatter.formatOther(text)],
        ]);
    }
    updateTestState(text) {
        return switchRegex_1.switchRegex(text, [
            [
                Matchers_1.Matchers.TEST_SUITE_STARTED_MATCHER,
                () => {
                    this.testsDone = false;
                    this.formattedSummary = false;
                    this.failures = {};
                },
            ],
            [
                Matchers_1.Matchers.TEST_CASE_STARTED_MATCHER,
                ([, $1, $2]) => {
                    this.testSuite = $1;
                    this.testCase = $2;
                },
            ],
            [
                Matchers_1.Matchers.TESTS_RUN_COMPLETION_MATCHER,
                () => {
                    this.testsDone = true;
                },
            ],
            [
                Matchers_1.Matchers.FAILING_TEST_MATCHER,
                ([, $1, $2, $3, $4]) => this.storeFailure({ file: $1, testSuite: $2, testCase: $3, reason: $4 }),
            ],
            [
                Matchers_1.Matchers.UI_FAILING_TEST_MATCHER,
                ([, $1, $2]) => this.storeFailure({
                    file: $1,
                    testSuite: this.testSuite,
                    testCase: this.testCase,
                    reason: $2,
                }),
            ],
            [
                Matchers_1.Matchers.RESTARTING_TESTS_MATCHER,
                () => this.storeFailure({
                    file: 'n/a',
                    testSuite: this.testSuite,
                    testCase: this.testCase,
                    reason: 'Test crashed',
                }),
            ],
        ], true);
    }
    updateErrorState(text) {
        const updateError = ([, $1, $2, $3]) => {
            this.currentIssue.reason = $3;
            this.currentIssue.filePath = $1;
            this.currentIssue.fileName = $2;
        };
        const results = switchRegex_1.switchRegex(text, [
            [
                Matchers_1.Matchers.Errors.COMPILE_ERROR_MATCHER,
                matches => {
                    // Prevent matching a one-liner error.
                    if (matches === null || matches === void 0 ? void 0 : matches[4]) {
                        return 'unmatched';
                    }
                    this.formattingError = true;
                    updateError(matches);
                    return null;
                },
            ],
            [
                Matchers_1.Matchers.Warnings.COMPILE_WARNING_MATCHER,
                matches => {
                    // Prevent matching a one-liner warning.
                    if (matches === null || matches === void 0 ? void 0 : matches[4]) {
                        return 'unmatched';
                    }
                    this.formattingWarning = true;
                    updateError(matches);
                    return null;
                },
            ],
            [
                Matchers_1.Matchers.Errors.CURSOR_MATCHER,
                ([, $1]) => {
                    // is trim === chomp ?
                    this.currentIssue.cursor = $1;
                },
            ],
            [
                null,
                () => {
                    if (this.formattingError || this.formattingWarning) {
                        this.currentIssue.line = text;
                    }
                    return 'unmatched';
                },
            ],
        ]);
        return results !== 'unmatched';
    }
    updateLinkerFailureState(text) {
        const handleLinkerFail = ([, $1]) => {
            this.linkerFailure.message = $1;
            // Some linker failures can be warnings...
            const messageMatch = this.linkerFailure.message.match(/^(ld: )warning: (.*)/m);
            if (messageMatch && messageMatch[2]) {
                // Format like: `ld: duplicate symbol` to match other ld warnings.
                this.linkerFailure.message = messageMatch[1] + messageMatch[2];
                this.linkerFailure.isWarning = true;
            }
            this.formattingLinkerFailure = true;
        };
        switchRegex_1.switchRegex(text, [
            [Matchers_1.Matchers.Errors.LINKER_UNDEFINED_SYMBOLS_MATCHER, handleLinkerFail],
            [Matchers_1.Matchers.Errors.LINKER_DUPLICATE_SYMBOLS_MATCHER, handleLinkerFail],
        ]);
        if (!this.formattingLinkerFailure) {
            return false;
        }
        const results = switchRegex_1.switchRegex(text, [
            [
                Matchers_1.Matchers.Errors.SYMBOL_REFERENCED_FROM_MATCHER,
                ([, $1]) => {
                    this.linkerFailure.symbol = $1;
                },
            ],
            [
                Matchers_1.Matchers.Errors.LINKER_UNDEFINED_SYMBOL_LOCATION_MATCHER,
                () => {
                    // TODO: trim === strip ?
                    this.linkerFailure.reference = text.trim();
                },
            ],
            [
                Matchers_1.Matchers.Errors.LINKER_DUPLICATE_SYMBOLS_LOCATION_MATCHER,
                ([, $1]) => {
                    // TODO: trim === strip ?
                    this.linkerFailure.files.push($1);
                },
            ],
            [
                null,
                () => {
                    return 'unmatched';
                },
            ],
        ]);
        return results !== 'unmatched';
    }
    // TODO: clean up the mess around all this
    shouldFormatError() {
        return !!this.formattingError && this.errorOrWarningIsPresent();
    }
    shouldFormatWarning() {
        return this.formattingWarning && this.errorOrWarningIsPresent();
    }
    errorOrWarningIsPresent() {
        var _a, _b, _c;
        return !!((_a = this.currentIssue) === null || _a === void 0 ? void 0 : _a.reason) && !!((_b = this.currentIssue) === null || _b === void 0 ? void 0 : _b.cursor) && !!((_c = this.currentIssue) === null || _c === void 0 ? void 0 : _c.line);
    }
    shouldFormatUndefinedSymbols() {
        var _a, _b, _c;
        return (((_a = this.linkerFailure) === null || _a === void 0 ? void 0 : _a.message) && ((_b = this.linkerFailure) === null || _b === void 0 ? void 0 : _b.symbol) && ((_c = this.linkerFailure) === null || _c === void 0 ? void 0 : _c.reference));
    }
    shouldFormatDuplicateSymbols() {
        var _a, _b, _c;
        return ((_a = this.linkerFailure) === null || _a === void 0 ? void 0 : _a.message) && ((_c = (_b = this.linkerFailure) === null || _b === void 0 ? void 0 : _b.files) === null || _c === void 0 ? void 0 : _c.length) > 1;
    }
    formatCompileError() {
        const error = { ...this.currentIssue };
        this.currentIssue = {};
        this.formattingError = false;
        return this.formatter.formatCompileError(error.fileName, error.filePath, error.reason, error.line, error.cursor);
    }
    formatCompileWarning() {
        const warning = { ...this.currentIssue };
        this.currentIssue = {};
        this.formattingWarning = false;
        return this.formatter.formatCompileWarning(warning.fileName, warning.filePath, warning.reason, warning.line, warning.cursor);
    }
    formatUndefinedSymbols() {
        const result = this.formatter.formatUndefinedSymbols(this.linkerFailure.message, this.linkerFailure.symbol, this.linkerFailure.reference);
        this.resetLinkerFormatState();
        return result;
    }
    formatDuplicateSymbols() {
        const result = this.formatter.formatDuplicateSymbols(this.linkerFailure.message, this.linkerFailure.files, !!this.linkerFailure.isWarning);
        this.resetLinkerFormatState();
        return result;
    }
    resetLinkerFormatState() {
        this.linkerFailure = { files: [] };
        this.formattingLinkerFailure = false;
    }
    storeFailure({ file, testCase, testSuite, reason, }) {
        if (!this.failures) {
            this.failures = {};
        }
        if (!Array.isArray(this.failures[testSuite])) {
            this.failures[testSuite] = [];
        }
        this.failures[testSuite].push({
            filePath: file,
            reason,
            testCase,
        });
    }
    formatSummaryIfNeeded(executedMessage) {
        if (!this.shouldFormatSummary()) {
            return '';
        }
        this.formattedSummary = true;
        return this.formatter.formatTestSummary(executedMessage, this.failures);
    }
    shouldFormatSummary() {
        return !!this.testsDone && !this.formattedSummary;
    }
}
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map