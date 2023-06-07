"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findPackageDependencyDir = findPackageDependencyDir;
exports.pickValues = pickValues;
function _findUp() {
  const data = _interopRequireDefault(require("find-up"));
  _findUp = function () {
    return data;
  };
  return data;
}
function fs() {
  const data = _interopRequireWildcard(require("fs"));
  fs = function () {
    return data;
  };
  return data;
}
function path() {
  const data = _interopRequireWildcard(require("path"));
  path = function () {
    return data;
  };
  return data;
}
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Source vendored from:
 * https://github.com/microsoft/rnx-kit/blob/f37adca5161eba66fc27de25d48f72973fff9e8e/packages/tools-node/src/package.ts#L213-L234
 */

/**
 * Pick the value for each `key` property from `obj` and return each one in a new object.
 * If `names` are given, use them in the new object, instead of `keys`.
 *
 * If any `key` was not found or its value was `undefined`, nothing will be picked for that key.
 *
 * @param obj Object to pick from
 * @param keys Keys to pick
 * @param names Optional names to use in the output object
 * @returns A new object containing a each `name` property and the picked value, or `undefined` if no keys were picked.
 */
function pickValues(obj, keys, names) {
  const finalNames = names ?? keys;
  const results = {};
  let pickedValue = false;
  for (let index = 0; index < keys.length; ++index) {
    const value = obj[keys[index]];
    if (typeof value !== 'undefined') {
      results[finalNames[index].toString()] = value;
      pickedValue = true;
    }
  }
  return pickedValue ? results : undefined;
}

/**
 * Components of a package reference.
 */

/**
 * Find the package dependency's directory, starting from the given directory
 * and moving outward, through all parent directories.
 *
 * Package dependencies exist under 'node_modules/[`scope`]/[`name`]'.
 *
 * @param ref Package dependency reference
 * @param options Options which control the search
 * @returns Path to the package dependency's directory, or `undefined` if not found.
 */
function findPackageDependencyDir(ref, options) {
  const pkgName = typeof ref === 'string' ? ref : path().join(ref.scope ?? '', ref.name);
  const packageDir = _findUp().default.sync(path().join('node_modules', pkgName), {
    ...pickValues(options ?? {}, ['startDir', 'allowSymlinks'], ['cwd', 'allowSymlinks']),
    type: 'directory'
  });
  if (!packageDir || !(options === null || options === void 0 ? void 0 : options.resolveSymlinks)) {
    return packageDir;
  }
  return fs().lstatSync(packageDir).isSymbolicLink() ? path().resolve(path().dirname(packageDir), fs().readlinkSync(packageDir)) : packageDir;
}

//# sourceMappingURL=findPackageDependencyDir.js.map