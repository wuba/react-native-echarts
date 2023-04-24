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
