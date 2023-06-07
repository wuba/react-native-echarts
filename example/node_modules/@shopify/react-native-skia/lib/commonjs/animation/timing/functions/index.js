"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  bezier: true,
  timing: true
};
Object.defineProperty(exports, "bezier", {
  enumerable: true,
  get: function () {
    return _bezier.bezier;
  }
});
Object.defineProperty(exports, "timing", {
  enumerable: true,
  get: function () {
    return _timing.timing;
  }
});

var _bezier = require("./bezier");

var _timing = require("./timing");

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

var _getResolvedParams = require("./getResolvedParams");

Object.keys(_getResolvedParams).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _getResolvedParams[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getResolvedParams[key];
    }
  });
});
//# sourceMappingURL=index.js.map