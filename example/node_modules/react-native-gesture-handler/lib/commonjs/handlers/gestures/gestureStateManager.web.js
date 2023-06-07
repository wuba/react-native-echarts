"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GestureStateManager = void 0;

var _NodeManager = _interopRequireDefault(require("../../web/tools/NodeManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GestureStateManager = {
  create(handlerTag) {
    return {
      begin: () => {
        _NodeManager.default.getHandler(handlerTag).begin();
      },
      activate: () => {
        _NodeManager.default.getHandler(handlerTag).activate();
      },
      fail: () => {
        _NodeManager.default.getHandler(handlerTag).fail();
      },
      end: () => {
        _NodeManager.default.getHandler(handlerTag).end();
      }
    };
  }

};
exports.GestureStateManager = GestureStateManager;
//# sourceMappingURL=gestureStateManager.web.js.map