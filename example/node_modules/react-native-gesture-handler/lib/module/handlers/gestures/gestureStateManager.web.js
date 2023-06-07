import NodeManager from '../../web/tools/NodeManager';
export const GestureStateManager = {
  create(handlerTag) {
    return {
      begin: () => {
        NodeManager.getHandler(handlerTag).begin();
      },
      activate: () => {
        NodeManager.getHandler(handlerTag).activate();
      },
      fail: () => {
        NodeManager.getHandler(handlerTag).fail();
      },
      end: () => {
        NodeManager.getHandler(handlerTag).end();
      }
    };
  }

};
//# sourceMappingURL=gestureStateManager.web.js.map