"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CommandLineArgs", {
  enumerable: true,
  get: function () {
    return _commands.CommandLineArgs;
  }
});
Object.defineProperty(exports, "Config", {
  enumerable: true,
  get: function () {
    return _loadMetroConfig.Config;
  }
});
Object.defineProperty(exports, "ConfigLoadingContext", {
  enumerable: true,
  get: function () {
    return _loadMetroConfig.ConfigLoadingContext;
  }
});
Object.defineProperty(exports, "MetroConfig", {
  enumerable: true,
  get: function () {
    return _loadMetroConfig.MetroConfig;
  }
});
Object.defineProperty(exports, "buildBundleWithConfig", {
  enumerable: true,
  get: function () {
    return _commands.buildBundleWithConfig;
  }
});
Object.defineProperty(exports, "commands", {
  enumerable: true,
  get: function () {
    return _commands.default;
  }
});
Object.defineProperty(exports, "getDefaultConfig", {
  enumerable: true,
  get: function () {
    return _loadMetroConfig.getDefaultConfig;
  }
});
Object.defineProperty(exports, "loadMetroConfig", {
  enumerable: true,
  get: function () {
    return _loadMetroConfig.default;
  }
});
var _loadMetroConfig = _interopRequireWildcard(require("./tools/loadMetroConfig"));
var _commands = _interopRequireWildcard(require("./commands"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//# sourceMappingURL=index.js.map