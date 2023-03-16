"use strict";(self.webpackChunkreact_native_echarts=self.webpackChunkreact_native_echarts||[]).push([[485],{832:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"using-wuba-react-native-echarts","metadata":{"permalink":"/react-native-echarts/blog/using-wuba-react-native-echarts","editUrl":"https://github.com/wuba/react-native-echarts/tree/docs/blog/2023-03-10-using-wuba-react-native-echarts/index.md","source":"@site/blog/2023-03-10-using-wuba-react-native-echarts/index.md","title":"Using @wuba/react-native-echarts in Expo","description":"The most used chart library for writing chart-related requirements is echarts. The performance of echarts on the website is quite mature, and the official solution is provided for the applet side, but there is no corresponding support in RN. On the market, most of the search is still based on the essence of the webview implementation, and I prefer the RN-based program, after all, the native experience will be better than the Web.","date":"2023-03-10T00:00:00.000Z","formattedDate":"March 10, 2023","tags":[{"label":"expo","permalink":"/react-native-echarts/blog/tags/expo"}],"readingTime":9.565,"hasTruncateMarker":true,"authors":[{"name":"iambool","url":"https://github.com/iambool","imageURL":"https://github.com/iambool.png","key":"iambool"}],"frontMatter":{"slug":"using-wuba-react-native-echarts","title":"Using @wuba/react-native-echarts in Expo","authors":["iambool"],"tags":["expo"]},"nextItem":{"title":"Using Apache ECharts in React Native","permalink":"/react-native-echarts/blog/using-apache-echarts-in-react-native"}},"content":"The most used chart library for writing chart-related requirements is **echarts**. The performance of echarts on the website is quite mature, and the official solution is provided for the applet side, but there is no corresponding support in RN. On the market, most of the search is still based on the essence of the webview implementation, and I prefer the RN-based program, after all, the native experience will be better than the Web.\\n\\nLater found [**@wuba/react-native-echarts**](https://wuba.github.io/react-native-echarts/) to meet the needs, so try it out, the results are excellent. For those interested in the principle of implementation, click [here](https://wuba.github.io/react-native-echarts/blog/using-apache-echarts-in-react-native)\\n![](./example.png)\\n\x3c!--truncate--\x3e\\n### Tips\\n\\n- If you already have an APP package, you can ignore the previous packaging process and start directly from step 4.\\n- The full code for the trial is on GitHub at: [https://github.com/iambool/TestApp](https://github.com/iambool/TestApp)\\n\\n## The steps to use are as follows\\n\\n### Step 1. Development environment setup\\n\\nThe process of building a local RN development environment is available on the Internet, so I won\'t go over it again. You can search for it on google :)\\n\\n### Step 2. Creating an RN project\\n\\nAs it was a trial, I used the expo to newly initialize an rn project called TestApp.\\n\\n```\\nnpx create-expo-app TestApp\\n```\\n\\n![create TestApp](./create-expo.jpeg)\\n\\n### Step 3. Building an app on mobile devices\\n\\nGenerate ios and android app packages with a command line. iOS is recommended to use the emulator (no need to match the certificate), while Android I was connected to the real machine.\\n\\n```\\nyarn android\\nyarn ios\\n```\\n\\nAfter generating the package, the app like the one below is already installed on the phone, which means it is successful.\\n\\n![picture](./expo-app.png)\\n\\n### Step 4. Install related dependencies\\n\\n```\\nyarn add @wuba/react-native-echarts echarts\\nyarn add @shopify/react-native-skia\\nyarn add react-native-svg\\n```\\n\\n> Note: if you are installing in an existing project, you have to build a new package after the installation is complete, otherwise the lack of native dependencies will report an error.\\n\\n### Step 5. Try the Skia model\\n\\n@wuba/react-native-echarts supports two **rendering modes (Skia and Svg)**, try a simple chart with Skia first. It\'s divided into these small steps\uff1a\\n\\n- Introduce echarts, chart components and other dependencies.\\n- Registering chart components.\\n- Create a chart instance and set an option.\\n- Synchronized destruction of chart instances when the page is destroyed.\\n\\nThe specific code is as follows:\\n\\n```javascript\\nimport { useRef, useEffect } from \'react\';\\nimport { View } from \'react-native\';\\n/**\\n * 1. Import the echarts dependency, this example first tries the line chart\\n */\\nimport * as echarts from \'echarts/core\';\\nimport { LineChart } from \'echarts/charts\';\\nimport { GridComponent } from \'echarts/components\';\\nimport { SVGRenderer, SkiaChart } from \'@wuba/react-native-echarts\';\\n\\n/**\\n * 2. Register the required components\\n * SVGRenderer: it is required to register\\n * LineChart: because we want to show the line chart, we have to import LineChart\\n *      - If you don\'t know which components to import, just look at the error report and add whatever the error says is missing\\n * GridComponent: This is the prompt when the error is reported, and then I added the, ha ha\\n */\\necharts.use([SVGRenderer, LineChart, GridComponent]);\\n\\nexport default () => {\\n  const skiaRef = useRef(null); // Ref for saving chart instances\\n  useEffect(() => {\\n    /**\\n     * 3. chart option\\n     */\\n    const option = {\\n      xAxis: {\\n        type: \'category\',\\n        data: [\'Mon\', \'Tue\', \'Wed\', \'Thu\', \'Fri\', \'Sat\', \'Sun\'],\\n      },\\n      yAxis: {\\n        type: \'value\',\\n      },\\n      series: [\\n        {\\n          data: [150, 230, 224, 218, 135, 147, 260],\\n          type: \'line\',\\n        },\\n      ],\\n    };\\n    let chart;\\n    if (skiaRef.current) {\\n      /**\\n       * 4. Initialize the chart, specifying the lower width and height\\n       */\\n      chart = echarts.init(skiaRef.current, \'light\', {\\n        renderer: \'svg\',\\n        width: 400,\\n        height: 400,\\n      });\\n      chart.setOption(option);\\n    }\\n    /**\\n     * 5. To destroy the chart instance after the page is closed\\n     */\\n    return () => chart?.dispose();\\n  }, []);\\n  return (\\n    <View className=\'index\'>\\n      <SkiaChart ref={skiaRef} />\\n    </View>\\n  );\\n};\\n```\\n\\nAfter writing the code, shaking the phone and reloading the bundle package, an error was reported:\\n\\n> ERROR Invariant Violation: requireNativeComponent: \\"SkiaDomView\\" was not found in the UIManager.\\n\\nI googled it and it says it requires a [version downgrade](https://stackoverflow.com/questions/74648194/shopify-react-native-skia-with-expo). It should correspond to the expo version, there will be a similar prompt when installing the dependency, install the prompted version and it will be fine.\\n![warning](./warning.jpg)\\n\\nSo I followed the instructions and did a version downgrade:\\n\\n```\\n@shopify/react-native-skia@0.1.157\\nreact-native-svg@13.4.0\\n```\\n\\nIt loaded up after rebuilding the app, which was nice. (but Android covers up the point, it seems that the screen width should be adaptive.)\\n\\n| iOS                    | Android                        |\\n| ---------------------- | ------------------------------ |\\n| ![iOS](./skia-ios.png) | ![Android](./skia-android.jpg) |\\n\\n### Step 6. Try the Svg model\\n\\nWrite a more complex dynamic sorting bar chart with Svg mode, and compare Svg and Skia by the way. The full code is [here](https://github.com/iambool/TestApp/blob/main/pages/barRace/index.js)\u3002\\n\\n```javascript\\n// ...Some unimportant code is omitted here\\n\\n// Register the required components, such as BarChart and LegendComponent\\necharts.use([SVGRenderer, BarChart, LegendComponent, GridComponent]);\\n\\nexport default () => {\\n  const skiaRef = useRef(null);\\n  const svgRef = useRef(null);\\n\\n  useEffect(() => {\\n    // Skia mode\\n    const skiaChartData = getData(); // Generate chart bar data\\n    let skiaChart;\\n    let skiaInter;\\n    if (skiaRef.current) {\\n      skiaChart = echarts.init(skiaRef.current, \'light\', {\\n        renderer: \'svg\',\\n        width: 300,\\n        height: 300,\\n      });\\n      skiaChart.setOption(getDefaultOption(skiaChartData));\\n      setTimeout(function () {\\n        run(skiaChart, skiaChartData);\\n      }, 0);\\n      skiaInter = setInterval(function () {\\n        run(skiaChart, skiaChartData);\\n      }, 3000);\\n    }\\n\\n    // Svg mode\\n    const svgChartData = getData();\\n    let svgChart;\\n    let svgInter;\\n    if (svgRef.current) {\\n      svgChart = echarts.init(svgRef.current, \'light\', {\\n        renderer: \'svg\',\\n        width: 300,\\n        height: 300,\\n      });\\n      svgChart.setOption(getDefaultOption(svgChartData));\\n      setTimeout(function () {\\n        run(svgChart, svgChartData);\\n      }, 0);\\n      svgInter = setInterval(function () {\\n        run(svgChart, svgChartData);\\n      }, 3000);\\n    }\\n\\n    return () => {\\n      skiaChart?.dispose();\\n      svgChart?.dispose();\\n      // The timer has to be cleaned up, otherwise it will still run after exiting the page\\n      clearInterval(skiaInter);\\n      clearInterval(svgInter);\\n    };\\n  }, []);\\n  return (\\n    <View>\\n      <Text>skia</Text>\\n      <SkiaChart ref={skiaRef} />\\n      <Text>svg</Text>\\n      <SvgChart ref={svgRef} />\\n    </View>\\n  );\\n};\\n```\\n\\nI can\'t see the difference between these two modes with my eyes.\\n\\n| iOS                                | Android                                |\\n| ---------------------------------- | -------------------------------------- |\\n| ![picture](./dynamic-data-ios.gif) | ![picture](./dynamic-data-android.gif) |\\n\\n### Step 7. Wrapping Chart Components\\n\\nSo far the effect was quite good, but every time I used a bunch of things to import, It bothered me. Let\'s wrap it up simply:\\n\\n```javascript\\nimport { useRef, useEffect } from \'react\';\\nimport * as echarts from \'echarts/core\';\\nimport { BarChart, LineChart, PieChart } from \'echarts/charts\';\\nimport {\\n  DataZoomComponent,\\n  GridComponent,\\n  LegendComponent,\\n  TitleComponent,\\n  ToolboxComponent,\\n  TooltipComponent,\\n} from \'echarts/components\';\\nimport {\\n  SVGRenderer,\\n  SvgChart as _SvgChart,\\n  SkiaChart as _SkiaChart,\\n} from \'@wuba/react-native-echarts\';\\nimport { Dimensions } from \'react-native\';\\n\\n// Register the required components\\necharts.use([\\n  DataZoomComponent,\\n  SVGRenderer,\\n  BarChart,\\n  GridComponent,\\n  LegendComponent,\\n  ToolboxComponent,\\n  TooltipComponent,\\n  TitleComponent,\\n  PieChart,\\n  LineChart,\\n]);\\n\\n// Default width and height of the chart\\nconst CHART_WIDTH = Dimensions.get(\'screen\').width; // Default with the phone screen width\\nconst CHART_HEIGHT = 300;\\n\\nconst Chart = ({\\n  option,\\n  onInit,\\n  width = CHART_WIDTH,\\n  height = CHART_HEIGHT,\\n  ChartComponent,\\n}) => {\\n  const chartRef = useRef(null);\\n\\n  useEffect(() => {\\n    let chart;\\n    if (chartRef.current) {\\n      chart = echarts.init(chartRef.current, \'light\', {\\n        renderer: \'svg\',\\n        width,\\n        height,\\n      });\\n      option && chart.setOption(option);\\n      onInit?.(chart);\\n    }\\n    return () => chart?.dispose();\\n  }, [option]);\\n  return <ChartComponent ref={chartRef} />;\\n};\\n\\nconst SkiaChart = (props) => <Chart {...props} ChartComponent={_SkiaChart} />;\\nconst SvgChart = (props) => <Chart {...props} ChartComponent={_SvgChart} />;\\n// Just export these two guys\\nexport { SkiaChart, SvgChart };\\n```\\n\\n### Step 8. Using multiple charts\\n\\nOnce it\u2019s wrapped, let\u2019s write a page with multiple charts and see how it works. Here is a page for \u201ce-commerce data analysis\u201d, including a line chart, bar chart and pie chart. Below is the main code written with svg mode, click [here](https://github.com/iambool/TestApp/tree/main/pages/ECdata) for detailed code.\\n\\n```javascript\\nimport { SkiaChart } from \'../../components/Chart\';\\nimport { ScrollView, Text, View } from \'react-native\';\\nimport { StatusBar } from \'expo-status-bar\';\\nimport { useCallback, useEffect, useState } from \'react\';\\nimport {\\n  defaultActual,\\n  lineOption,\\n  salesStatus,\\n  salesVolume,\\n  userAnaly,\\n  getLineData,\\n} from \'./contants\';\\nimport styles from \'./styles\';\\n// Turn on chart loading\\nconst showChartLoading = (chart) =>\\n  chart.showLoading(\'default\', {\\n    maskColor: \'#305d9e\',\\n  });\\n// Close chart loading\\nconst hideChartLoading = (chart) => chart.hideLoading();\\n\\nexport default () => {\\n  const [actual, setActual] = useState(defaultActual); // Recording real-time data\\n\\n  useEffect(() => {\\n    // Assuming a recurring request for data\\n    const interv = setInterval(() => {\\n      const newActual = [];\\n      for (let it of actual) {\\n        newActual.push({\\n          ...it,\\n          num: it.num + Math.floor((Math.random() * it.num) / 100),\\n        });\\n      }\\n      setActual(newActual);\\n    }, 200);\\n    return () => clearInterval(interv);\\n  }, [actual]);\\n\\n  const onInitLineChart = useCallback((myChart) => {\\n    showChartLoading(myChart);\\n    // Simulation of data requests\\n    setTimeout(() => {\\n      myChart.setOption({\\n        series: getLineData,\\n      });\\n      hideChartLoading(myChart);\\n    }, 1000);\\n  }, []);\\n\\n  const onInitUserChart = useCallback((myChart) => {\\n    // Simulate data request, similar to onInitLineChart\\n  }, []);\\n  const onInitSaleChart = useCallback((myChart) => {\\n    // Simulate data request, similar to onInitLineChart\\n  }, []);\\n  const onInitStatusChart = useCallback((myChart) => {\\n    // Simulate data request, similar to onInitLineChart\\n  }, []);\\n\\n  const chartList = [\\n    [\'\u8ba2\u5355\u8d70\u52bf\', lineOption, onInitLineChart],\\n    [\'\u7528\u6237\u7edf\u8ba1\', userAnaly, onInitUserChart],\\n    [\'\u5404\u54c1\u7c7b\u9500\u552e\u7edf\u8ba1\', salesVolume, onInitSaleChart],\\n    [\'\u8ba2\u5355\u72b6\u6001\u7edf\u8ba1\', salesStatus, onInitStatusChart],\\n  ];\\n\\n  return (\\n    <ScrollView style={styles.index}>\\n      <StatusBar style=\'light\' />\\n      <View>\\n        <View style={styles.index_panel_header}>\\n          <Text style={styles.index_panel_title}>\u5b9e\u65f6\u6570\u636e</Text>\\n        </View>\\n        <View style={styles.index_panel_content}>\\n          {actual.map(({ title, num, unit }) => (\\n            <View key={title} style={styles.sale_item}>\\n              <View style={styles.sale_item_cell}>\\n                <Text style={styles.sale_item_text}>{title}</Text>\\n              </View>\\n              <View style={[styles.sale_item_cell, styles.num]}>\\n                <Text style={styles.sale_item_num}>{num}</Text>\\n              </View>\\n              <View style={[styles.sale_item_cell, styles.unit]}>\\n                <Text style={styles.sale_item_text}>{unit}</Text>\\n              </View>\\n            </View>\\n          ))}\\n        </View>\\n      </View>\\n      {chartList.map(([title, data, callback]) => (\\n        <View key={title}>\\n          <View style={styles.index_panel_header}>\\n            <Text style={styles.index_panel_title}>{title}</Text>\\n          </View>\\n          <View style={styles.index_panel_content}>\\n            <SkiaChart option={data} onInit={callback} />\\n          </View>\\n        </View>\\n      ))}\\n    </ScrollView>\\n  );\\n};\\n```\\n\\nReload the bundle and see the result\\n\\n| iOS                          | Android                          |\\n| ---------------------------- | -------------------------------- |\\n| ![picture](./ecdata-ios.gif) | ![picture](./ecdata-android.gif) |\\n\\nAfter rendering, the interaction on iOS is very smooth, while the interaction on Android feels occasionally laggy (not because my phone is too bad, right?...)\\n\\nTry Skia mode again\\n\\n![picture](./skia-chinese.png)\\n\\nWell, although it can, it seems that Chinese can not be displayed properly, Android Chinese is not displayed, and iOS is a mess of code. After reading the documentation, skia currently does not support Chinese on the Android side, We can display Chinese on iOS by setting the font to \u2018PingFang SC\u2019, for example:\\n\\n```javascript\\nconst option = {\\n  title: {\\n    text: \'\u6211\u662f\u4e2d\u6587\',\\n    textStyle: {\\n      fontFamily: \'PingFang SC\', // setting the font type\\n    },\\n  },\\n};\\n```\\n\\nBut every place that displays Chinese has to set the font... that or use Svg first, I\'m lazy.\\n\\n## Summary\\n\\nAfter using it for a while, I summarized the following:\\n\\n- In terms of support, @wuba/react-native-echarts supports all types of charts except GL series and map charts which are not yet supported, which is very enough for daily business. The code to implement the various charts in echarts can be found in [taro-playground](https://github.com/wuba/taro-playground).\\n- Interaction, iOS is very silky smooth, Android sometimes there are cases of frame drops.\\n- Performance: Performance is officially reported as better than other solutions.\\n  - I tried it, not a very large amount of data will not have any problems, but when the amount of data is too large (such as drawing a large amount of data heat map), the rendering speed significantly decreased a lot, which is a point waiting for the official to optimize.\\n  - In addition, if there are many charts on the page, the loading speed will be slow when debugging on the real machine, so it is recommended to use the simulator first.\\n- Chinese support, Svg mode supports Chinese, but Skia mode is not available yet.\\n\\nThe above is only a personal view, any questions welcome communication."},{"id":"using-apache-echarts-in-react-native","metadata":{"permalink":"/react-native-echarts/blog/using-apache-echarts-in-react-native","editUrl":"https://github.com/wuba/react-native-echarts/tree/docs/blog/2023-02-09-using-apache-echarts-in-react-native/index.md","source":"@site/blog/2023-02-09-using-apache-echarts-in-react-native/index.md","title":"Using Apache ECharts in React Native","description":"We have developed an open source graphics library for react native APP, which is based on Apache ECharts and uses RNSVG or RNSkia for rendering in a way that is almost identical to using it in the web, and can satisfy most graphics situations. The project source code is available at https://github.com/wuba/react-native-echarts.","date":"2023-02-09T00:00:00.000Z","formattedDate":"February 9, 2023","tags":[{"label":"intro","permalink":"/react-native-echarts/blog/tags/intro"}],"readingTime":6.79,"hasTruncateMarker":true,"authors":[{"name":"Zhiqing Chen","title":"Maintainer of react-native-echarts","url":"https://github.com/zhiqingchen","imageURL":"https://github.com/zhiqingchen.png","key":"zhiqing"}],"frontMatter":{"slug":"using-apache-echarts-in-react-native","title":"Using Apache ECharts in React Native","authors":["zhiqing"],"tags":["intro"]},"prevItem":{"title":"Using @wuba/react-native-echarts in Expo","permalink":"/react-native-echarts/blog/using-wuba-react-native-echarts"},"nextItem":{"title":"Welcome","permalink":"/react-native-echarts/blog/welcome"}},"content":"We have developed an [open source graphics library](https://github.com/wuba/react-native-echarts) for react native APP, which is based on [Apache ECharts](https://github.com/apache/echarts) and uses [RNSVG](https://github.com/react-native-svg/react-native-svg) or [RNSkia](https://github.com/shopify/react-native-skia) for rendering in a way that is almost identical to using it in the web, and can satisfy most graphics situations. The project source code is available at https://github.com/wuba/react-native-echarts.\\n\\n![Examples](./examples.jpg)\\n\x3c!--truncate--\x3e\\n## Introduction\\n\\nWhen drawing charts, the chart library we use most frequently is ECharts. As one of the most mature chart libraries on the market, mainly for web-side use, there is no best way to use it in React Native, in the face of this situation, our solutions are:\\n\\nOption 1, use a chart libraries developed specifically for React Native as an alternative, such as [react-native-charts-wrapper](https://github.com/wuxudong/react-native-charts-wrapper), [victory-native](https://github.com/FormidableLabs/victory/tree/main/packages/victory-native), etc. The style and interaction of these chart libraries are different from ECahrts, and the richness of charts is not enough. Especially in the scenario of multi-platform requirements, a separate UI interaction design is needed for React Native.\\n\\nOption 2, charts are rendered by [react-native-webview](https://github.com/react-native-webview/react-native-webview), This solution uses injectedJavaScript for initialization and postMessage for event response, you can directly use open source libraries such as [react-native-echarts-pro](https://github.com/supervons/react-native-echarts-pro), [native-echarts](https://github.com/somonus/react-native-echarts), etc. When there are multiple charts or too many chart elements on the page, it will encounter performance bottlenecks, such as white screen phenomenon for large data volume area charts and single-axis scatter charts on Android, and there will be more obvious lag and frame drop during rendering.\\n\\nTherefore, we consider developing a new chart library that can integrate the capabilities of ECharts into React Native applications for better usability and stronger performance.\\n\\nSince we don\u2019t want to write a graphics library from scratch, let\u2019s look at what graphics libraries we currently have designed for React Native:\\n\\n1. react-native-svg: provides SVG support to React Native on iOS, Android, macOS, Windows, and a compatibility layer for the web.\\n2. react-native-skia: React Native Skia brings the Skia Graphics Library to React Native. Skia serves as the graphics engine for Google Chrome and Chrome OS, Android, Flutter, Mozilla Firefox and Firefox OS, and many other products. It also provides an [ImageSVG](https://shopify.github.io/react-native-skia/docs/images-svg) component that supports rendering of SVG formatted images.\\n\\nWe know that ECharts supports SVG rendering, so if we get the SVG data before the chart is rendered and provide it to react-native-svg or react-native-skia for rendering, we will be able to achieve our goal.\\n\\nAfter a period of experimentation, we have developed [@wuba/react-native-echart](https://github.com/wuba/react-native-echarts) with the following features\uff1a\\n\\n- \ud83d\udd25 The same way as Apache ECharts\\n- \ud83c\udfa8 Rich charts, covering almost all usage scenarios\\n- \u2728 Optional rendering library, Skia or SVG\\n- \ud83d\ude80 Able to reuse code with web\\n- \ud83d\udcf1 Support for zoom gestures\\n\\n## How to use\\n\\nIn practice, the overall process for @wuba/react-native-echarts is similar to ECharts:\\n\\n1. yarn add @wuba/react-native-echarts\\n2. Choose to install react-native-svg or @shopify/react-native-skia\\n3. Introduce the relevant components from @wuba/react-native-echarts\\n4. Replace the SVGRenderer of ECharts with the SVGRenderer of @wuba/react-native-echarts\\n5. Write the option configuration information for the chart\\n6. Use SkiaChart / SvgChart component\\n\\nHere is the sample code\uff1a\\n\\n```ts\\n// import { SkiaChart, SVGRenderer } from \'@wuba/react-native-echarts\';\\nimport SkiaChart, { SVGRenderer } from \'@wuba/react-native-echarts/skiaChart\';\\nimport * as echarts from \'echarts/core\';\\nimport { useRef, useEffect } from \'react\';\\nimport { LineChart } from \'echarts/charts\';\\n\\necharts.use([ SVGRenderer, LineChart ])\\n\\nexport default function App() {\\n  const skiaRef = useRef<any>(null);\\n  useEffect(() => {\\n    const option = {\\n      xAxis: {\\n        type: \'category\',\\n        data: [\'Mon\', \'Tue\', \'Wed\', \'Thu\', \'Fri\', \'Sat\', \'Sun\']\\n      },\\n      yAxis: {\\n        type: \'value\'\\n      },\\n      series: [\\n        {\\n          data: [150, 230, 224, 218, 135, 147, 260],\\n          type: \'line\'\\n        }\\n      ]\\n    }\\n    let chart: any;\\n    if (skiaRef.current) {\\n      chart = echarts.init(skiaRef.current, \'light\', {\\n        renderer: \'svg\',\\n        width: 250,\\n        height: 300,\\n      });\\n      chart.setOption(option);\\n    }\\n    return () => chart?.dispose();\\n  }, []);\\n\\n  return <SkiaChart ref={skiaRef} />;\\n}\\n```\\n\\nHere is a screenshot of it:\\n\\n![Screenshot](./screenshot.jpg)\\n\\nIsn\u2019t it particularly easy? More chart configurations can be viewed on the [echarts website](https://echarts.apache.org/examples/en/index.html).\\n\\nWe support most of the charts currently supported by ECharts. I will show some of the charts below, and more examples can be seen on the [taro-playground](https://github.com/wuba/taro-playground) project.\\n\\n![Example](./example.jpg)\\n![Animate1](./animate1.gif)\\n![Animate2](./animate2.gif)\\n![Animate3](./animate3.gif)\\n\\n## Performance\\n\\nAs mentioned before, the mainstream solution for using ECharts in React Native is to implement it via WebView. Among the many WebView-based implementations, react-native-echarts-pro has more users, so we chose react-native-echarts-pro as a comparison.\\n\\nThe following are screenshots of the initialization process for the different implementations:\\n\\n![Performance](./performance.gif)\\n\\nAfter quite a few test cases, we found that @wuba/react-native-echarts has performance advantages in regular usage scenarios, but in scenarios with large amounts of data, there will be significant lag because of the declarative UI rendering method, which we will continue to explore to improve performance subsequently.\\n\\n## Implementation details\\n\\n![Principle](./principle.webp)\\n\\nAbove is the flowchart of the library, taking react-native-svg as an example, the core workflow is:\\n\\n1. Replace the SVGRenderer of ECharts, and replace the registered SVGPainter with the custom SVGPainter.\\n2. CustomSVGPainter inherits from SVGPainter, overwrites the constructor and part of the refresh function, calls the patch function registered on SVGComponent when the chart data is initialized or updated, and passes the calculated new SVG data to it.\\n3. Define SVGComponent, which manages the current chart instance and has a core patch function on it to receive real-time SVG data and then call the SVGElement function.\\n4. SVGElement function iterates all SVG nodes and transforms them into the corresponding SVG elements provided by react-native-svg for the final rendering action.\\n\\nWhen using react-native-skia, there are some differences. There is a core method patchString on the defined SkiaComponent component. patchString receives the changed SVG data, converts it into SVG string, and passes it to the ImageSVG component of react-native-skia for rendering.\\n\\n## Handling TouchEvent\\n\\nECharts events are mouse events, such as click, dblclick, mousedown, mousemove, etc. The mouse events are used to trigger the display or animation of the chart elements.\\n\\nWe use the PanResponder of React Native to capture the events, then simulate the mobile TouchEvent as a mouse event and dispatch it to the chart instance generated by the ECharts init method.\\n\\nFor example, the action of following the mouse to display the legend on the chart is TouchStart + TouchMove on the mobile side, which translates to a mouse event of mousedown + mousemove.\\n\\nAnother example is the zooming of the chart, the mobile side is two-finger zooming, which is translated to the mouse mousewheel event, and the corresponding mousewheel scrolling distance is calculated by the two-finger distance change.\\n\\nHere is the key code:\\n\\n1. Convert TouchEvent to MouseEvent\\n\\n```ts\\nPanResponder.create({\\n  onPanResponderGrant: ({ nativeEvent }) => {\\n    // Action start, translated into mouse down and move events\\n    dispatchEvent(\\n      zrenderId,\\n      [\'mousedown\', \'mousemove\'],\\n      nativeEvent,\\n      \'start\'\\n    );\\n  },\\n  onPanResponderMove: ({ nativeEvent }) => {\\n    // Handling finger movement operations\\n    const length = nativeEvent.touches.length;\\n    if (length === 1) {\\n      // single finger\\n    } else if (length === 2) {\\n      // Handling two-finger movement operations here\\n      if (!zooming) {\\n        // ...\\n      } else {\\n        // Here the event is converted to a scroll wheel\\n        const { initialX, initialY, prevDistance } = pan.current;\\n        const delta = distance - prevDistance;\\n        pan.current.prevDistance = distance;\\n        dispatchEvent(zrenderId, [\'mousewheel\'], nativeEvent, undefined, {\\n          zrX: initialX,\\n          zrY: initialY,\\n          zrDelta: delta / 120,\\n        });\\n      }\\n    }\\n  },\\n  onPanResponderRelease: ({ nativeEvent }) => {\\n    // The action is over, where it is transformed into a mouse click release operation\\n  },\\n})\\n```\\n\\n2. Applying a MouseEvent to an ECharts chart instance\\n\\n```ts\\nfunction dispatchEvent(\\n  zrenderId: number,\\n  types: HandlerName[],\\n  nativeEvent: NativeTouchEvent,\\n  stage: \'start\' | \'end\' | \'change\' | undefined,\\n  props: any = {\\n    zrX: nativeEvent.locationX,\\n    zrY: nativeEvent.locationY,\\n  }\\n) {\\n  if (zrenderId) {\\n    var handler = getInstance(zrenderId).handler;\\n    types.forEach(function (type) {\\n      handler.dispatch(type, {\\n        preventDefault: noop,\\n        stopImmediatePropagation: noop,\\n        stopPropagation: noop,\\n        ...props,\\n      });\\n      stage && handler.processGesture(wrapTouch(nativeEvent), stage);\\n    });\\n  }\\n}\\n```\\n\\n## For more information\\n\\nGo to https://github.com/wuba/react-native-echarts to view the source code, and give us a star if you like it. If you encounter any problems, you can submit an [issue](https://github.com/wuba/react-native-echarts/issues).\\n\\nThe sample code in this post is on the https://github.com/wuba/taro-playground project, which is also open source, and interested parties can also install the new version of the Taro Playground app directly from the app store or from the [releases page](https://github.com/wuba/taro-playground/releases) to experience it."},{"id":"welcome","metadata":{"permalink":"/react-native-echarts/blog/welcome","editUrl":"https://github.com/wuba/react-native-echarts/tree/docs/blog/2023-02-08-welcome/index.md","source":"@site/blog/2023-02-08-welcome/index.md","title":"Welcome","description":"Welcome to react-native-echarts!","date":"2023-02-08T00:00:00.000Z","formattedDate":"February 8, 2023","tags":[{"label":"hello","permalink":"/react-native-echarts/blog/tags/hello"}],"readingTime":0.015,"hasTruncateMarker":false,"authors":[{"name":"Zhiqing Chen","title":"Maintainer of react-native-echarts","url":"https://github.com/zhiqingchen","imageURL":"https://github.com/zhiqingchen.png","key":"zhiqing"}],"frontMatter":{"slug":"welcome","title":"Welcome","authors":["zhiqing"],"tags":["hello"]},"prevItem":{"title":"Using Apache ECharts in React Native","permalink":"/react-native-echarts/blog/using-apache-echarts-in-react-native"}},"content":"Welcome to react-native-echarts!"}]}')}}]);