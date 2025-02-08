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

[React Native](https://reactnative.dev/) バージョンの [Apache Echarts](https://github.com/apache/echarts)、[react-native-svg](https://github.com/software-mansion/react-native-svg) と [react-native-skia](https://github.com/shopify/react-native-skia) に基づいています。WebViewベースのソリューションと比較して、顕著なパフォーマンス向上を提供します。

[公式サイトで完全なドキュメントを確認できます](https://wuba.github.io/react-native-echarts/zh-Hans/)。

## 概要

* 🔥 Apache EChartsと同じ使い方
* 🎨 豊富なチャートサポート、ほぼすべての使用シーンをカバー
* ✨ 選択可能なレンダリングライブラリ：[Skia](https://github.com/shopify/react-native-skia) または [SVG](https://github.com/software-mansion/react-native-svg)
* 🚀 Webと再利用可能なコード
* 📱 クリック、ドラッグ、ズームなどのジェスチャーサポート

## インストール

```sh
yarn add @wuba/react-native-echarts echarts
```

[react-native-svg](https://github.com/software-mansion/react-native-svg#installation) または [react-native-skia](https://shopify.github.io/react-native-skia/docs/getting-started/installation/) を必要に応じてインストールしてください。

> 最新バージョンの echarts、react-native-svg、および react-native-skia の使用をお勧めします

## 使用方法

![example](https://raw.githubusercontent.com/wuba/react-native-echarts/main/screenshots/example.jpg)

ほとんどのEChartsのチャートがサポートされており、使用方法は基本的に同じです。より多くの使用例やデモのプレビューについては、[Taro Playground](https://github.com/wuba/taro-playground) アプリケーションをダウンロードしてください。

### 例
```js
// 好きなレンダラーを選択
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

// 拡張コンポーネントを登録
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

// 初期化
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

  // 好きなチャートコンポーネントを選択
  // return <SkiaChart ref={chartRef} />;
  return <SvgChart ref={chartRef} />;
}

// コンポーネントの使用
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

### SvgChart または SkiaChart のみを使用
```js
import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';
```
または
```js
import SkiaChart, { SkiaRenderer } from '@wuba/react-native-echarts/skiaChart';
```

## 貢献

リポジトリに貢献する方法や開発ワークフローについては、[貢献ガイド](CONTRIBUTING.md) を参照してください。

## 貢献者

このプロジェクトの存在は、貢献してくれたすべての人々のおかげです：

[![](https://opencollective.com/react-native-echarts/contributors.svg?width=890&showBtn=false)](https://github.com/wuba/react-native-echarts/graphs/contributors)

## ライセンス

Apache-2.0

---

[create-react-native-library](https://github.com/callstack/react-native-builder-bob) を使用して作成されました。