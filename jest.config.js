module.exports = {
  preset: "react-native",
  modulePathIgnorePatterns: [
    "<rootDir>/example/node_modules",
    "<rootDir>/lib/"
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native.*|@react-native.*|@?react-navigation.*|@shopify/react-native-skia|zrender)/)',
  ],
  setupFiles: [
    '@shopify/react-native-skia/jestSetup.js',
    'react-native-gesture-handler/jestSetup.js',
    './jestSetup.js'
  ],
};