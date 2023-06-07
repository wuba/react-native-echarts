/**
 * Downloads `downloadUrl` and unzips the contents to `installPath` while
 * updating the message of `loader` at each step.
 */
export declare const downloadAndUnzip: ({ loader, downloadUrl, component, installPath, }: {
    loader: import("ora").Ora;
    component: string;
    downloadUrl: string;
    installPath: string;
}) => Promise<void>;
//# sourceMappingURL=downloadAndUnzip.d.ts.map