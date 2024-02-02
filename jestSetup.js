const { Skia } = require("@shopify/react-native-skia");
Skia.SVG.MakeFromString = (svg) => svg;
globalThis.navigator = {
  product: "ReactNative",
  userAgent: "Node.js",
};
