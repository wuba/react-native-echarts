"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _timing = require("./timing");

Object.keys(_timing).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _timing[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _timing[key];
    }
  });
});

var _spring = require("./spring");

Object.keys(_spring).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _spring[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _spring[key];
    }
  });
});

var _decay = require("./decay");

Object.keys(_decay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _decay[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _decay[key];
    }
  });
});

var _functions = require("./functions");

Object.keys(_functions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _functions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _functions[key];
    }
  });
});
//# sourceMappingURL=index.js.map