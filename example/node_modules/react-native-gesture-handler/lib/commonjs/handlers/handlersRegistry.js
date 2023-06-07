"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNextHandlerTag = getNextHandlerTag;
exports.registerHandler = registerHandler;
exports.registerOldGestureHandler = registerOldGestureHandler;
exports.unregisterHandler = unregisterHandler;
exports.findHandler = findHandler;
exports.findOldGestureHandler = findOldGestureHandler;
exports.findHandlerByTestID = findHandlerByTestID;
exports.handlerIDToTag = void 0;

var _utils = require("../utils");

const handlerIDToTag = {};
exports.handlerIDToTag = handlerIDToTag;
const gestures = new Map();
const oldHandlers = new Map();
const testIDs = new Map();
let handlerTag = 1;

function getNextHandlerTag() {
  return handlerTag++;
}

function registerHandler(handlerTag, handler, testID) {
  gestures.set(handlerTag, handler);

  if ((0, _utils.isJestEnv)() && testID) {
    testIDs.set(testID, handlerTag);
  }
}

function registerOldGestureHandler(handlerTag, handler) {
  oldHandlers.set(handlerTag, handler);
}

function unregisterHandler(handlerTag, testID) {
  gestures.delete(handlerTag);

  if ((0, _utils.isJestEnv)() && testID) {
    testIDs.delete(testID);
  }
}

function findHandler(handlerTag) {
  return gestures.get(handlerTag);
}

function findOldGestureHandler(handlerTag) {
  return oldHandlers.get(handlerTag);
}

function findHandlerByTestID(testID) {
  const handlerTag = testIDs.get(testID);

  if (handlerTag !== undefined) {
    var _findHandler;

    return (_findHandler = findHandler(handlerTag)) !== null && _findHandler !== void 0 ? _findHandler : null;
  }

  return null;
}
//# sourceMappingURL=handlersRegistry.js.map