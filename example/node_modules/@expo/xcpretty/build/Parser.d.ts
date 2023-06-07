import { Formatter } from './Formatter';
export declare type Failure = {
    filePath: string;
    testCase: string;
    reason: string;
};
interface TestIssue {
    reason?: string;
    cursor?: string;
    line?: string;
    filePath?: string;
    fileName?: string;
}
interface LinkerFailure {
    message?: string;
    symbol?: string;
    reference?: string;
    files: string[];
    isWarning?: boolean;
}
export declare class Parser {
    formatter: Formatter;
    testSuite?: string;
    testCase?: string;
    testsDone?: boolean;
    formattedSummary: boolean;
    failures: Record<string, Failure[]>;
    formattingLinkerFailure?: boolean;
    formattingWarning?: boolean;
    formattingError?: boolean;
    linkerFailure: LinkerFailure;
    currentIssue: TestIssue;
    constructor(formatter: Formatter);
    parse(text: string): void | string;
    private updateTestState;
    private updateErrorState;
    private updateLinkerFailureState;
    private shouldFormatError;
    private shouldFormatWarning;
    private errorOrWarningIsPresent;
    private shouldFormatUndefinedSymbols;
    private shouldFormatDuplicateSymbols;
    private formatCompileError;
    private formatCompileWarning;
    private formatUndefinedSymbols;
    private formatDuplicateSymbols;
    private resetLinkerFormatState;
    private storeFailure;
    private formatSummaryIfNeeded;
    private shouldFormatSummary;
}
export {};
