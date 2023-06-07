/// <reference types="node" />
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import http from 'http';
export default function systraceProfileMiddleware(req: http.IncomingMessage & {
    rawBody: string;
}, res: http.ServerResponse): void;
//# sourceMappingURL=systraceProfileMiddleware.d.ts.map