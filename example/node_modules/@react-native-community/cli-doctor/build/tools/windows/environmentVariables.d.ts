/**
 * Creates a new variable in the user's environment
 */
declare const setEnvironment: (variable: string, value: string) => Promise<void>;
/**
 * Prepends the given `value` to the user's environment `variable`.
 * @param {string} variable The environment variable to modify
 * @param {string} value The value to add to the variable
 * @returns {Promise<void>}
 */
declare const updateEnvironment: (variable: string, value: string) => Promise<void>;
export { setEnvironment, updateEnvironment };
//# sourceMappingURL=environmentVariables.d.ts.map