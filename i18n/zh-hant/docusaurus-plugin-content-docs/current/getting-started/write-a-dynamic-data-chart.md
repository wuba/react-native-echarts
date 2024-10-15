---
sidebar_position: 4
---

# 撰寫動態數據圖表

我們試著使用 Svg 模式繪製一個包含柱狀圖和折線圖的動態數據變化圖表。它在瀏覽器端運作 [這裡](https://echarts.apache.org/examples/en/editor.html?c=dynamic-data)。

1. 首先，像之前的情況一樣匯入圖表依賴項。

條形圖需要匯入 BarChart，使用的其餘元件包括 ToolboxComponent、ToolboxComponent、TooltipComponent、LegendComponent、DataZoomComponent。

```tsx
import { BarChart } from 'echarts/charts';
import {
  ToolboxComponent,
  LegendComponent,
  TooltipComponent,
  DataZoomComponent,
} from 'echarts/components';
import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
```

如果您不確定要匯入哪些元件，如果您遇到錯誤報告，可以參考[此處](../trouble-shooting/troubleshooting/#error-echarts-component-xxx-is-used-but-not-imported)。

2. 使用 echarts.use 註冊渲染器和圖表。

```tsx
echarts.use([
  SVGRenderer,
  BarChart,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
]);
```

3. 為 SvgChart 建立一個 ref。

```tsx
export default function App() {
  const svgRef = useRef<any>(null);
  return <SvgChart ref={svgRef} />;
}
```

4. 寫入選項和數據切換功能。

```tsx
const categories = (function () {
  let now = new Date();
  let res = [];
  let len = 10;
  while (len--) {
    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
    now = new Date(+now - 2000);
  }
  return res;
})();
const categories2 = (function () {
  let res = [];
  let len = 10;
  while (len--) {
    res.push(10 - len - 1);
  }
  return res;
})();
const data = (function () {
  let res = [];
  let len = 10;
  while (len--) {
    res.push(Math.round(Math.random() * 1000));
  }
  return res;
})();
const data2 = (function () {
  let res = [];
  let len = 0;
  while (len < 10) {
    res.push(+(Math.random() * 10 + 5).toFixed(1));
    len++;
  }
  return res;
})();
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#283b56',
      },
    },
  },
  legend: {},
  toolbox: {
    show: true,
    feature: {
      dataView: { show: false, readOnly: false },
      restore: {},
    },
  },
  dataZoom: {
    show: false,
    start: 0,
    end: 100,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      data: categories,
    },
    {
      type: 'category',
      boundaryGap: true,
      data: categories2,
    },
  ],
  yAxis: [
    {
      type: 'value',
      scale: true,
      name: 'Price',
      max: 30,
      min: 0,
      boundaryGap: [0.2, 0.2],
    },
    {
      type: 'value',
      scale: true,
      name: 'Order',
      max: 1200,
      min: 0,
      boundaryGap: [0.2, 0.2],
    },
  ],
  series: [
    {
      name: 'Dynamic Bar',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: data,
    },
    {
      name: 'Dynamic Line',
      type: 'line',
      data: data2,
    },
  ],
};
```

5. 創建一個圖表實例並設置選項。

```tsx
let chart = echarts.init(svgRef.current, 'light', {
  renderer: 'svg',
  width: E_WIDTH,
  height: E_HEIGHT,
});
chart.setOption(option);
```

6. 實例創建後，定期更新數據，實現動畫。

```tsx
let count = 11;
inter = setInterval(function () {
  let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');

  data.shift();
  data.push(Math.round(Math.random() * 1000));
  data2.shift();
  data2.push(+(Math.random() * 10 + 5).toFixed(1));

  categories.shift();
  categories.push(axisData);
  categories2.shift();
  categories2.push(count++);

  chart.setOption({
    xAxis: [
      {
        data: categories,
      },
      {
        data: categories2,
      },
    ],
    series: [
      {
        data: data,
      },
      {
        data: data2,
      },
    ],
  });
}, 2100);
```

7. 使用 useEffect 確保圖表只初始化一次。 當元件解除安裝時，不要忘記處理圖表並清除計時器。

```tsx
useEffect(() => {
  return () => {
    chart?.dispose();
    clearInterval(inter);
  };
}, []);
```

就是這樣！這是代碼：

```tsx
import { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { Dimensions, StyleSheet, View } from 'react-native';
import { BarChart } from 'echarts/charts';
import {
  ToolboxComponent,
  LegendComponent,
  TooltipComponent,
  DataZoomComponent,
} from 'echarts/components';
import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';

echarts.use([
  SVGRenderer,
  BarChart,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
]);

const E_HEIGHT = 400;
const E_WIDTH = Dimensions.get('screen').width;

const categories = (function () {
  let now = new Date();
  let res = [];
  let len = 10;
  while (len--) {
    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
    now = new Date(+now - 2000);
  }
  return res;
})();
const categories2 = (function () {
  let res = [];
  let len = 10;
  while (len--) {
    res.push(10 - len - 1);
  }
  return res;
})();
const data = (function () {
  let res = [];
  let len = 10;
  while (len--) {
    res.push(Math.round(Math.random() * 1000));
  }
  return res;
})();
const data2 = (function () {
  let res = [];
  let len = 0;
  while (len < 10) {
    res.push(+(Math.random() * 10 + 5).toFixed(1));
    len++;
  }
  return res;
})();
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#283b56',
      },
    },
  },
  legend: {},
  toolbox: {
    show: true,
    feature: {
      dataView: { show: false, readOnly: false },
      restore: {},
    },
  },
  dataZoom: {
    show: false,
    start: 0,
    end: 100,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      data: categories,
    },
    {
      type: 'category',
      boundaryGap: true,
      data: categories2,
    },
  ],
  yAxis: [
    {
      type: 'value',
      scale: true,
      name: 'Price',
      max: 30,
      min: 0,
      boundaryGap: [0.2, 0.2],
    },
    {
      type: 'value',
      scale: true,
      name: 'Order',
      max: 1200,
      min: 0,
      boundaryGap: [0.2, 0.2],
    },
  ],
  series: [
    {
      name: 'Dynamic Bar',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: data,
    },
    {
      name: 'Dynamic Line',
      type: 'line',
      data: data2,
    },
  ],
};

export default () => {
  const svgRef = useRef(null);

  useEffect(() => {
    let chart;
    let inter;
    if (svgRef.current) {
      chart = echarts.init(svgRef.current, 'light', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);

      let count = 11;
      inter = setInterval(function () {
        let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');

        data.shift();
        data.push(Math.round(Math.random() * 1000));
        data2.shift();
        data2.push(+(Math.random() * 10 + 5).toFixed(1));

        categories.shift();
        categories.push(axisData);
        categories2.shift();
        categories2.push(count++);

        chart.setOption({
          xAxis: [
            {
              data: categories,
            },
            {
              data: categories2,
            },
          ],
          series: [
            {
              data: data,
            },
            {
              data: data2,
            },
          ],
        });
      }, 2100);
    }
    return () => {
      chart?.dispose();
      clearInterval(inter);
    };
  }, []);
  return (
    <View style={styles.container}>
      <SvgChart ref={svgRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

您應該看到以下螢幕：

| iOS                            | Android                                |
| ------------------------------ | -------------------------------------- |
| ![ios](./dynamic-data-ios.gif) | ![android](./dynamic-data-android.gif) |

如果您想使用 react-native-skia，只需將 SvgChart 替換為 SkiaChart，然後使用 `skia` 作為渲染器。

有關更多圖表配置，請參閱 [echarts 文檔](https://echarts.apache.org/en/option.html#title)。
