import React, { useMemo, lazy, Suspense } from "react";
import { Platform } from "react-native";
import { LoadSkiaWeb } from "./LoadSkiaWeb";
export const WithSkiaWeb = _ref => {
  let {
    getComponent,
    fallback,
    opts
  } = _ref;
  const Inner = useMemo( // TODO: investigate
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  () => /*#__PURE__*/lazy(async () => {
    if (Platform.OS === "web") {
      await LoadSkiaWeb(opts);
    } else {
      console.warn("<WithSkiaWeb /> is only necessary on web. Consider not using on native.");
    }

    return getComponent();
  }), [getComponent, opts]);
  return /*#__PURE__*/React.createElement(Suspense, {
    fallback: fallback !== null && fallback !== void 0 ? fallback : null
  }, /*#__PURE__*/React.createElement(Inner, null));
};
//# sourceMappingURL=WithSkiaWeb.js.map