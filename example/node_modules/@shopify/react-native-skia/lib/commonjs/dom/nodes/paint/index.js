"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Shaders = require("./Shaders");

Object.keys(_Shaders).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Shaders[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Shaders[key];
    }
  });
});

var _MaskFilters = require("./MaskFilters");

Object.keys(_MaskFilters).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MaskFilters[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MaskFilters[key];
    }
  });
});

var _ColorFilters = require("./ColorFilters");

Object.keys(_ColorFilters).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ColorFilters[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ColorFilters[key];
    }
  });
});

var _ImageFilters = require("./ImageFilters");

Object.keys(_ImageFilters).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ImageFilters[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ImageFilters[key];
    }
  });
});

var _PathEffects = require("./PathEffects");

Object.keys(_PathEffects).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PathEffects[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _PathEffects[key];
    }
  });
});

var _BlendNode = require("./BlendNode");

Object.keys(_BlendNode).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BlendNode[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _BlendNode[key];
    }
  });
});
//# sourceMappingURL=index.js.map