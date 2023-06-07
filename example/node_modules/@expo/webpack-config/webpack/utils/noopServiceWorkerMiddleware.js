"use strict";
/**
 * Copyright (c) 2022 Expo, Inc.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Based on https://github.com/facebook/create-react-app/blob/a422bf2/packages/react-dev-utils/noopServiceWorkerMiddleware.js
 * But with Node LTS support.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNoopServiceWorkerMiddleware = void 0;
const path_1 = __importDefault(require("path"));
function createNoopServiceWorkerMiddleware(servedPath) {
    return function noopServiceWorkerMiddleware(req, res, next) {
        if (req.url === path_1.default.posix.join(servedPath, 'service-worker.js')) {
            res.setHeader('Content-Type', 'text/javascript');
            res.send(`// This service worker file is effectively a 'no-op' that will reset any
 // previous service worker registered for the same host:port combination.
 // In the production build, this file is replaced with an actual service worker
 // file that will precache your site's local assets.
 // See https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
 self.addEventListener('install', () => self.skipWaiting());
 self.addEventListener('activate', () => {
   self.clients.matchAll({ type: 'window' }).then(windowClients => {
     for (let windowClient of windowClients) {
       // Force open pages to refresh, so that they have a chance to load the
       // fresh navigation response from the local dev server.
       windowClient.navigate(windowClient.url);
     }
   });
 });
 `);
        }
        else {
            next();
        }
    };
}
exports.createNoopServiceWorkerMiddleware = createNoopServiceWorkerMiddleware;
//# sourceMappingURL=noopServiceWorkerMiddleware.js.map