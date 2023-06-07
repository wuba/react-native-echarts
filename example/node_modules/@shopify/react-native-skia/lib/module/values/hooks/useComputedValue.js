import { useEffect, useMemo } from "react";
import { ValueApi } from "../api";
import { isValue } from "../../renderer/processors/Animations";
/**
 * Creates a new computed value - a value that will calculate its value depending
 * on other values.
 * @param cb Callback to calculate new value
 * @param values Dependant values
 * @returns A readonly value
 */

export const useComputedValue = (cb, values) => {
  const value = useMemo(() => ValueApi.createComputedValue(cb, values.filter(isValue)), // eslint-disable-next-line react-hooks/exhaustive-deps
  values);
  useEffect(() => () => value.__invalidate(), [value]);
  return value;
};
//# sourceMappingURL=useComputedValue.js.map