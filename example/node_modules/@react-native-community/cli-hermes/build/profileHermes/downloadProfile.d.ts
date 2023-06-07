import { Config } from '@react-native-community/cli-types';
/**
 * Pull and convert a Hermes tracing profile to Chrome tracing profile
 * @param ctx
 * @param dstPath
 * @param fileName
 * @param sourceMapPath
 * @param raw
 * @param generateSourceMap
 * @param appId
 * @param appIdSuffix
 */
export declare function downloadProfile(ctx: Config, dstPath: string, filename?: string, sourcemapPath?: string, raw?: boolean, shouldGenerateSourcemap?: boolean, port?: string, appId?: string, appIdSuffix?: string): Promise<void>;
//# sourceMappingURL=downloadProfile.d.ts.map