import { Config } from '@react-native-community/cli-types';
/**
 * Generate a sourcemap by fetching it from a running metro server
 */
export declare function generateSourcemap(port?: string): Promise<string | undefined>;
/**
 *
 * @param ctx
 */
export declare function findSourcemap(ctx: Config, port?: string): Promise<string | undefined>;
//# sourceMappingURL=sourcemapUtils.d.ts.map