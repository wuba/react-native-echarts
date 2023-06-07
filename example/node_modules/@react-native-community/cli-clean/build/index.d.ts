export declare const commands: {
    clean: {
        func: typeof import("./clean").clean;
        name: string;
        description: string;
        options: ({
            name: string;
            description: string;
            default?: undefined;
        } | {
            name: string;
            description: string;
            default: string;
        } | {
            name: string;
            description: string;
            default: boolean;
        })[];
    };
};
//# sourceMappingURL=index.d.ts.map