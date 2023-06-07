/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import runServer from './runServer';
declare const _default: {
    name: string;
    func: typeof runServer;
    description: string;
    options: ({
        name: string;
        parse: NumberConstructor;
        default?: undefined;
        description?: undefined;
    } | {
        name: string;
        default: string;
        parse?: undefined;
        description?: undefined;
    } | {
        name: string;
        description: string;
        parse: (val: string) => string;
        default?: undefined;
    } | {
        name: string;
        description: string;
        parse: (val: string) => string[];
        default?: undefined;
    } | {
        name: string;
        description: string;
        parse: (workers: string) => number;
        default?: undefined;
    } | {
        name: string;
        description: string;
        parse?: undefined;
        default?: undefined;
    })[];
};
export default _default;
//# sourceMappingURL=index.d.ts.map