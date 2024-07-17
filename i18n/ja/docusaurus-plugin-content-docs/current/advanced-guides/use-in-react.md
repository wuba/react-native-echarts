---
sidebar_position: 3
---

# Reactでの使用方法

## [Create React App](https://github.com/facebook/create-react-app)で作成されたプロジェクト

追加の設定は必要ありません。

## カスタムReactプロジェクト

プロジェクトのwebpack設定に以下を追加して、`.web.*`ファイルの優先的な解析をサポートします。

```js
module.exports = {
  //...
  resolve: {
    extensions: [
      "web.mjs",
      "mjs",
      "web.js",
      "js",
      "web.ts",
      "ts",
      "web.tsx",
      "tsx",
      "json",
      "web.jsx",
      "jsx",
    ],
  },
};
```

