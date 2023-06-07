"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRuleSetItem = exports.getPluginsByName = exports.getPlugins = exports.conditionMatchesFile = exports.rulesMatchAnyFiles = exports.getRulesByMatchingFiles = exports.getRulesFromRules = exports.getExpoBabelLoader = exports.getRules = exports.getRulesAsItems = void 0;
/**
 * Loader flattening inspired by:
 * https://github.com/preactjs/preact-cli-experiment/tree/7b80623/packages/cli-plugin-legacy-config
 */
const util_1 = require("util");
/**
 *
 * @param rules
 * @category utils
 */
function getRulesAsItems(rules) {
    return rules.map((rule, index) => ({
        index,
        rule,
    }));
}
exports.getRulesAsItems = getRulesAsItems;
/**
 *
 * @param config
 * @category utils
 */
function getRules(config) {
    const { rules = [] } = config.module || {};
    return getRulesAsItems(getRulesFromRules(rules));
}
exports.getRules = getRules;
/**
 * Get the babel-loader rule created by `@expo/webpack-config/loaders`
 *
 * @param config
 * @category utils
 */
function getExpoBabelLoader(config) {
    var _a, _b;
    const { rules = [] } = config.module || {};
    const currentRules = getRulesAsItems(getRulesFromRules(rules));
    for (const ruleItem of currentRules) {
        const rule = ruleItem.rule;
        if (rule.use &&
            typeof rule.use === 'object' &&
            ((_b = (_a = rule.use.options) === null || _a === void 0 ? void 0 : _a.caller) === null || _b === void 0 ? void 0 : _b.__dangerous_rule_id) === 'expo-babel-loader') {
            return rule;
        }
    }
    return null;
}
exports.getExpoBabelLoader = getExpoBabelLoader;
/**
 *
 * @param rules
 * @category utils
 */
function getRulesFromRules(rules) {
    const output = [];
    for (const rule of rules) {
        if (rule !== '...') {
            if (rule.oneOf) {
                output.push(...getRulesFromRules(rule.oneOf));
            }
            else {
                output.push(rule);
            }
        }
    }
    return output;
}
exports.getRulesFromRules = getRulesFromRules;
/**
 *
 * @param config
 * @param files
 * @category utils
 */
function getRulesByMatchingFiles(config, files) {
    const rules = getRules(config);
    const selectedRules = {};
    for (const file of files) {
        selectedRules[file] = rules.filter(({ rule }) => conditionMatchesFile(rule.test, file));
    }
    return selectedRules;
}
exports.getRulesByMatchingFiles = getRulesByMatchingFiles;
/**
 *
 * @param config
 * @param files
 * @category utils
 */
function rulesMatchAnyFiles(config, files) {
    const rules = getRulesByMatchingFiles(config, files);
    return Object.keys(rules).some(filename => !!rules[filename].length);
}
exports.rulesMatchAnyFiles = rulesMatchAnyFiles;
/**
 *
 * @param condition
 * @param file
 * @category utils
 */
function conditionMatchesFile(condition, file) {
    if (!condition)
        return false;
    if ((0, util_1.isRegExp)(condition)) {
        return condition.test(file);
    }
    else if (typeof condition === 'string') {
        return file.startsWith(condition);
    }
    else if (typeof condition === 'function') {
        return Boolean(condition(file));
    }
    else if (Array.isArray(condition)) {
        return condition.some(c => conditionMatchesFile(c, file));
    }
    return Object.entries(condition)
        .map(([key, value]) => {
        switch (key) {
            case 'test':
                return conditionMatchesFile(value, file);
            case 'include':
                return conditionMatchesFile(value, file);
            case 'exclude':
                return !conditionMatchesFile(value, file);
            case 'and':
                return value.every(c => conditionMatchesFile(c, file));
            case 'or':
                return value.some(c => conditionMatchesFile(c, file));
            case 'not':
                return value.every(c => !conditionMatchesFile(c, file));
            default:
                return true;
        }
    })
        .every(b => b);
}
exports.conditionMatchesFile = conditionMatchesFile;
/**
 *
 * @param param0
 * @category utils
 */
function getPlugins({ plugins = [] }) {
    return plugins.map((plugin, index) => ({ index, plugin }));
}
exports.getPlugins = getPlugins;
/**
 *
 * @param config
 * @param name
 * @category utils
 */
function getPluginsByName(config, name) {
    return getPlugins(config).filter(({ plugin }) => {
        if (plugin && plugin.constructor) {
            return plugin.constructor.name === name;
        }
        return false;
    });
}
exports.getPluginsByName = getPluginsByName;
/**
 *
 * @param loader
 * @category utils
 */
function isRuleSetItem(loader) {
    return typeof loader === 'string' || typeof loader === 'function';
}
exports.isRuleSetItem = isRuleSetItem;
//# sourceMappingURL=search.js.map