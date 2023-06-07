import { Failure, Parser } from './Parser';
declare function highlightLastPathComponent(filePath: string): string;
declare function format(command: string, argumentText?: string, success?: boolean): string;
declare function relativePath(projectRoot: string, filePath: string): string;
declare function formatBreadCrumb(fileName: string, target?: string, project?: string): string;
declare function getAppRoot(filePath: string): string;
export declare type FileOperation = {
    type: 'Analyze' | 'GenerateDSYMFile' | 'Ld' | 'Libtool' | 'ProcessPCH' | 'ProcessInfoPlistFile' | 'CodeSign' | 'Touch' | 'CompileC' | 'CompileSwift' | 'CompileXIB' | 'CompileStoryboard';
    filePath: string;
    fileName: string;
    arch?: string;
    linkType?: string;
    target?: string;
    project?: string;
};
export declare type ConfigurationOperation = {
    type: 'Analyze' | 'Aggregate' | 'Build' | 'Clean';
    configuration: string;
    target?: string;
    project?: string;
};
export declare type CopyFileProps = {
    type: 'CpResource' | 'CopyStringsFile' | 'CopyPlistFile' | 'CpHeader';
    from: string;
    to: string;
    target?: string;
    project?: string;
};
export declare class Formatter {
    props: {
        projectRoot: string;
        /** Sets the max character length for a warning before cropping the preview. Useful for minified files that can be upwards of a thousand characters long. */
        maxWarningLineLength?: number;
    };
    static format: typeof format;
    static formatBreadCrumb: typeof formatBreadCrumb;
    static getAppRoot: typeof getAppRoot;
    static highlightLastPathComponent: typeof highlightLastPathComponent;
    static relativePath: typeof relativePath;
    _parser: Parser | undefined;
    get parser(): Parser;
    errors: string[];
    warnings: string[];
    constructor(props: {
        projectRoot: string;
        /** Sets the max character length for a warning before cropping the preview. Useful for minified files that can be upwards of a thousand characters long. */
        maxWarningLineLength?: number;
    });
    pipe(data: string): string[];
    private dimConfiguration;
    getTitleForConfigurationType(type: ConfigurationOperation['type']): string;
    formatTarget(props: ConfigurationOperation): string;
    formatCopy({ from, to }: CopyFileProps): string;
    getFileOperationTitle(type: FileOperation['type']): string;
    formatFileOperation(props: FileOperation): string;
    formatPhaseSuccess(phaseName: string, duration?: string): string;
    formatPhaseScriptExecution(scriptName: string, target?: string, project?: string): string;
    formatPreprocess(file: string): string;
    formatShellCommand(command: string, args: string): string;
    formatCompileCommand(compilerCommand: string, filePath: string): string;
    formatProcessPchCommand(filePath: string): string;
    formatWriteFile(file: string): string;
    formatOther(text: string): string;
    formatSingleLineCompileIssue(type: 'warning' | 'error', filePathAndLocation: string, fileName: string, reason: string, target: string, project: string): string;
    formatRemark(msg: string): string;
    formatEmitSwiftModule(type: 'normal' | string, arch: 'x86_64' | string, target?: string, project?: string): string;
    formatCompileSwiftSources(type: 'normal' | string, arch: 'x86_64' | string, pkg: string | 'com.apple.xcode.tools.swift.compiler', target?: string, project?: string): string;
    formatCleanRemove(msg: string): string;
    formatWriteAuxiliaryFiles(text: string): string;
    formatTiffutil(file: string): string;
    formatCheckDependencies(text: string): string;
    formatWillNotBeCodeSigned(message: string): string;
    /**
     *
     * @param fileName 'SampleTest.m',
     * @param filePathAndLocation '/Users/foo/bar.m:12:59',
     * @param reason 'expected identifier',
     * @param line '                [[thread should] equal:thread.];',
     * @param cursor '                                           ^'
     */
    formatCompileError(fileName: string, filePathAndLocation: string, reason: string, line: string, cursor: string): string;
    formatError(message: string): string;
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
    formatUnsupportedEntitlementError(profileName: string, entitlementName: string, entitlementType: 'capability' | 'entitlement', target?: string, project?: string): string;
    formatFileMissingError(reason: string, filePath: string): string;
    formatLdWarning(reason: string): string;
    formatUndefinedSymbols(message: string, symbol: string, reference: string): string;
    formatLdMethodOverride(methodName: string, collisions: {
        filePath: string;
        name: string;
    }[]): string;
    formatDuplicateSymbols(message: string, filePaths: string[], isWarning: boolean): string;
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
    formatVersionMismatchWarning(os: string, deploymentTarget: string, version: string, minVersion: string, maxVersion: string, target: string, project: string): string;
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
    formatMissingArchitectureWarning(binaryPath: string, architectures: string[], currentArchitectures: string[]): string;
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
    formatDuplicateFileCompilerWarning(filePath: string, buildPhase: string, target: string, project: string): string;
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
    formatReservedFileInCopyBundleResourcesCompilerWarning(filePath: string, reservedFileDescription: string, target: string, project: string): string;
    formatMissingFileCompilerWarning(filePath: string): string;
    formatGenericError(message: string): string;
    formatGenericWarning(message: string): string;
    formatWarning(message: string): string;
    formatCompileWarning(fileName: string, filePathAndLocation: string, reason: string, line?: string, cursor?: string): string;
    shouldShowCompileWarning(filePath: string, lineNumber?: string, columnNumber?: string): boolean;
    formatPendingTest(suite: string, test: string): string;
    formatPassingTest(suite: string, test: string, time: string): string;
    formatMeasuringTest(suite: string, test: string, time: string): string;
    formatFailingTest(suite: string, test: string, reason: string, filePath: string): string;
    formatTestRunStarted(name: string): string;
    formatTestSuiteStarted(name: string): string;
    formatTestRunFinished(name: string, time: string): string;
    formatTestSummary(executedMessage: string, failuresPerSuite: Record<string, Failure[]>): string;
    formatFailures(failuresPerSuite: Record<string, Failure[]>): string;
    formatFailure(f: Failure): string;
    finish(): void;
    prettyFormat(text: string): string | void;
    optionalNewline(): string;
    getBuildSummary(): string;
}
export {};
