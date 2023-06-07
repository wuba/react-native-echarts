/// <reference types="node" />
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import http from 'http';
declare type LaunchDevToolsOptions = {
    host?: string;
    port: number;
    watchFolders: ReadonlyArray<string>;
};
export default function getDevToolsMiddleware(options: LaunchDevToolsOptions, isDebuggerConnected: () => boolean): (_req: http.IncomingMessage, res: http.ServerResponse) => void;
export {};
//# sourceMappingURL=devToolsMiddleware.d.ts.map