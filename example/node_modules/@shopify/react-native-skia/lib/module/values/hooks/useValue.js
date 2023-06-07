import { useMemo } from "react";
import { ValueApi } from "../api";

/**
 * Creates a new value that holds some data.
 * @param v Value to hold
 * @returns A Value of type of v
 */
export const useValue = v => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ValueApi.createValue(v), []);
};
//# sourceMappingURL=useValue.js.map