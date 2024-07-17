---
sidebar_position: 3
---

# 在 React 中使用

## 使用 [Create React App](https://github.com/facebook/create-react-app) 创建的项目

不需要額外的配置。

## 自訂的 React 專案

在專案的webpack配置中新增以下內容，以支援優先解析 `.web.*` 檔案。

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
