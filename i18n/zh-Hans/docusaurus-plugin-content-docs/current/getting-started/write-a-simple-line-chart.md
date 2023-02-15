---
sidebar_position: 3
---

# 写一个简单的折线图

接下来让我们试着画一下最基本的图 -- 基本折线图。

为了看看它在浏览器中的样子，你可以访问 [echarts 编辑器](https://echarts.apache.org/examples/en/editor.html?c=line-simple)，并尝试修改配置，看看有什么变化。

1. 导入 echarts、wrn-echarts、react。这里我只导入了 SkiaChart 和 SVGRenderer。

```tsx
import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { SVGRenderer, SkiaChart } from 'wrn-echarts';
```

2. 使用 echarts.use 来注册渲染器和图表。

```tsx
echarts.use([SVGRenderer, LineChart, GridComponent]);
```

3. 为 SkiaChart 组件创建一个 Ref。

```tsx
export default function App() {
  const skiaRef = useRef<any>(null);
  return <SkiaChart ref={skiaRef} />;
}
```

4. 编写图表的选项。

```tsx
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
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
    },
  ],
};
```

5. 创建一个图表实例并设置选项。

```tsx
let chart = echarts.init(skiaRef.current, 'light', {
  renderer: 'svg',
  width: 400,
  height: 400,
});
chart.setOption(option);
```

6. 使用 useEffect 来确保图表只被初始化一次。并在组件卸载时释放图表。

```tsx
useEffect(() => {
  return () => chart?.dispose();
}, []);
```

这就是了! 这里是代码：
```tsx
import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { SVGRenderer, SkiaChart } from 'wrn-echarts';

echarts.use([SVGRenderer, LineChart, GridComponent]);

export default function App() {
  const skiaRef = useRef<any>(null);
  useEffect(() => {
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
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    };
    let chart: any;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: 400,
        height: 400,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, []);

  return <SkiaChart ref={skiaRef} />;
}
```
你可以看到以下画面：

| iOS | Android |
| --- | --- |
| ![ios](./ios-line.png) | ![android](./android-line.jpg) |

如果你想使用 react-native-svg，只需将 SkiaChart 替换为 SvgChart。

接下来你可以从 [echarts 示例](https://echarts.apache.org/examples/en/index.html) 中找到更多在wrn-echarts 中使用的配置。