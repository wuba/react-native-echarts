---
sidebar_position: 1
---

# 個別にインポートする

もし、react-native-skia レンダラーのみを使用する場合は、SkiaRenderer と SkiaChart を個別にインポートすることができます。
```tsx
import SkiaChart, { SkiaRenderer } from '@wuba/react-native-echarts/skiaChart';
```

もし、react-native-svg レンダラーのみを使用する場合は、SVGRenderer と SvgChart を個別にインポートすることができます。
```tsx
import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';
```