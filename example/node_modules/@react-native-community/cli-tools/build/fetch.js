"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchToTemp = exports.fetch = void 0;
function os() {
  const data = _interopRequireWildcard(require("os"));
  os = function () {
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
function fs() {
  const data = _interopRequireWildcard(require("fs"));
  fs = function () {
    return data;
  };
  return data;
}
function _nodeFetch() {
  const data = _interopRequireDefault(require("node-fetch"));
  _nodeFetch = function () {
    return data;
  };
  return data;
}
var _errors = require("./errors");
var _logger = _interopRequireDefault(require("./logger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
async function unwrapFetchResult(response) {
  const data = await response.text();
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}

/**
 * Downloads the given `url` to the OS's temp folder and
 * returns the path to it.
 */
const fetchToTemp = url => {
  try {
    return new Promise((resolve, reject) => {
      const fileName = path().basename(url);
      const tmpDir = path().join(os().tmpdir(), fileName);
      (0, _nodeFetch().default)(url).then(result => {
        if (result.status >= 400) {
          return reject(`Fetch request failed with status ${result.status}`);
        }
        const dest = fs().createWriteStream(tmpDir);
        result.body.pipe(dest);
        result.body.on('end', () => {
          resolve(tmpDir);
        });
        result.body.on('error', reject);
      });
    });
  } catch (e) {
    _logger.default.error(e);
    throw e;
  }
};
exports.fetchToTemp = fetchToTemp;
const fetch = async (url, options) => {
  const result = await (0, _nodeFetch().default)(url, options);
  const data = await unwrapFetchResult(result);
  if (result.status >= 400) {
    throw new _errors.CLIError(`Fetch request failed with status ${result.status}: ${data}.`);
  }
  return {
    status: result.status,
    headers: result.headers,
    data
  };
};
exports.fetch = fetch;

//# sourceMappingURL=fetch.js.map