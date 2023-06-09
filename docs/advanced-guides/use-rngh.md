---
sidebar_position: 2
---

# Use React Native Gesture Handler

[React Native Gesture Handler](https://github.com/software-mansion/react-native-gesture-handler/) provides native-driven gesture management APIs for building best possible touch-based experiences in React Native. Starting from version 1.1.0, You can use it to handle gestures instead of PanResponder.

## Installation

```bash
yarn add react-native-gesture-handler
```

After installation, wrap your entry point with `<GestureHandlerRootView>` or `gestureHandlerRootHOC`.

For example:

```jsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  return <GestureHandlerRootView style={{ flex: 1 }}>{/* content */}</GestureHandlerRootView>;
}
```

for more information, please refer to [React Native Gesture Handler Installation](https://docs.swmansion.com/react-native-gesture-handler/docs/installation).

## Usage

add `useRNGH` prop to SkiaChart/SvgChart component.

```jsx
import { SkiaChart } from '@wuba/react-native-echarts';

export default function App() {
  return <SkiaChart useRNGH />;
}
```

Please note that when react-native-gesture-handler is not installed or useRNGH is set to false, the component will gracefully fall back to using the built-in PanResponder.

## Custom gestures

> Custom gestures are only available when `useRNGH` is set to true.

Starting from version v1.2.0, you can specify custom gestures via the `gesture` prop.

It can take:
- A [gesture](https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/gesture)
- A gesture array
- A [composed gesture](https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/composed-gestures/)
- A callback function returning a gesture, a gesture array or a composed gesture. It will provides you two args:
  - `defaultGestures`, which are the default gestures set by React Native ECharts.
  - `dispatchEvents`, which is a function to send events to ZRender. (You should only need it for complex cases)


If the `gesture` prop is a gesture array or returns a gesture array, they will be composed to a [Race gesture](https://docs.swmansion.com/react-native-gesture-handler/docs/gesture-composition/#race).

## Examples

- [Large area chart using react-native-gesture-handler](../expo-snacks/large-area-chart-use-rngh).
- [Custom gestures using react-native-gesture-handler](../expo-snacks/custom-gesture-use-rngh).
