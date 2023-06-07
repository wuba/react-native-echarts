import { Loader } from '../types';
declare type InstallArgs = {
    pkg: string;
    label?: string;
    loader: Loader;
    onSuccess?: () => void;
    onFail?: () => void;
};
declare function brewInstall({ pkg, label, loader, onSuccess, onFail, }: InstallArgs): Promise<void | import("ora").Ora>;
export { brewInstall };
//# sourceMappingURL=brewInstall.d.ts.map