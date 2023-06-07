import { useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import { Skia } from "../Skia";
import { isRNModule } from "../types";

const resolveAsset = source => {
  return isRNModule(source) ? Image.resolveAssetSource(source).uri : source.default;
};

const factoryWrapper = (data2, factory, onError) => {
  const factoryResult = factory(data2);

  if (factoryResult === null) {
    onError && onError(new Error("Could not load data"));
    return null;
  } else {
    return factoryResult;
  }
};

const loadData = (source, factory, onError) => {
  if (source === null || source === undefined) {
    return new Promise(resolve => resolve(null));
  } else if (source instanceof Uint8Array) {
    return new Promise(resolve => resolve(factoryWrapper(Skia.Data.fromBytes(source), factory, onError)));
  } else {
    const uri = typeof source === "string" ? source : resolveAsset(source);
    return Skia.Data.fromURI(uri).then(d => factoryWrapper(d, factory, onError));
  }
};

const useLoading = (source, loader) => {
  const mounted = useRef(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    mounted.current = true;
    loader().then(value => {
      if (mounted.current) {
        setData(value);
      }
    });
    return () => {
      mounted.current = false;
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);
  return data;
};

export const useRawData = (source, factory, onError) => useLoading(source, () => loadData(source, factory, onError));

const identity = data => data;

export const useData = (source, onError) => useRawData(source, identity, onError);
//# sourceMappingURL=Data.js.map