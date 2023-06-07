"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("./skia/NativeSetup");

var _renderer = require("./renderer");

Object.keys(_renderer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _renderer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _renderer[key];
    }
  });
});

var _Canvas = require("./renderer/Canvas");

Object.keys(_Canvas).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Canvas[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Canvas[key];
    }
  });
});

var _views = require("./views");

Object.keys(_views).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _views[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _views[key];
    }
  });
});

var _skia = require("./skia");

Object.keys(_skia).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _skia[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _skia[key];
    }
  });
});

var _external = require("./external");

Object.keys(_external).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _external[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _external[key];
    }
  });
});

var _values = require("./values");

Object.keys(_values).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _values[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _values[key];
    }
  });
});

var _animation = require("./animation");

Object.keys(_animation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _animation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _animation[key];
    }
  });
});

var _types = require("./dom/types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

var _nodes = require("./dom/nodes");

Object.keys(_nodes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _nodes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _nodes[key];
    }
  });
});
//# sourceMappingURL=index.js.map