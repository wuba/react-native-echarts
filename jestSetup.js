const { Skia } = require('@shopify/react-native-skia');
Skia.SVG.MakeFromString = (svg) => svg;
// eslint-disable-next-line no-undef
globalThis.navigator = {
  product: 'ReactNative',
  userAgent: 'Node.js',
};
