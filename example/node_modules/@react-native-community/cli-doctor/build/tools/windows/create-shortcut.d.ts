declare type LnkOptions = {
    path: string;
    name: string;
    ico: string;
};
/**
 * Creates a script in the user's Startup menu
 */
export declare const createShortcut: ({ path, name, ico }: LnkOptions) => Promise<void>;
export {};
//# sourceMappingURL=create-shortcut.d.ts.map