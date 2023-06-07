import { Environment, InputEnvironment } from '../types';
/**
 * Validate the environment options and apply default values.
 *
 * @param env
 * @category env
 */
export declare function validateEnvironment(env: InputEnvironment): Environment;
/**
 *
 * @param env
 * @param warnOnce
 * @category env
 * @internal
 */
export declare function warnEnvironmentDeprecation(env: InputEnvironment, warnOnce?: boolean): void;
/**
 * Used for testing
 * @category env
 * @internal
 */
export declare function _resetWarnings(): void;
