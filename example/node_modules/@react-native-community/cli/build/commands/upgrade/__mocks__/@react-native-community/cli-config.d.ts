export default function mockedLoadConfig(): {
    root: string;
    reactNativePath: string;
    commands: never[];
    platforms: {
        ios: {
            projectConfig: () => null;
            dependencyConfig: () => null;
        };
        android: {
            projectConfig: () => null;
            dependencyConfig: () => null;
        };
    };
    project: {
        ios: null;
        android: null;
    };
    dependencies: {};
    assets: never[];
};
//# sourceMappingURL=cli-config.d.ts.map