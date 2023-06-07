import { Loader } from '../types';
declare type InstallArgs = {
    pkg: string;
    label: string;
    url: string;
    loader: Loader;
};
declare function install({ pkg, label, url, loader }: InstallArgs): Promise<void>;
export { install };
//# sourceMappingURL=install.d.ts.map