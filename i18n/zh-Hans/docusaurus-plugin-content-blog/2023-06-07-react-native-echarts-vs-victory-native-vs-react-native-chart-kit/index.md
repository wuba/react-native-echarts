---
slug: react-native-echarts-vs-victory-native-vs-react-native-chart-kit
title: React Native ECharts 全方位对比 React Native 社区流行的绘图库
authors: [xuanwei]
tags: [website]
---


![](@site/static/img/react-native-echarts-social-card.png)


> 引言：在现代移动应用开发中, 数据可视化是至关重要的一部分。图表库在React Native应用中扮演着关键角色, 帮助开发人员以可视化的方式呈现和分析数据。React Native生态系统中有许多优秀的图表库可供选择, 本文将对三个 React Native 社区流行的绘图库进行对比, 让我们开始这个对比之旅, 深入了解React Native ECharts、Victory Native和React Native Chart Kit这三个图表库到底有哪些不同

## 图表库简介

- **React Native Chart Kit**

    [ React Native Chart Kit ](https://github.com/indiespirit/React-native-chart-kit) 于2018年开发, 至今已有5年, 累计下载次数已达2,840,757次, 在github上已获得2.5k+的star, 是 react-native 端非常受欢迎的库了。

- **Victory Native**

  [ Victory Native ](https://formidable.com/open-source/victory/) 是2015年开发的图表库,至今已有7年, 累计下载次数高达7,434,044次, 在github上更是获得10.3k+的star, 是 react-native 历史最久用户量最多的图表库了。

- **React Native ECharts**

  [ React Native ECharts ](https://wuba.github.io/react-native-echarts/)是今年新发布的的图表库,目前下载量为2565次, 在github上获得363的star, 作为 react-native 端图表库的新星, 它具有巨大的潜力, 相信随着时间推移, 它会成为最热门的图标库之一。

  基础数据对比表格如下：

  | |  **React Native Chart Kit**   | **Victory Native**  | **React Native ECharts** |
  | --- |  :----:  | :----:  | :---: |
  | 创建时间  | 2018年  | 2015年 | 2023年 |
  | 下载量 | 2,840,757  | 7,434,044 | 2565 |
  | 包体积大小 | 399kB  | 78.4kB  | 169kB  |
  | github star | 2.5k+  | 10.3k+ | 363 |
  | 上一次更新 | a year ago  | a month ago | a month ago |

## 基本原理对比

- **React Native Chart Kit**
主要是利用 React Native 的原生视图组件来创建图表的基本结构和布局, 例如 View、Text 等结合 react-native-svg、paths-js 等矢量库来进行对图表的绘制。

- **Victory Native**
Victory Native 也是基于 React Native 的原生视图结合 svg 来进行绘制, 同时也借鉴了 D3（数据驱动文档）的概念, 它将数据与图表的元素进行映射, 通过比例尺来转换数据的值和位置

- **React Native ECharts**
获取到 ECharts 图表的 SVG 图形数据 重写 Echarts 的 SVGPainter, 通过利用 ECharts 已有的图表数据，在 React Native 端运用 react-native-svg 或 react-native-skia 将图表渲染出来



## 代码编写对比

以常用的面积图为例, 下面就让我们来看看它们是如何使用的

- **React Native Chart Kit**

```js
import { LineChart } from"react-native-chart-kit";
import { StyleSheet, View, Text } from 'react-native';
const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(14, 17, 22, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};
export const LineChart1 = props => {
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        // labels: props.date,
        datasets: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
      };
    return (
        <View style={styles.container}>
            <Text>React Native Chart Kit</Text>
            <LineChart
                data={data}
                width={400}
                height={200}
                yAxisInterval={1}
                animate
                chartConfig={chartConfig}
                withDots={false}
            />
      </View>
    )

}

```

- **Victory Native**

```js
import { StyleSheet, View, Text } from "react-native";
import {
  VictoryArea,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryScatter,
} from "victory-native";

export const LineChart2 = props => {
  const data = [
      { x: 'Mon', y: 150 },
      { x: 'Tue', y: 230 },
      { x: 'Wed', y: 224 },
      { x: 'Thu', y: 218 },
      { x: 'Fri', y: 135 },
      { x: 'Sat', y: 147 },
      { x: 'sun', y: 260 },
    ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Victory Native</Text>
      <VictoryChart
        theme={VictoryTheme.material}
        height={250}
        width={400}
      >
        <VictoryArea
          style={{ data: { fill: "rgba(230, 231, 231,0.8)" } }}
          data={data}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
        />
        <VictoryLine
          data={data}
          style={{ data: { stroke: "#d6d6d7", strokeWidth: 2 } }}
        />
        <VictoryScatter
          data={data}
          size={4}
          style={{ data: { fill: "#24262a" } }}
        />
      </VictoryChart>
    </View>
  );
};

```

- **React Native ECharts**

```js
import { StyleSheet, Text, View } from 'react-native';
import { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { SVGRenderer, SkiaChart } from '@wuba/react-native-echarts';
echarts.use([SVGRenderer, LineChart, GridComponent]);
export const LineCharts = props => {
  const skiaRef = useRef(null);
  useEffect(() => {
    const option = {
      xAxis: {
        type: 'category',
        data:  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
          },}
      },
      yAxis: {
        type: 'value',
        min: 'dataMin',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
          },}
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
          areaStyle: {
            color: 'rgba(230, 231, 231,0.8)'
          },
          lineStyle: {
            color: '#d6d6d7'
          },
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color: '#24262a',
          },
        },
      ],
    };
    let chart;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: 400,
        height: 300,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, []);
  return (
    <View style={styles.container}>
        <Text style={styles.title}>React Native ECharts</Text>
        <SkiaChart ref={skiaRef} />
    </View>
  );
}
```

效果展示如下：  

<img src="https://pic4.58cdn.com.cn/nowater/frs/n_v36a21956e648c4a329da00fb41b166245.png"  width="48%" />
<img src="https://wos2.58cdn.com.cn/DeFazYxWvDti/frsupload/a053ec4567fc99f7f75638973d72e26a_tutieshi_288x640_7s.gif"  width="48%" />

从编写代码的角度, **Victory Native** 是基于数据驱动的类型, 所以通常是传入数据, 然后一些相关的样式由配置项传入。最最最重要的是, 它更像是一组可以自己diy的工具, 使用 Victory 暴露出的各个组件, 对自己需要绘制的图表进行diy, 如果在这个面积图中, 我如果需要增加折线以及拐点, 就需要再额外添加 **VictoryLine** 与 **VictoryScatter**。

**React Native Echarts** 与 **React Native Chart Kit** 的使用方法类似, 都将数据和样式集中在配置项里, 我们更像是使用一个完全体的工具, 通过修改配置来变换它的成品。相比较下**React Native Chart Kit** 的配置代码要更加简单, 不过也有一些劣势就是配置化不够完善, 有些想要更改的功能做不到比如开启渲染动画, y轴以指定值开始计数等功能。

从写法上来说, 本人还是更倾向于使用配置项的方式, 这种方式简便快捷, 上手难度低, 对于开发者来说可以提高开发效率。

## 使用体验

### 渲染性能对比

对于常规的图表, 面积图柱状图圆形图等在数据量不大的情况下, 三个库的表现都是不错的, 渲染时都比较流畅。但是当数据量达到1000量级时, 明显感觉到性能的差异了。**Victory Native** 与**React Native Chart Kit** 出现了明显卡顿, 数据量更大一些的情况 Victory 更是直接crash, 而 **React Native ECharts** 得益于 Echarts 默认使用了数据抽样（data sampling）的机制, 在绘制大量数据时减少数据点数量, 以避免图表过于拥挤和性能下降。Echarts 会自动根据绘图区域的宽度和数据点的数量来进行抽样, 只绘制相对较少的数据点, 以减少计算量和渲染时间。借用这一机制在渲染大数据时, **React Native ECharts** 的渲染表现要明显优秀许多。

使用随机生成200组数据来渲染面积图效果如下：

<img src="https://wos2.58cdn.com.cn/DeFazYxWvDti/frsupload/7e14bf4b496e5a3ff528096e7ccfd875_590x1087_rn-echart-100-5s.gif"  width="200" height="300" />
<img src="https://wos2.58cdn.com.cn/DeFazYxWvDti/frsupload/426c93a792c0d35a2f6f86237d099657_590x1087_kit-100_5s.gif"  width="200" height="300" />
<img src="https://wos2.58cdn.com.cn/DeFazYxWvDti/frsupload/89d063de113ef9602d14b14a48ee1957_590x1087_v-100.gif"  width="200" height="300"  />


  可以看到 **React Native ECharts** 的渲染效果还是相对较好的, 使用另外两个库还是要对数据以及坐标进行一些调整才能保证业务需求。

  当我们把测试数据加到2000时, **React Native Chart Kit** 出现渲染的明显卡顿, 而 **Victory Native** 则是直接报错 **Maximum call stack size exceede**。而此时的 **React Native ECharts** 得益于数据抽样仍然可以有不错的渲染成果：
<img src="https://pic4.58cdn.com.cn/nowater/frs/n_v37998ba55137a48c5895e18d4c8aae3a8.png" />

### 图表丰富性对比

从应用的角度来说。
- **React Native Chart Kit**
目前 **React Native Chart Kit** 支持的图表类型还是相对较少的, 目前主要支持6种特定种类的图表, 虽然能涵盖大部分基础业务, 但是如果有些业务需要其他类型的图表, 可能还需要引入其他的库了。
  下图是 **React Native Chart Kit** 能覆盖到的大部分图表,看的出来还是相对较少的😭。目前开发者还在持续维护后续会新增一些。
![](https://pic2.58cdn.com.cn/nowater/frs/n_v3de70bac7538d48949b14227bd9bdb28d.png)
<font size="2">(图片来源: https://github.com/indiespirit/react-native-chart-kit)</font>

- **Victory Native**
**Victory Native** 能覆盖的图表种类相比 **React Native Chart Kit** 是会多些, 但是由于 Victory 的写法需要自己组装组件, 组合成不同类型的图表需要开发者有一定的组合思维, 并且官网的示例对初学者还是不太友好的, 能支持的图表实例不是特别直观, 总而言之使用 **Victory Native** 的开发者需要有一定的代码功底和不错的思维逻辑, 使用门槛较高。

  下图是victory官方网站上的demo提供的主要组件的展示图, 可以看的出来相对 **React Native Chart Kit** 还是要多不少的, 更重要的是 **Victory Native** 主要是以这些组件类似于点、线、面、轴的组合, 让开发者去组合生成新的类型图表, 可以支持的图表种类就更多了✅
  ![](https://pic3.58cdn.com.cn/nowater/frs/n_v316dafe8eaf0f435c962933baa233ecdd.png)
  <font size="2">(图片来源: https://formidable.com/open-source/victory/docs/)</font>


- **React Native ECharts**
可以直接参照 Echarts 官网示例, 各种类型的图表示例非常直观, 开发者可以参照配置项配置自己需要的图表。目前 Echarts 支持的大部分图表, **React Native ECharts** 都是支持渲染的。

  **React Native ECharts** 使用了 Echarts 的svg数据, 所以使用者只要参照 Echarts 的网站示例来选择自己的配置便可以渲染大量不同类型的图表了😍

  ![](https://pic7.58cdn.com.cn/nowater/frs/n_v3d67cc17570b34bf2992455482ce5c494.png)
  <font size="2">(图片来源: https://echarts.apache.org/examples/zh/index.html)</font>

  下图是一些使用其他库都无法实现或者需要很高难度的拼接组合才能实现的图表, 但是使用 **React Native ECharts** 完全可以参照文档轻松解决啦🚀

  <img src="https://pic6.58cdn.com.cn/nowater/frs/n_v39593dce0b5c745ae8a304e7d337409d7.pic"  />

### 相关生态对比

上手 **React Native Chart Kit** 主要直接通过 github 或者 npm 上项目中作者提供文档配置项来实现图表渲染。
而 **Victory Native** 有自己的[官方网站](https://formidable.com/open-source/victory/docs/)开发者可以自己根据 docs 中提供的组件以及相关代码来组装图表, 但是官网的组件和元素数量比较多, 开发者无法快速的找到想要的实例, 实现复杂图表更是需要开发者自己思考实现方式, 开发效率偏低。

**React Native ECharts** 相比于 **Victory Native** 和 **React Native Chart Kit**  有以下几点优势

- 官方文档

  [官方文档](https://wuba.github.io/react-native-echarts/)的描述更为清晰, 详尽, 并且可以看到现成以及丰富的[使用案例](https://echarts.apache.org/examples/zh/index.html)便于开发者上手和快速实现图表。

- 在线预览测试
**React Native ECharts** 像 ECharts 图表库一样, 提供了相应的在线预览和测试支持, 你可以直接复制图表配置, 以查看其在 React Native 上的渲染效果：[ 点击在线预览 ](https://wuba.github.io/react-native-echarts/zh-Hans/docs/expo-snacks/simple-line-chart)

- 多端代码复用

  **React Native ECharts** 也会支持组件复用到 Web 端, 以满足跨端需求并实现多端代码共享。轻松实现代码的统一性, 并确保图表在不同平台上的一致性, 也提升我们开发的效率。
- Svg 和 Skia 两种渲染支持

  **React Native ECharts** 支持 Svg 和 Skia 两种渲染方式, 它基于 react-native-svg 和 react-native-skia 实现。react-native-skia 使用了 Skia Graphics Library, 这是一个高性能的图形渲染引擎可以提供更快的绘制和渲染速度, 对于想体验Skia的开发者无疑是一种福音。

## 总结
  最后, 我们来看下这三个图表库的从下面几个角度上比较表现如何：


  | |  **React Native Chart Kit**   | **Victory Native**  | **React Native ECharts** |
  | --- |  :----:  | :----:  | :---: |
  | 基础图表适用性  | ✅  | ✅  | ✅  |
  | 图表丰富度 | ➖ | ✅ | ✅ |
  | 大数据渲染 | ➖  | ➖  | ✅  |
  | 开发易上手度 | ✅  | ➖  | ✅ |
  | 多端复用 | ➖  | ➖ | ✅ |

不可否认 **Victory Native** 和 **React Native Chart Kit** 都是很优秀的react-native端的图表库, 但是新出的 **React Native ECharts** 在适用性和入门难度上还是具有一定优势的, 尤其是在一些相对复杂但是常见的图表如路径图、雷达图K线图等 **React Native ECharts** 提供的用例可以让开发者只是稍微改变一下示例代码里的数据就轻松实现, 这些场景下是强推的 **React Native ECharts** 的, 极大的提高了开发效率。 此外, 项目中对各种图表种类需求度比较高的场景也是推荐 **React Native ECharts** 丰富的图表示例支持会让我们在面对多样的图表需求显得更加得心应手😁
