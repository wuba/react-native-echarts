"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.DuplicateHasteCandidatesError = void 0;
var _constants = _interopRequireDefault(require("../constants"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 * @oncall react_native
 */

class DuplicateHasteCandidatesError extends Error {
  constructor(name, platform, supportsNativePlatform, duplicatesSet) {
    const platformMessage = getPlatformMessage(platform);
    super(
      `The name \`${name}\` was looked up in the Haste module map. It ` +
        "cannot be resolved, because there exists several different " +
        "files, or packages, that provide a module for " +
        `that particular name and platform. ${platformMessage} You must ` +
        "delete or exclude files until there remains only one of these:\n\n" +
        Array.from(duplicatesSet)
          .map(
            ([dupFilePath, dupFileType]) =>
              `  * \`${dupFilePath}\` (${getTypeMessage(dupFileType)})\n`
          )
          .sort()
          .join("")
    );
    this.hasteName = name;
    this.platform = platform;
    this.supportsNativePlatform = supportsNativePlatform;
    this.duplicatesSet = duplicatesSet;
  }
}
exports.DuplicateHasteCandidatesError = DuplicateHasteCandidatesError;
function getPlatformMessage(platform) {
  if (platform === _constants.default.GENERIC_PLATFORM) {
    return "The platform is generic (no extension).";
  }
  return `The platform extension is \`${platform}\`.`;
}
function getTypeMessage(type) {
  switch (type) {
    case _constants.default.MODULE:
      return "module";
    case _constants.default.PACKAGE:
      return "package";
  }
  return "unknown";
}
