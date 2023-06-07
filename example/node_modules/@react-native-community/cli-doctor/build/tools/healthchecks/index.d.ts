import { Healthchecks } from '../../types';
export declare const HEALTHCHECK_TYPES: {
    ERROR: string;
    WARNING: string;
};
declare type Options = {
    fix: boolean | void;
    contributor: boolean | void;
};
export declare const getHealthchecks: ({ contributor }: Options) => Healthchecks;
export {};
//# sourceMappingURL=index.d.ts.map