---
sidebar_position: 2
---

# 使用 React Native Gesture Handler

[React Native Gesture Handler](https://github.com/software-mansion/react-native-gesture-handler/) 是一个提供原生驱动的手势管理API，用于在 React Native 中构建最佳的基于触摸的体验。从 1.1.0 版本开始，你可以用它替代 PanResponder 来处理手势。

## 安装

```bash
yarn add react-native-gesture-handler
```

安装后，用 `<GestureHandlerRootView>` 或者 `gestureHandlerRootHOC` 包裹你的入口组件。

如:

```jsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  return <GestureHandlerRootView style={{ flex: 1 }}>{/* content */}</GestureHandlerRootView>;
}
```

更多信息，请参考 [React Native Gesture Handler 安装](https://docs.swmansion.com/react-native-gesture-handler/docs/installation)。

## 使用

为 SkiaChart/SvgChart 组件添加 `useRNGH` 属性。

```jsx
import { SkiaChart } from '@wuba/react-native-echarts';

export default function App() {
  return <SkiaChart useRNGH />;
}
```

请注意，当 react-native-gesture-handler 没有安装或 useRNGH 被设置为 false 时，该组件将退回到使用内置的PanResponder。

## 自定义手势

> 自定义手势只有在 `useRNGH` 设置为 true 时才能使用。

从 v1.2.0 版本开始，你可以通过 `gesture` 属性指定自定义手势。

它可以接受：
- 一个[手势](https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/gesture)
- 一个手势数组
- 一个[组合手势](https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/composed-gestures/)
- 一个回调函数，返回一个手势、一个手势数组或一个组合手势。它将为你提供两个参数：
  - `defaultGestures`，这是 React Native ECharts 设置的默认手势。
  - `dispatchEvents`，这是一个向 ZRender 发送事件的函数。(你应该只在复杂情况下需要它)


如果 `gesture` 属性是一个手势数组或返回一个手势数组，它们将被组成一个[竞争手势](https://docs.swmansion.com/react-native-gesture-handler/docs/gesture-composition/#race)。

这是一个[使用 react-native-gesture-handler 的大面积图的例子](../expo-snacks/large-area-chart-use-rngh).
