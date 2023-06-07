"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "commands", {
  enumerable: true,
  get: function () {
    return _commands.default;
  }
});
Object.defineProperty(exports, "dependencyConfig", {
  enumerable: true,
  get: function () {
    return _config.dependencyConfig;
  }
});
Object.defineProperty(exports, "getAndroidProject", {
  enumerable: true,
  get: function () {
    return _getAndroidProject.getAndroidProject;
  }
});
Object.defineProperty(exports, "getPackageName", {
  enumerable: true,
  get: function () {
    return _getAndroidProject.getPackageName;
  }
});
Object.defineProperty(exports, "projectConfig", {
  enumerable: true,
  get: function () {
    return _config.projectConfig;
  }
});
var _commands = _interopRequireDefault(require("./commands"));
var _config = require("./config");
var _getAndroidProject = require("./config/getAndroidProject");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//# sourceMappingURL=index.js.map