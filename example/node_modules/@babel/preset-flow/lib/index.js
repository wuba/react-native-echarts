"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _helperPluginUtils = require("@babel/helper-plugin-utils");
var _pluginTransformFlowStripTypes = require("@babel/plugin-transform-flow-strip-types");
var _normalizeOptions = require("./normalize-options");
var _default = (0, _helperPluginUtils.declarePreset)((api, opts) => {
  api.assertVersion(7);
  const {
    all,
    allowDeclareFields,
    ignoreExtensions = false
  } = (0, _normalizeOptions.default)(opts);
  const flowPlugin = [_pluginTransformFlowStripTypes.default, {
    all,
    allowDeclareFields
  }];
  if (true) {
    return {
      plugins: [flowPlugin]
    };
  }
  {}
});
exports.default = _default;

//# sourceMappingURL=index.js.map
