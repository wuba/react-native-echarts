import { isJestEnv } from '../utils';
export const handlerIDToTag = {};
const gestures = new Map();
const oldHandlers = new Map();
const testIDs = new Map();
let handlerTag = 1;
export function getNextHandlerTag() {
  return handlerTag++;
}
export function registerHandler(handlerTag, handler, testID) {
  gestures.set(handlerTag, handler);

  if (isJestEnv() && testID) {
    testIDs.set(testID, handlerTag);
  }
}
export function registerOldGestureHandler(handlerTag, handler) {
  oldHandlers.set(handlerTag, handler);
}
export function unregisterHandler(handlerTag, testID) {
  gestures.delete(handlerTag);

  if (isJestEnv() && testID) {
    testIDs.delete(testID);
  }
}
export function findHandler(handlerTag) {
  return gestures.get(handlerTag);
}
export function findOldGestureHandler(handlerTag) {
  return oldHandlers.get(handlerTag);
}
export function findHandlerByTestID(testID) {
  const handlerTag = testIDs.get(testID);

  if (handlerTag !== undefined) {
    var _findHandler;

    return (_findHandler = findHandler(handlerTag)) !== null && _findHandler !== void 0 ? _findHandler : null;
  }

  return null;
}
//# sourceMappingURL=handlersRegistry.js.map