module.exports = {
  preset: 'react-native',
  testEnvironment: '<rootDir>/jest.skia-env.js',
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/lib/',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native.*|@react-native.*|@?react-navigation.*|@shopify/react-native-skia|zrender|echarts)/)',
  ],
  setupFiles: ['react-native-gesture-handler/jestSetup.js'],
  setupFilesAfterEnv: ['./jest.skia-setup.js', './jestSetup.js'],
  testTimeout: 10000,
};
