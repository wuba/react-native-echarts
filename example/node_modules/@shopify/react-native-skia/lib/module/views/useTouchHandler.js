import { useCallback, useRef } from "react";
import { PixelRatio } from "react-native";
import { TouchType } from "./types";

const useInternalTouchHandler = function (handlers) {
  let deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let multiTouch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  const prevTouchInfoRef = useRef({});
  const prevVelocityRef = useRef({});
  return useCallback(history => {
    // Process all items in the current touch history
    history.forEach(touches => {
      // Enumerate touches
      for (let i = 0; i < touches.length; i++) {
        var _prevTouchInfoRef$cur, _prevTouchInfoRef$cur2, _prevTouch$x, _prevTouch$y, _prevVelocityRef$curr, _prevVelocityRef$curr2, _prevVelocityRef$curr3, _prevVelocityRef$curr4;

        if (!multiTouch && i > 0) {
          break;
        }

        const touch = touches[i];
        const prevTouch = prevTouchInfoRef.current[touch.id]; // Calculate the velocity from the previous touch.

        const timeDiffseconds = touch.timestamp - ((_prevTouchInfoRef$cur = (_prevTouchInfoRef$cur2 = prevTouchInfoRef.current[touch.id]) === null || _prevTouchInfoRef$cur2 === void 0 ? void 0 : _prevTouchInfoRef$cur2.timestamp) !== null && _prevTouchInfoRef$cur !== void 0 ? _prevTouchInfoRef$cur : touch.timestamp);
        const distX = touch.x - ((_prevTouch$x = prevTouch === null || prevTouch === void 0 ? void 0 : prevTouch.x) !== null && _prevTouch$x !== void 0 ? _prevTouch$x : touch.x);
        const distY = touch.y - ((_prevTouch$y = prevTouch === null || prevTouch === void 0 ? void 0 : prevTouch.y) !== null && _prevTouch$y !== void 0 ? _prevTouch$y : touch.y);

        if (touch.type !== TouchType.Start && touch.type !== TouchType.End && touch.type !== TouchType.Cancelled && timeDiffseconds > 0) {
          prevVelocityRef.current[touch.id] = {
            x: distX / timeDiffseconds / PixelRatio.get(),
            y: distY / timeDiffseconds / PixelRatio.get()
          };
        }

        const extendedTouchInfo = { ...touch,
          velocityX: (_prevVelocityRef$curr = (_prevVelocityRef$curr2 = prevVelocityRef.current[touch.id]) === null || _prevVelocityRef$curr2 === void 0 ? void 0 : _prevVelocityRef$curr2.x) !== null && _prevVelocityRef$curr !== void 0 ? _prevVelocityRef$curr : 0,
          velocityY: (_prevVelocityRef$curr3 = (_prevVelocityRef$curr4 = prevVelocityRef.current[touch.id]) === null || _prevVelocityRef$curr4 === void 0 ? void 0 : _prevVelocityRef$curr4.y) !== null && _prevVelocityRef$curr3 !== void 0 ? _prevVelocityRef$curr3 : 0
        }; // Save previous touch

        prevTouchInfoRef.current[touch.id] = touch;

        if (touch.type === TouchType.Start) {
          delete prevVelocityRef.current[touch.id];
          handlers.onStart && handlers.onStart(touch);
        } else if (touch.type === TouchType.Active) {
          handlers.onActive && handlers.onActive(extendedTouchInfo);
        } else {
          handlers.onEnd && handlers.onEnd(extendedTouchInfo);
        }
      }
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
/**
 * Provides a callback for handling touch events in the Skia View.
 * This touch handler only handles single touches.
 * @param handlers Callbacks for the different touch states
 * @param deps optional Dependency array to update the handlers
 * @returns A function that can be used from within the onDraw callback to
 * update and handle touch events. Call it with the touches property from
 * the info object.
 */


export const useTouchHandler = function (handlers) {
  let deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return useInternalTouchHandler(handlers, deps, false);
};
/**
 * Provides a callback for handling touch events in the Skia View.
 * This touch handler handles multiple touches.
 * @param handlers Callbacks for the different touch states
 * @param deps optional Dependency array to update the handlers
 * @returns A function that can be used from within the onDraw callback to
 * update and handle touch events. Call it with the touches property from
 * the info object.
 */

export const useMultiTouchHandler = function (handlers) {
  let deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return useInternalTouchHandler(handlers, deps, true);
};
//# sourceMappingURL=useTouchHandler.js.map