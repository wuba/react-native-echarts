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

[React Native](https://reactnative.dev/) version of [Apache Echarts](https://github.com/apache/echarts), based on [react-native-svg](https://github.com/software-mansion/react-native-svg) and [react-native-skia](https://github.com/shopify/react-native-skia). This awesome library offers significantly improved performance compared to WebView-based solutions.

Checkout the full documentation [here](https://wuba.github.io/react-native-echarts/).

## About

* 🔥 The same usage as Apache ECharts
* 🎨 Rich charts, covering almost all usage scenarios
* ✨ Optional rendering library: [Skia](https://github.com/shopify/react-native-skia) or [SVG](https://github.com/software-mansion/react-native-svg)
* 🚀 Reusable code with web
* 📱 Support gestures such as tapping, dragging and zooming

## Installation

```sh
yarn add @wuba/react-native-echarts echarts
```

Install [react-native-svg](https://github.com/software-mansion/react-native-svg#installation) or [react-native-skia](https://shopify.github.io/react-native-skia/docs/getting-started/installation/) according to your needs.

> The latest versions of echarts, react-native-svg, and react-native-skia are recommended

## Usage

![example](https://raw.githubusercontent.com/wuba/react-native-echarts/main/screenshots/example.jpg)

Most of the charts in ECharts are supported, and the usage remains largely consistent. For more use cases and demo previews, you can download the [Taro Playground](https://github.com/wuba/taro-playground) app.

### Example
```js
// Choose your preferred renderer
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

// Register extensions
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

// Initialize
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

  // Choose your preferred chart component
  // return <SkiaChart ref={chartRef} />;
  return <SvgChart ref={chartRef} />;
}

// Component usage
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

### Use only one of SvgChart or SkiaChart
```js
import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';
```
or
```js
import SkiaChart, { SVGRenderer } from '@wuba/react-native-echarts/skiaChart';
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

Apache-2.0

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
