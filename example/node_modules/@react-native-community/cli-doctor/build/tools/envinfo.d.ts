import { EnvironmentInfo } from '../types';
/**
 * Returns information about the running system.
 * If `json === true`, or no options are passed,
 * the return type will be an `EnvironmentInfo`.
 * If set to `false`, it will be a `string`.
 */
declare function getEnvironmentInfo(): Promise<EnvironmentInfo>;
declare function getEnvironmentInfo(json: true): Promise<EnvironmentInfo>;
declare function getEnvironmentInfo(json: false): Promise<string>;
export default getEnvironmentInfo;
//# sourceMappingURL=envinfo.d.ts.map