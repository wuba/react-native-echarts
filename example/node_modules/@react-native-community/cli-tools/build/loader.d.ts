import type { Ora, Options, Spinner, Color } from 'ora';
export declare type Loader = Ora;
declare class OraNoop implements Loader {
    spinner: Spinner;
    indent: number;
    isSpinning: boolean;
    text: string;
    prefixText: string;
    color: Color;
    succeed(_text?: string | undefined): this;
    fail(_text?: string): this;
    start(_text?: string): this;
    stop(): this;
    warn(_text?: string): this;
    info(_text?: string): this;
    stopAndPersist(): this;
    clear(): this;
    render(): this;
    frame(): string;
}
export declare function getLoader(options?: string | Options | undefined): Loader;
export declare const NoopLoader: typeof OraNoop;
export {};
//# sourceMappingURL=loader.d.ts.map