[![](./logo.svg)](https://wuba.github.io/react-native-echarts/)
=

[React Native](https://reactnative.dev/) version of [Apache Echarts](https://github.com/apache/echarts), based on [react-native-svg](https://github.com/software-mansion/react-native-svg) and [react-native-skia](https://github.com/shopify/react-native-skia). Much better performance than webview based solution.

Checkout the full documentation [here](https://wuba.github.io/react-native-echarts/).

## About

* 🔥 The same way as Apache ECharts
* 🎨 Rich charts, covering almost all usage scenarios
* ✨ Optional rendering library, [Skia](https://github.com/shopify/react-native-skia) or [SVG](https://github.com/software-mansion/react-native-svg)
* 🚀 Able to reuse code with web
* 📱 Support for zoom gestures

## Installation

```sh
yarn add @wuba/react-native-echarts echarts
```

Install [react-native-svg](https://github.com/software-mansion/react-native-svg#installation) or [react-native-skia](https://shopify.github.io/react-native-skia/docs/getting-started/installation/) according to your needs.

> The latest versions of echarts, react-native-svg and react-native-skia are recommended

## Usage

![example](https://raw.githubusercontent.com/wuba/react-native-echarts/main/screenshots/example.jpg)

Most of the charts in echarts are supported, and the usage remains largely consistent. For more use cases and demo previews, you can download the [Taro Playground](https://github.com/wuba/taro-playground) app.

### Skia echarts
```js
// import { SkiaChart, SVGRenderer } from '@wuba/react-native-echarts';
import SkiaChart, { SVGRenderer } from '@wuba/react-native-echarts/skiaChart';
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

// register extensions
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

// initial
function SkiaComponent({ option }) {
  const skiaRef = useRef<any>(null);

  useEffect(() => {
    let chart: any;
    if (skiaRef.current) {
      // @ts-ignore
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option]);

  return <SkiaChart ref={skiaRef} />;
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
  return <SkiaComponent option={option} />
}
```

### SVG echarts
```js
// import { SvgChart, SVGRenderer } from '@wuba/react-native-echarts';
import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';
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

// register extensions
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

// initial
function SvgComponent({ option }) {
  const svgRef = useRef<any>(null);

  useEffect(() => {
    let chart: any;
    if (svgRef.current) {
      // @ts-ignore
      chart = echarts.init(svgRef.current, 'light', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option]);

  return <SvgChart ref={svgRef} />;
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
  return <SvgComponent option={option} />
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
