/*global SkiaApi*/
import { useMemo } from "react";
import { Skia } from "../Skia";
import { useTypeface } from "./Typeface";
/**
 * Returns a Skia Font object
 * */

export const useFont = (font, size, onError) => {
  const typeface = useTypeface(font, onError);
  return useMemo(() => {
    if (typeface && size) {
      return Skia.Font(typeface, size);
    } else if (typeface && !size) {
      return Skia.Font(typeface);
    } else {
      return null;
    }
  }, [size, typeface]);
};
//# sourceMappingURL=Font.js.map