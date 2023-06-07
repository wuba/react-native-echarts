"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _components = require("./components");

Object.keys(_components).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _components[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _components[key];
    }
  });
});

var _DependencyManager = require("./DependencyManager");

Object.keys(_DependencyManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DependencyManager[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _DependencyManager[key];
    }
  });
});
//# sourceMappingURL=index.js.map