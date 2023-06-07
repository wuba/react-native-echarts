import type { Ora } from 'ora';
export declare type Loader = Ora;
export declare type NotFound = 'Not Found';
declare type AvailableInformation = {
    version: string;
    path: string;
};
declare type Information = AvailableInformation | NotFound;
export declare type EnvironmentInfo = {
    System: {
        OS: string;
        CPU: string;
        Memory: string;
        Shell: AvailableInformation;
    };
    Binaries: {
        Node: AvailableInformation;
        Yarn: AvailableInformation;
        npm: AvailableInformation;
        Watchman: AvailableInformation;
    };
    Managers: {
        CocoaPods: AvailableInformation;
    };
    SDKs: {
        'iOS SDK': {
            Platforms: string[];
        };
        'Android SDK': {
            'API Levels': string[] | NotFound;
            'Build Tools': string[] | NotFound;
            'System Images': string[] | NotFound;
            'Android NDK': string | NotFound;
        } | NotFound;
    };
    IDEs: {
        'Android Studio': AvailableInformation | NotFound;
        Emacs: AvailableInformation;
        Nano: AvailableInformation;
        VSCode: AvailableInformation;
        Vim: AvailableInformation;
        Xcode: AvailableInformation;
    };
    Languages: {
        Java: Information;
    };
};
export declare type HealthCheckCategory = {
    label: string;
    healthchecks: HealthCheckInterface[];
};
export declare type Healthchecks = {
    common: HealthCheckCategory;
    android: HealthCheckCategory;
    ios?: HealthCheckCategory;
};
export declare type RunAutomaticFix = (args: {
    loader: Loader;
    logManualInstallation: ({ healthcheck, url, command, message, }: {
        healthcheck?: string;
        url?: string;
        command?: string;
        message?: string;
    }) => void;
    environmentInfo: EnvironmentInfo;
}) => Promise<void> | void;
export declare type HealthCheckInterface = {
    label: string;
    visible?: boolean | void;
    isRequired?: boolean;
    description?: string;
    getDiagnostics: (environmentInfo: EnvironmentInfo) => Promise<{
        version?: string;
        versions?: [string];
        versionRange?: string;
        needsToBeFixed: boolean | string;
    }>;
    win32AutomaticFix?: RunAutomaticFix;
    darwinAutomaticFix?: RunAutomaticFix;
    linuxAutomaticFix?: RunAutomaticFix;
    runAutomaticFix: RunAutomaticFix;
};
export declare type HealthCheckResult = {
    label: string;
    needsToBeFixed: boolean;
    version?: NotFound | string;
    versions?: [string] | string;
    versionRange?: string;
    description: string | undefined;
    runAutomaticFix: RunAutomaticFix;
    isRequired: boolean;
    type?: string;
};
export declare type HealthCheckCategoryResult = {
    label: string;
    healthchecks: HealthCheckResult[];
};
export {};
//# sourceMappingURL=types.d.ts.map