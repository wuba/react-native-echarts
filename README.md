# wrn-echarts

[React Native](https://reactnative.dev/) version of [Apache Echarts](https://github.com/apache/echarts), based on [react-native-svg](https://github.com/software-mansion/react-native-svg) and [react-native-skia](https://github.com/shopify/react-native-skia). Much better performance than webview based solution.

## Installation

```sh
yarn add wrn-echarts
```

Install [react-native-svg](https://github.com/software-mansion/react-native-svg#installation) or [react-native-skia](https://shopify.github.io/react-native-skia/docs/getting-started/installation/) according to your needs.

## Usage

![example](https://raw.githubusercontent.com/wuba/wrn-echarts/main/screenshots/example.jpg)

Most of the charts in echarts are supported, and the usage remains largely consistent. For more use cases and demo previews, you can download the [Taro Playground](https://github.com/wuba/taro-playground) app.

### Skia echarts
```js
// import { SkiaChart, SvgChart, SVGRenderer } from 'wrn-echarts';
import SkiaChart, { SVGRenderer } from 'wrn-echarts/skia';
import * as echarts from 'echarts/core';
import {
  BarChart,
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent
} from 'echarts/components';

// register extensions
echarts.use([
  TitleComponent,
  TooltipComponent,
  SVGRenderer,
  // ...
  BarChart,
])

const E_HEIGHT = 250;
const E_WIDTH = Dimensions.get('screen').width;

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
function App() {
  const option = {}
  return <SkiaComponent option={option} />
}
```

### SVG echarts
```js
import SvgChart, { SVGRenderer } from 'wrn-echarts/skia';
import * as echarts from 'echarts/core';
import {
  BarChart,
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent
} from 'echarts/components';

// register extensions
echarts.use([
  TitleComponent,
  TooltipComponent,
  SVGRenderer,
  // ...
  BarChart,
])

const E_HEIGHT = 250;
const E_WIDTH = Dimensions.get('screen').width;

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
function App() {
  const option = {}
  return <SvgComponent option={option} />
}
```
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

Apache-2.0

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
