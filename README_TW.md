[![](./logo.svg)](https://wuba.github.io/react-native-echarts/)
=

[![npm version](https://img.shields.io/npm/v/@wuba/react-native-echarts.svg?style=flat)](https://www.npmjs.com/package/@wuba/react-native-echarts)
[![npm downloads](https://img.shields.io/npm/dm/@wuba/react-native-echarts)](https://www.npmjs.com/package/@wuba/react-native-echarts)
[![codecov](https://codecov.io/gh/wuba/react-native-echarts/graph/badge.svg?token=BF6LGEXO55)](https://codecov.io/gh/wuba/react-native-echarts)
[![issues](https://img.shields.io/github/issues/wuba/react-native-echarts.svg?style=flat)](https://github.com/wuba/react-native-echarts/issues)
[![GitHub contributors](https://img.shields.io/github/contributors/wuba/react-native-echarts.svg?style=flat)](https://github.com/wuba/react-native-echarts/graphs/contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/wuba/react-native-echarts/pulls)
[![license](https://img.shields.io/github/license/wuba/react-native-echarts.svg?style=flat)](https://github.com/wuba/react-native-echarts/blob/main/LICENSE)

[简体中文](./README_CN.md) | [English](./README.md) | [日本語](./README_JP.md) | [繁體中文](./README_TW.md)

[React Native](https://reactnative.dev/) 版本的 [Apache Echarts](https://github.com/apache/echarts)，基於 [react-native-svg](https://github.com/software-mansion/react-native-svg) 和 [react-native-skia](https://github.com/shopify/react-native-skia)。相比基於 WebView 的解決方案提供了顯著的性能提升。

可在[官網查看完整的文檔](https://wuba.github.io/react-native-echarts/zh-hant/)。

## 關於

* 🔥 與 Apache ECharts 的使用方式相同
* 🎨 豐富的圖表支持，涵蓋幾乎所有的使用場景
* ✨ 可選的渲染庫：[Skia](https://github.com/shopify/react-native-skia) 或 [SVG](https://github.com/software-mansion/react-native-svg)
* 🚀 可與 Web 復用的代碼
* 📱 支持點擊、拖拽、縮放等手勢

## 安裝

```sh
yarn add @wuba/react-native-echarts echarts
```

根據您的需要安裝 [react-native-svg](https://github.com/software-mansion/react-native-svg#installation) 或 [react-native-skia](https://shopify.github.io/react-native-skia/docs/getting-started/installation/)。

> 推薦使用最新版本的 echarts、react-native-svg 和 react-native-skia

## 用法

![example](https://raw.githubusercontent.com/wuba/react-native-echarts/main/screenshots/example.jpg)

大多數 ECharts 中的圖表都受支持，使用方法基本保持一致。關於更多使用案例和演示預覽，您可以下載 [Taro Playground](https://github.com/wuba/taro-playground) 應用程序。

### 示例
```js
// 選擇您喜歡的渲染器
// import { SkiaChart, SVGRenderer } from '@wuba/react-native-echarts';
import { SvgChart, SVGRenderer } from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import { useRef, useEffect } from 'react';
import {
  BarChart,
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components';

// 註冊擴展組件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
  // ...
  BarChart,
])

const E_HEIGHT = 250;
const E_WIDTH = 300;

// 初始化
function ChartComponent({ option }) {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    let chart: any;
    if (chartRef.current) {
      // @ts-ignore
      chart = echarts.init(chartRef.current, 'light', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option]);

  // 選擇你偏愛的圖表組件
  // return <SkiaChart ref={chartRef} />;
  return <SvgChart ref={chartRef} />;
}

// 組件使用
export default function App() {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
  }
  return <ChartComponent option={option} />
}
```

### 只使用 SvgChart 或 SkiaChart 中的一個
```js
import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';
```
或
```js
import SkiaChart, { SkiaRenderer } from '@wuba/react-native-echarts/skiaChart';
```

## 貢獻

請參閱 [貢獻指南](CONTRIBUTING.md) 以了解如何為倉庫做出貢獻以及開發工作流程。

## 貢獻者

這個項目的存在要感謝所有做出貢獻的人：

[![](https://opencollective.com/react-native-echarts/contributors.svg?width=890&showBtn=false)](https://github.com/wuba/react-native-echarts/graphs/contributors)

## 許可

Apache-2.0

---

使用 [create-react-native-library](https://github.com/callstack/react-native-builder-bob) 創建。