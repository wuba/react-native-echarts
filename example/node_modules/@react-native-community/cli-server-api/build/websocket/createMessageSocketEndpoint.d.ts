/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Server as WebSocketServer } from 'ws';
export default function createMessageSocketEndpoint(): {
    server: WebSocketServer;
    broadcast: (method: string, params?: Record<string, any>) => void;
};
//# sourceMappingURL=createMessageSocketEndpoint.d.ts.map