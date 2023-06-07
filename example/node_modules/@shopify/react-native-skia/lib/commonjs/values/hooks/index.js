"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _useClockValue = require("./useClockValue");

Object.keys(_useClockValue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useClockValue[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useClockValue[key];
    }
  });
});

var _useComputedValue = require("./useComputedValue");

Object.keys(_useComputedValue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useComputedValue[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useComputedValue[key];
    }
  });
});

var _useValue = require("./useValue");

Object.keys(_useValue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useValue[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useValue[key];
    }
  });
});

var _useValueEffect = require("./useValueEffect");

Object.keys(_useValueEffect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useValueEffect[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useValueEffect[key];
    }
  });
});
//# sourceMappingURL=index.js.map