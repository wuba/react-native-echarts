import { useMemo } from "react";

/**
 * Creates a memoized callback for the onDraw handler of a Skia component.
 * @param callback The callback to memoize.
 * @param deps Dependencies for the callback.
 * */
export const useDrawCallback = function (callback) {
  let deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return useMemo(() => {
    return callback; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
//# sourceMappingURL=useDrawCallback.js.map