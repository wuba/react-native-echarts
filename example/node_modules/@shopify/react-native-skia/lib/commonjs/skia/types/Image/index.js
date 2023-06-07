"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Image = require("./Image");

Object.keys(_Image).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Image[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Image[key];
    }
  });
});

var _ImageFactory = require("./ImageFactory");

Object.keys(_ImageFactory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ImageFactory[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ImageFactory[key];
    }
  });
});
//# sourceMappingURL=index.js.map