"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoopLoader = void 0;
exports.getLoader = getLoader;
function _ora() {
  const data = _interopRequireDefault(require("ora"));
  _ora = function () {
    return data;
  };
  return data;
}
var _logger = _interopRequireDefault(require("./logger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class OraNoop {
  spinner = {
    interval: 1,
    frames: []
  };
  indent = 0;
  isSpinning = false;
  text = '';
  prefixText = '';
  color = 'blue';
  succeed(_text) {
    return this;
  }
  fail(_text) {
    return this;
  }
  start(_text) {
    return this;
  }
  stop() {
    return this;
  }
  warn(_text) {
    return this;
  }
  info(_text) {
    return this;
  }
  stopAndPersist() {
    return this;
  }
  clear() {
    return this;
  }
  render() {
    return this;
  }
  frame() {
    return this.text;
  }
}
function getLoader(options) {
  return _logger.default.isVerbose() ? new OraNoop() : (0, _ora().default)(options);
}
const NoopLoader = OraNoop;
exports.NoopLoader = NoopLoader;

//# sourceMappingURL=loader.js.map