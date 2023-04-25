---
sidebar_position: 3
---

# Use in React

## Projects created with [Create React App](https://github.com/facebook/create-react-app)

No additional configuration is required.

## Custom React Projects

Add the following to the project's webpack configuration to support preferential parsing of `.web.*` files.

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
