---
sidebar_position: 2
---

# React Native Gesture Handler の使用方法

[React Native Gesture Handler](https://github.com/software-mansion/react-native-gesture-handler/) は、React Native で最高のタッチベースのエクスペリエンスを構築するためのネイティブ駆動のジェスチャー管理 API を提供します。バージョン 1.1.0 以降では、PanResponder の代わりにジェスチャーを処理するために使用することができます。

## インストール

```bash
yarn add react-native-gesture-handler
```

インストール後、エントリーポイントを `<GestureHandlerRootView>` または `gestureHandlerRootHOC` でラップします。

例:

```jsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  return <GestureHandlerRootView style={{ flex: 1 }}>{/* content */}</GestureHandlerRootView>;
}
```

詳細については、[React Native Gesture Handler のインストール](https://docs.swmansion.com/react-native-gesture-handler/docs/installation)を参照してください。

## 使用方法

SkiaChart/SvgChart コンポーネントに `useRNGH` プロップを追加します。

```jsx
import { SkiaChart } from '@wuba/react-native-echarts';

export default function App() {
  return <SkiaChart useRNGH />;
}
```

`react-native-gesture-handler` がインストールされていない場合や `useRNGH` が false に設定されている場合、コンポーネントは内部の PanResponder を使用して優雅にフォールバックします。

## カスタムジェスチャー

> `useRNGH` が true に設定されている場合のみ、カスタムジェスチャーが利用可能です。

バージョン v1.2.0 以降では、`gesture` プロップを使用してカスタムジェスチャーを指定することができます。

次のものを指定できます:
- [ジェスチャー](https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/gesture)
- ジェスチャーの配列
- [複合ジェスチャー](https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/composed-gestures/)
- ジェスチャー、ジェスチャーの配列、または複合ジェスチャーを返すコールバック関数。2 つの引数が提供されます:
  - `defaultGestures`：React Native ECharts によって設定されたデフォルトのジェスチャーです。
  - `dispatchEvents`：ZRender にイベントを送信するための関数です。（複雑な場合にのみ必要です）

`gesture` プロップがジェスチャーの配列である場合、またはジェスチャーの配列を返す場合、それらは [Race ジェスチャー](https://docs.swmansion.com/react-native-gesture-handler/docs/gesture-composition/#race) に結合されます。

## 例

- [react-native-gesture-handler を使用した大規模なエリアチャート](../expo-snacks/large-area-chart-use-rngh).
- [react-native-gesture-handler を使用したカスタムジェスチャー](../expo-snacks/custom-gesture-use-rngh).

