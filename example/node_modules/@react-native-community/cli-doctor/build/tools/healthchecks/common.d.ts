declare const logMessage: (message?: string | undefined) => void;
declare const logManualInstallation: ({ healthcheck, url, command, message, }: {
    healthcheck?: string | undefined;
    url?: string | undefined;
    command?: string | undefined;
    message?: string | undefined;
}) => void;
declare const logError: ({ healthcheck, loader, error, message, command, }: {
    healthcheck: string;
    loader?: import("ora").Ora | undefined;
    error: Error;
    message?: string | undefined;
    command: string;
}) => void;
declare function removeMessage(message: string): void;
export { logMessage, logManualInstallation, logError, removeMessage };
//# sourceMappingURL=common.d.ts.map