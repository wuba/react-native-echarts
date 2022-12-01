# wrn-echarts

react-native-echarts

## Installation

```sh
npm install wrn-echarts
```

## Usage

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

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
