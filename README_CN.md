[![](./logo.svg)](https://wuba.github.io/react-native-echarts/)
=

[![npm version](https://img.shields.io/npm/v/@wuba/react-native-echarts.svg?style=flat)](https://www.npmjs.com/package/@wuba/react-native-echarts)
[![npm downloads](https://img.shields.io/npm/dm/@wuba/react-native-echarts)](https://www.npmjs.com/package/@wuba/react-native-echarts)
[![codecov](https://codecov.io/gh/wuba/react-native-echarts/graph/badge.svg?token=BF6LGEXO55)](https://codecov.io/gh/wuba/react-native-echarts)
[![issues](https://img.shields.io/github/issues/wuba/react-native-echarts.svg?style=flat)](https://github.com/wuba/react-native-echarts/issues)
[![GitHub contributors](https://img.shields.io/github/contributors/wuba/react-native-echarts.svg?style=flat)](https://github.com/wuba/react-native-echarts/graphs/contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/wuba/react-native-echarts/pulls)
[![license](https://img.shields.io/github/license/wuba/react-native-echarts.svg?style=flat)](https://github.com/wuba/react-native-echarts/blob/main/LICENSE)

[简体中文](./README_CN.md) | [English](./README.md)

[React Native](https://reactnative.dev/) 版本的 [Apache Echarts](https://github.com/apache/echarts)，基于 [react-native-svg](https://github.com/software-mansion/react-native-svg) 和 [react-native-skia](https://github.com/shopify/react-native-skia)。相比基于 WebView 的解决方案提供了显著的性能提升。

可在[官网查看完整的文档](https://wuba.github.io/react-native-echarts/zh-Hans/)。

## 关于

* 🔥 与 Apache ECharts 的使用方式相同
* 🎨 丰富的图表支持，涵盖几乎所有的使用场景
* ✨ 可选的渲染库：[Skia](https://github.com/shopify/react-native-skia) 或 [SVG](https://github.com/software-mansion/react-native-svg)
* 🚀 可与 Web 复用的代码
* 📱 支持点击、拖拽、缩放等手势

## 安装

```sh
yarn add @wuba/react-native-echarts echarts
```

根据您的需要安装 [react-native-svg](https://github.com/software-mansion/react-native-svg#installation) 或 [react-native-skia](https://shopify.github.io/react-native-skia/docs/getting-started/installation/)。

> 推荐使用最新版本的 echarts、react-native-svg 和 react-native-skia

## 用法

![example](https://raw.githubusercontent.com/wuba/react-native-echarts/main/screenshots/example.jpg)

大多数 ECharts 中的图表都受支持，使用方法基本保持一致。关于更多使用案例和演示预览，您可以下载 [Taro Playground](https://github.com/wuba/taro-playground) 应用程序。

### 示例
```js
// 选择您喜欢的渲染器
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

// 注册扩展组件
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

  // 选择你偏爱的图表组件
  // return <SkiaChart ref={chartRef} />;
  return <SvgChart ref={chartRef} />;
}

// 组件使用
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

### 只使用 SvgChart 或 SkiaChart 中的一个
```js
import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';
```
或
```js
import SkiaChart, { SVGRenderer } from '@wuba/react-native-echarts/skiaChart';
```

## 贡献

请参阅 [贡献指南](CONTRIBUTING.md) 以了解如何为仓库做出贡献以及开发工作流程。

## 许可

Apache-2.0

---

使用 [create-react-native-library](https://github.com/callstack/react-native-builder-bob) 创建。
