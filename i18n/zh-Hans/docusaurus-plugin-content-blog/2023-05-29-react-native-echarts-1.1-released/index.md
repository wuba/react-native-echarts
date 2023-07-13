---
slug: react-native-echarts-1.1-released
title: React Native Echarts 1.1 发布了！
authors: [yechunxi]
tags: [website]
---

![](@site/static/img/logo-with-title.svg)

[@wuba/react-native-echart](https://github.com/wuba/react-native-echarts/) 开源项目公开发布已经有一段时间了，我们非常高兴的宣布稳定版 1.1 正式发布了 🎉🎉🎉。

[@wuba/react-native-echart](https://github.com/wuba/react-native-echarts/)是一个基于 [react-native-svg](https://github.com/software-mansion/react-native-svg) 与 [react-native-skia](https://github.com/shopify/react-native-skia)，使用 RN 原生组件来渲染 Echarts 的图表，相比 Webview 的解决方案，性能有了很大的提升。如果想要了解更多项目设计原理，可以参考[这里](https://juejin.cn/post/7199529508112711738)。


为了大家能够更加直观和准确的了解项目的特性，我们决定将最初的 `wrn-echarts` 正式更名为 `@wuba/react-native-echarts`。在新的版本中，我们增加对[react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler) 手势方案的支持等等，接下来我们一起来看下有哪些特性吧。

- 官网：https://wuba.github.io/react-native-echarts/
- github: https://github.com/wuba/react-native-echarts/

## 特性

###  全面丰富的图表支持

`@wuba/react-native-echart` 是一个将 Echarts 图表库应用于 React Native 应用中的解决方案，它采用 React Native 原生组件的渲染方式，从而大幅提升了渲染速度。支持常见的各种折线图、面积图、柱状图、散点图，还是更复杂的 K 线图、热力图等，能够满足各种不同场景下的可视化需求。

以下是一些常见的图表类型示例：

![](./examples.png)

除了常用的图表类型外，`@wuba/react-native-echart` 还支持其他各种图形，如树图、热力图和 K线图 等，下面是对应的图表示例：

![](examples_specialty.png)


此外，我们还支持各种动态图表，以下是一些图表示例。图一和图二展示了关于多个国家人均收入的动态变化。图一呈现了近 70 年人均收入的增长趋势，而图二展示了近 82 年时 10 个国家人均收入的动态排序。图三展示了随着时间变化而不断更新的速度仪表盘，而图四则展示了动态增加节点的图表。

这些图表能够根据不断变化的数据实现动态重新渲染。无论数据更新频率如何，它们都能够表现出色的渲染性能。

![](./animation_1.gif)
![](./animation_2.gif)

`@wuba/react-native-echart` 支持图表类型非常丰富，不一一在此展示。如果想了解更全面的图表类型，可以去[taro-playground](https://github.com/wuba/taro-playground)这里查看。在这里可以找到包含各种 Echarts 图表类型的示例 Demo。


###  支持 SVG 与 Skia 

`@wuba/react-native-echart` 支持 Svg 和 Skia 两种渲染方式，它基于 `react-native-svg` 和 `react-native-skia` 实现。两种渲染方式如何选择？从渲染速度的角度来看，Svg 和 Skia 的性能表现相对接近，如下图所示。但是，需要注意的是，比如在中文支持方面，Skia 渲染存在一些限制，需要去声明设置字体才能正确显示中文字符。因此，在选择渲染库时，考虑项目的语言需求和对中文支持的重要性，根据具体情况选择合适的渲染方式，以实现最佳的性能和用户体验。

![](./animation_3.gif)
![](./animation_4.gif)
![](./animation_5.gif)

###  支持各种手势

支持点击、拖拽、缩放等各种手势。默认情况下，我们使用 React Native 自带的 `PanResponder` 来处理这些手势操作。在 1.1 版本之后，我们增加了对 `react-native-gesture-handler` 手势库的支持。如果项目中已经引入了该 手势库，建议直接使用该库来处理手势操作，以获得更出色稳定的性能和体验。

下面是对比两种手势方案的效果，从图表滑动的流畅程度来看，无论是默认手势处理还是采用 `react-native-gesture-handler` 处理，手势滑动都非常的流畅，您可以根据自己的需求选择采用哪种方式。

![](./animation_6.gif)
![](./animation_7.gif)
![](./animation_8.gif)

###  支持 Web 复用

我们还支持将 `@wuba/react-native-echart` 的组件复用到 Web 端，以满足跨端需求并实现多端代码共享。轻松实现代码的统一性，并确保图表在不同平台上的一致性，也提升我们开发的效率。

ECharts 图表库在 Web 端提供了丰富的在线渲染案例，那么在 React Native 上是否能够保持一致？我们为此提供了相应的在线预览和测试支持，你可以直接复制图表配置，以查看其在 React Native 上的渲染效果。[点击在线预览](https://wuba.github.io/react-native-echarts/zh-Hans/docs/expo-snacks/simple-line-chart)

## 后续规划

尽管我们已经在对 Echarts 的支持方面做得相当丰富和完善，但我们仍然致力于进一步的优化和提升。在接下来的工作中，我们将从以下几个方面进行优化和改进，以提供更加精益求精的功能。点击[这里](https://github.com/orgs/wuba/projects/10)查看更多详细信息和进展情况。

### 性能提升

相较于使用 Webview 的渲染方案 `@wuba/react-native-echart`  在整体渲染性能方面取得了显著的提升。然而，在处理大数据量时，组件的渲染速度和内存占用方面仍有进一步改进的空间。我们会努力优化在处理大数据量时的性能表现，以确保在各种复杂数据场景下，能够提供更出色的性能和稳定性。

### 功能完善

当前，Echarts 图表库的支持已经相当全面。但是，在某些图表渲染方面仍存在一些需要完善的[问题](https://github.com/wuba/react-native-echarts/issues/16)，例如不支持地图展示和在 Skia 渲染模式下图片展示不正确的问题等。我们非常重视这些问题，并会持续努力修复它们，以提供更好的图表展示体验。

### 支持 ECharts GL

随着 3D 可视化在各个业务场景中的广泛应用，例如下方展示的 3D 图表，我们将持续探索并增加对 ECharts GL 的支持，以满足更多场景下的业务需求。您可以点击 [这里](https://github.com/orgs/wuba/projects/10) 查看最新的进展情况。

![](./gl.png)

### 完善用例

后续，我们会增加更多用户使用案例与测试用例。规范测试用例能检查出你的任何改动是不是对其他功能产生了影响。能够从根本上就保证项目的质量，后续我们也将逐步添加更多测试用例，规范代码，提升代码质量。

## 感谢 

非常感谢 `@wuba/react-native-echarts` 开源社区的所有朋友们。无论是为代码库做出贡献，还是为解决bug提供报告和上下文信息，或是改进现有特性的想法，都是对这个项目非常宝贵的贡献。我们非常欢迎你加入我们，一起参与到项目交流共建。

最后，特别感谢为项目做出贡献的开发者:

<a href="https://github.com/wuba/react-native-echarts/graphs/contributors"><img src="https://opencollective.com/react-native-echarts/contributors.svg?button=false" /></a>
