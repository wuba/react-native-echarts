import { useEffect } from "react";

/**
 * Sets up an effect that will be run whenever the value changes
 * @param value Value to subscribe to changes on
 * @param cb Callback to run when value changes
 */
export const useValueEffect = (value, cb) => {
  useEffect(() => {
    return value.addListener(cb); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
};
//# sourceMappingURL=useValueEffect.js.map