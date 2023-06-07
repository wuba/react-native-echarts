"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ignoredFiles = void 0;
/**
 * Copyright (c) 2022 Expo, Inc.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Based on https://github.com/facebook/create-react-app/blob/a422bf2/packages/react-dev-utils/ignoredFiles.js
 * But with Node LTS support.
 */
const path_1 = __importDefault(require("path"));
const escapeStringRegexp_1 = require("./escapeStringRegexp");
function ignoredFiles(appSrc) {
    return new RegExp(`^(?!${(0, escapeStringRegexp_1.escapeStringRegexp)(path_1.default.normalize(appSrc + '/').replace(/[\\]+/g, '/'))}).+/node_modules/`, 'g');
}
exports.ignoredFiles = ignoredFiles;
//# sourceMappingURL=ignoredFiles.js.map