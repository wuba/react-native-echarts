---
sidebar_position: 2
---

# 使用 React Native Gesture Handler

[React Native Gesture Handler](https://github.com/software-mansion/react-native-gesture-handler/) 提供原生驅動的手勢管理 API，用於在 React Native 中構建最佳的基於觸控的體驗。 從 1.1.0 版本開始，您可以使用它來處理手勢，而不是 PanResponder。

## 安裝

```bash
yarn add react-native-gesture-handler
```

安裝後，用`包裹你的入口點<GestureHandlerRootView>` 或 `gestureHandlerRootHOC`。

例如：

```jsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  return <GestureHandlerRootView style={{ flex: 1 }}>{/* content */}</GestureHandlerRootView>;
}
```

有關更多資訊，請參閱 [React Native Gesture Handler 安裝](https://docs.swmansion.com/react-native-gesture-handler/docs/installation)。

## 用法

將 `useRNGH` 屬性新增至 SkiaChart/SvgChart 組件。

```jsx
import { SkiaChart } from '@wuba/react-native-echarts';

export default function App() {
  return <SkiaChart useRNGH />;
}
```

請注意，當未安裝 react-native-gesture-handler 或 useRNGH 設定為 false 時，元件將正常回退到使用內建 PanResponder。

## 自定義手勢

> 自訂手勢僅在 `useRNGH` 設為 true 時才可用。

從 v1.2.0 版本開始，您可以透過 `gesture` 屬性指定自訂手勢。

它可以接受：
- [手勢](https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/gesture)
- 一個手勢陣列
- [組合手勢](https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/composed-gestures/)
- 返回手勢、手勢陣列或組合手勢的回調函數。它將為您提供兩個參數：
  - `defaultGestures`，這是由React Native ECharts設置的默認手勢。
  - `dispatchEvents`，這是一個向ZRender發送事件的函數。（僅在複雜情況下才需要使用）


如果 `gesture` 屬性是手勢陣列或返回手勢陣列，它們將組成[種族手勢](https://docs.swmansion.com/react-native-gesture-handler/docs/gesture-composition/#race)。

## Examples

- [使用 react-native-gesture-handler 的大面積圖表](../expo-snacks/large-area-chart-use-rngh).
- [使用 react-native-gesture-handler 自訂手勢](../expo-snacks/custom-gesture-use-rngh).
