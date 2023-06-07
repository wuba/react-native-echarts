"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Font = require("./Font");

Object.keys(_Font).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Font[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Font[key];
    }
  });
});
//# sourceMappingURL=index.js.map