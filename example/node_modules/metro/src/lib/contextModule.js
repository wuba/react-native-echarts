"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.deriveAbsolutePathFromContext = deriveAbsolutePathFromContext;
exports.fileMatchesContext = fileMatchesContext;
var _crypto = _interopRequireDefault(require("crypto"));
var _path = _interopRequireDefault(require("path"));
var _nullthrows = _interopRequireDefault(require("nullthrows"));
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

function toHash(value) {
  // Use `hex` to ensure filepath safety.
  return _crypto.default.createHash("sha1").update(value).digest("hex");
}

/** Given a fully qualified require context, return a virtual file path that ensures uniqueness between paths with different contexts. */
function deriveAbsolutePathFromContext(from, context) {
  // Drop the trailing slash, require.context should always be matched against a folder
  // and we want to normalize the folder name as much as possible to prevent duplicates.
  // This also makes the files show up in the correct location when debugging in Chrome.
  const filePath = from.endsWith(_path.default.sep) ? from.slice(0, -1) : from;
  return (
    filePath +
    "?ctx=" +
    toHash(
      [
        context.mode,
        context.recursive ? "recursive" : "",
        new RegExp(context.filter.pattern, context.filter.flags).toString(),
      ]
        .filter(Boolean)
        .join(" ")
    )
  );
}

/** Match a file against a require context. */
function fileMatchesContext(testPath, context) {
  // NOTE(EvanBacon): Ensure this logic is synchronized with the similar
  // functionality in `metro-file-map/src/HasteFS.js` (`matchFilesWithContext()`)

  const filePath = _path.default.relative(
    (0, _nullthrows.default)(context.from),
    testPath
  );
  const filter = context.filter;
  if (
    // Ignore everything outside of the provided `root`.
    !(filePath && !filePath.startsWith("..")) ||
    // Prevent searching in child directories during a non-recursive search.
    (!context.recursive && filePath.includes(_path.default.sep)) ||
    // Test against the filter.
    !filter.test(
      // NOTE(EvanBacon): Ensure files start with `./` for matching purposes
      // this ensures packages work across Metro and Webpack (ex: Storybook for React DOM / React Native).
      // `a/b.js` -> `./a/b.js`
      "./" + filePath.replace(/\\/g, "/")
    )
  ) {
    return false;
  }
  return true;
}
