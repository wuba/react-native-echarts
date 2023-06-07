import { Loader } from '../types';
declare type PromptCocoaPodsInstallation = {
    installMethod: 'gem' | 'homebrew';
    promptQuestion: string;
};
declare function runSudo(command: string): Promise<void>;
declare function promptCocoaPodsInstallationQuestion(): Promise<PromptCocoaPodsInstallation>;
declare function installCocoaPods(loader: Loader): Promise<void | import("ora").Ora>;
declare function installPods({ directory, loader, }: {
    directory: string;
    loader?: Loader;
}): Promise<void>;
export { promptCocoaPodsInstallationQuestion, runSudo, installCocoaPods };
export default installPods;
//# sourceMappingURL=installPods.d.ts.map