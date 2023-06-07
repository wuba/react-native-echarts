/**
 * Given a config option that could evalutate to true, config, or null; return a config.
 * e.g.
 * `polyfill: true` returns the `config`
 * `polyfill: {}` returns `{}`
 *
 * @category utils
 */
export declare function enableWithPropertyOrConfig(prop: any, config: boolean | {
    [key: string]: any;
}, merge?: boolean): any;
/**
 * Used for features that are enabled by default unless specified otherwise.
 *
 * @category utils
 */
export declare function overrideWithPropertyOrConfig(prop: any, config: boolean | {
    [key: string]: any;
}, merge?: boolean): any;
