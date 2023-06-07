import { Skia } from "../Skia";
import { useRawData } from "./Data";
const imgFactory = Skia.Image.MakeImageFromEncoded.bind(Skia.Image);
/**
 * Returns a Skia Image object
 * */

export const useImage = (source, onError) => useRawData(source, imgFactory, onError);
//# sourceMappingURL=Image.js.map