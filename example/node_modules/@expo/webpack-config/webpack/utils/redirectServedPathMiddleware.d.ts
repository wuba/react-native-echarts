/**
 * Copyright (c) 2022 Expo, Inc.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Based on https://github.com/facebook/create-react-app/blob/a422bf2/packages/react-dev-utils/redirectServedPathMiddleware.js
 * But with Node LTS support.
 */
import type express from 'express';
export declare function createRedirectServedPathMiddleware(servedPath: string): (req: express.Request, res: express.Response, next: express.NextFunction) => void;
