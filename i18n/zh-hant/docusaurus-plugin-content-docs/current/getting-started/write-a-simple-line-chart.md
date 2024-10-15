---
sidebar_position: 3
---

# 寫一個簡單的折線圖

接下來我們試著繪製最基本的圖表—基本折線圖。

要查看在瀏覽器中的樣子，您可以訪問 [echarts 編輯器](https://echarts.apache.org/examples/en/editor.html?c=line-simple)並嘗試將配置修改為看到變化。

1. 導入 echarts、@wuba/react-native-echarts 和 react。這裡我只導入了 SkiaChart 和 SkiaRenderer。

```tsx
import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { SkiaRenderer, SkiaChart } from '@wuba/react-native-echarts';
```

2. 使用 echarts.use 註冊渲染器和圖表。

```tsx
echarts.use([SkiaRenderer, LineChart, GridComponent]);
```

3. 為 SkiaChart 創建一個 ref。

```tsx
export default function App() {
  const skiaRef = useRef<any>(null);
  return <SkiaChart ref={skiaRef} />;
}
```

4. 編寫圖表選項。

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

5. 建立一個圖表例項並設定選項。

```tsx
let chart = echarts.init(skiaRef.current, 'light', {
  renderer: 'skia',
  width: 400,
  height: 400,
});
chart.setOption(option);
```

6. 使用useEffect確保圖表只初始化一次。 當元件解除安裝時，處理圖表。

```tsx
useEffect(() => {
  return () => chart?.dispose();
}, []);
```

就是這樣！這是代碼：
```tsx
import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { SkiaRenderer, SkiaChart } from '@wuba/react-native-echarts';

echarts.use([SkiaRenderer, LineChart, GridComponent]);

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
        renderer: 'skia',
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
您應該看到以下螢幕：

| iOS | Android |
| --- | --- |
| ![ios](./ios-line.png) | ![android](./android-line.jpg) |

如果您想使用 react-native-svg，只需將 SkiaChart 替換為 SvgChart 即可，並使用 “svg” 作為渲染器。

接下來，您可以從 [echarts 示例](https://echarts.apache.org/examples/en/index.html)中找到更多用於 @wuba/react-native-echarts 的配置。