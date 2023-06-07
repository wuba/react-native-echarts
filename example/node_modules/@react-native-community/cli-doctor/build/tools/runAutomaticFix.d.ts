import { EnvironmentInfo, HealthCheckCategoryResult, Loader } from '../types';
export declare enum AUTOMATIC_FIX_LEVELS {
    ALL_ISSUES = "ALL_ISSUES",
    ERRORS = "ERRORS",
    WARNINGS = "WARNINGS"
}
interface RunAutomaticFixArgs {
    healthchecks: HealthCheckCategoryResult[];
    automaticFixLevel: AUTOMATIC_FIX_LEVELS;
    stats: {
        errors: number;
        warnings: number;
    };
    loader: Loader;
    environmentInfo: EnvironmentInfo;
}
export default function ({ healthchecks, automaticFixLevel, stats, environmentInfo, }: RunAutomaticFixArgs): Promise<void>;
export {};
//# sourceMappingURL=runAutomaticFix.d.ts.map