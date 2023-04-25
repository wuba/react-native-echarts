---
sidebar_position: 3
---

# 在 React 中使用

## 使用 [Create React App](https://github.com/facebook/create-react-app) 创建的项目

无需额外配置。

## 自定义的 React 项目

在项目的 webpack 配置中添加以下内容，以支持优先解析 `.web.*` 文件。

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
