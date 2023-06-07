import { Configuration, RuleSetCondition, RuleSetRule, RuleSetUse, RuleSetUseItem, WebpackPluginInstance } from 'webpack';
interface RuleItem {
    rule: RuleSetRule;
    index: number;
}
interface PluginItem {
    plugin: WebpackPluginInstance;
    index: number;
}
/**
 *
 * @param rules
 * @category utils
 */
export declare function getRulesAsItems(rules: RuleSetRule[]): RuleItem[];
/**
 *
 * @param config
 * @category utils
 */
export declare function getRules(config: Configuration): RuleItem[];
/**
 * Get the babel-loader rule created by `@expo/webpack-config/loaders`
 *
 * @param config
 * @category utils
 */
export declare function getExpoBabelLoader(config: Configuration): RuleSetRule | null;
/**
 *
 * @param rules
 * @category utils
 */
export declare function getRulesFromRules(rules: (RuleSetRule | '...')[]): RuleSetRule[];
/**
 *
 * @param config
 * @param files
 * @category utils
 */
export declare function getRulesByMatchingFiles(config: Configuration, files: string[]): {
    [key: string]: RuleItem[];
};
/**
 *
 * @param config
 * @param files
 * @category utils
 */
export declare function rulesMatchAnyFiles(config: Configuration, files: string[]): boolean;
/**
 *
 * @param condition
 * @param file
 * @category utils
 */
export declare function conditionMatchesFile(condition: RuleSetCondition | undefined, file: string): boolean;
/**
 *
 * @param param0
 * @category utils
 */
export declare function getPlugins({ plugins }: Configuration): PluginItem[];
/**
 *
 * @param config
 * @param name
 * @category utils
 */
export declare function getPluginsByName(config: Configuration, name: string): PluginItem[];
/**
 *
 * @param loader
 * @category utils
 */
export declare function isRuleSetItem(loader: RuleSetUse): loader is RuleSetUseItem;
export {};
