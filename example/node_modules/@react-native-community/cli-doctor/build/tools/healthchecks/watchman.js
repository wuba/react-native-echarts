"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _install = require("../install");
const label = 'Watchman';
var _default = {
  label,
  isRequired: false,
  description: 'Used for watching changes in the filesystem when in development mode',
  getDiagnostics: async ({
    Binaries
  }) => ({
    needsToBeFixed: Boolean(Binaries.Watchman.version) === false
  }),
  runAutomaticFix: async ({
    loader
  }) => await (0, _install.install)({
    pkg: 'watchman',
    label,
    url: 'https://facebook.github.io/watchman/docs/install.html',
    loader
  })
};
exports.default = _default;

//# sourceMappingURL=watchman.js.map