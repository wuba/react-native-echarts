import { CopyFileProps, FileOperation, Formatter } from './Formatter';
import { MetroParser } from './MetroParser';
export declare type ExpoRunFormatterProps = {
    projectRoot: string;
    podfile?: Record<string, Record<string, string>>;
    appName?: string;
    isDebug?: boolean;
};
/**
 * A superset of `Formatter` which adds support for Metro build errors and cleaner formatting for Node projects.
 */
export declare class ExpoRunFormatter extends Formatter {
    props: ExpoRunFormatterProps;
    static create(projectRoot: string, { xcodeProject, isDebug, }?: {
        xcodeProject?: {
            name: string;
        };
    } & Pick<ExpoRunFormatterProps, 'isDebug'>): ExpoRunFormatter;
    private podfileTracer;
    _parser: MetroParser | undefined;
    get parser(): MetroParser;
    constructor(props: ExpoRunFormatterProps);
    formatMetroAssetCollectionError(errorContents: string): string;
    shouldShowCompileWarning(filePath: string, lineNumber?: string, columnNumber?: string): boolean;
    getNodeModuleName(filePath: string, target?: string): string | null;
    formatFileOperation(props: FileOperation): string;
    formatCopy({ from, to, target }: CopyFileProps): string;
    formatPhaseScriptExecution(scriptName: string, target?: string, project?: string): string;
}
