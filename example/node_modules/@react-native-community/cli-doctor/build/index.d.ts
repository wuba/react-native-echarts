export declare const commands: {
    info: {
        name: string;
        description: string;
        func: (_argv: string[], ctx: import("@react-native-community/cli-types").Config) => Promise<void>;
    };
    doctor: {
        func: import("@react-native-community/cli-types").DetachedCommandFunction<{
            fix: boolean | void;
            contributor: boolean | void;
        }>;
        detached: boolean;
        name: string;
        description: string;
        options: {
            name: string;
            description: string;
        }[];
    };
};
/**
 * @todo
 * We should not rely on this file from other packages, e.g. CLI. We probably need to
 * refactor the init in order to remove that connection.
 */
export { default as versionRanges } from './tools/versionRanges';
export { default as installPods } from './tools/installPods';
//# sourceMappingURL=index.d.ts.map