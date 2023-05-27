"use strict";(self.webpackChunkreact_native_echarts=self.webpackChunkreact_native_echarts||[]).push([[202],{3905:(e,t,n)=>{n.d(t,{Zo:()=>h,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},h=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,h=o(e,["components","mdxType","originalType","parentName"]),c=p(n),u=r,m=c["".concat(l,".").concat(u)]||c[u]||d[u]||i;return n?a.createElement(m,s(s({ref:t},h),{},{components:n})):a.createElement(m,s({ref:t},h))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,s=new Array(i);s[0]=u;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[c]="string"==typeof e?e:r,s[1]=o;for(var p=2;p<i;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},893:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const i={slug:"using-wuba-react-native-echarts",title:"Using @wuba/react-native-echarts in Expo",authors:["iambool"],tags:["expo"]},s=void 0,o={permalink:"/react-native-echarts/blog/using-wuba-react-native-echarts",editUrl:"https://github.com/wuba/react-native-echarts/tree/docs/blog/2023-03-10-using-wuba-react-native-echarts/index.md",source:"@site/blog/2023-03-10-using-wuba-react-native-echarts/index.md",title:"Using @wuba/react-native-echarts in Expo",description:"The most used chart library for writing chart-related requirements is echarts. The performance of echarts on the website is quite mature, and the official solution is provided for the applet side, but there is no corresponding support in RN. On the market, most of the search is still based on the essence of the webview implementation, and I prefer the RN-based program, after all, the native experience will be better than the Web.",date:"2023-03-10T00:00:00.000Z",formattedDate:"March 10, 2023",tags:[{label:"expo",permalink:"/react-native-echarts/blog/tags/expo"}],readingTime:9.775,hasTruncateMarker:!0,authors:[{name:"iambool",url:"https://github.com/iambool",imageURL:"https://github.com/iambool.png",key:"iambool"}],frontMatter:{slug:"using-wuba-react-native-echarts",title:"Using @wuba/react-native-echarts in Expo",authors:["iambool"],tags:["expo"]},prevItem:{title:"React Native Echarts Official Website Has Launched!",permalink:"/react-native-echarts/blog/the-official-website-has-launched"},nextItem:{title:"Using Apache ECharts in React Native",permalink:"/react-native-echarts/blog/using-apache-echarts-in-react-native"}},l={authorsImageUrls:[void 0]},p=[{value:"Tips",id:"tips",level:3},{value:"The steps to use are as follows",id:"the-steps-to-use-are-as-follows",level:2},{value:"Step 1. Development environment setup",id:"step-1-development-environment-setup",level:3},{value:"Step 2. Creating an RN project",id:"step-2-creating-an-rn-project",level:3},{value:"Step 3. Building an app on mobile devices",id:"step-3-building-an-app-on-mobile-devices",level:3},{value:"Step 4. Install related dependencies",id:"step-4-install-related-dependencies",level:3},{value:"Step 5. Try the Skia model",id:"step-5-try-the-skia-model",level:3},{value:"Step 6. Try the Svg model",id:"step-6-try-the-svg-model",level:3},{value:"Step 7. Wrapping Chart Components",id:"step-7-wrapping-chart-components",level:3},{value:"Step 8. Using multiple charts",id:"step-8-using-multiple-charts",level:3},{value:"Summary",id:"summary",level:2}],h={toc:p},c="wrapper";function d(e){let{components:t,...i}=e;return(0,r.kt)(c,(0,a.Z)({},h,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The most used chart library for writing chart-related requirements is ",(0,r.kt)("strong",{parentName:"p"},"echarts"),". The performance of echarts on the website is quite mature, and the official solution is provided for the applet side, but there is no corresponding support in RN. On the market, most of the search is still based on the essence of the webview implementation, and I prefer the RN-based program, after all, the native experience will be better than the Web."),(0,r.kt)("p",null,"Later found ",(0,r.kt)("a",{parentName:"p",href:"https://wuba.github.io/react-native-echarts/"},(0,r.kt)("strong",{parentName:"a"},"@wuba/react-native-echarts"))," to meet the needs, so try it out, the results are excellent. For those interested in the principle of implementation, click ",(0,r.kt)("a",{parentName:"p",href:"https://wuba.github.io/react-native-echarts/blog/using-apache-echarts-in-react-native"},"here"),"\n",(0,r.kt)("img",{src:n(8309).Z,width:"1716",height:"1946"})),(0,r.kt)("h3",{id:"tips"},"Tips"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"If you already have an APP package, you can ignore the previous packaging process and start directly from step 4."),(0,r.kt)("li",{parentName:"ul"},"The full code for the trial is on GitHub at: ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/iambool/TestApp"},"https://github.com/iambool/TestApp"))),(0,r.kt)("h2",{id:"the-steps-to-use-are-as-follows"},"The steps to use are as follows"),(0,r.kt)("h3",{id:"step-1-development-environment-setup"},"Step 1. Development environment setup"),(0,r.kt)("p",null,"The process of building a local RN development environment is available on the Internet, so I won't go over it again. You can search for it on google :)"),(0,r.kt)("h3",{id:"step-2-creating-an-rn-project"},"Step 2. Creating an RN project"),(0,r.kt)("p",null,"As it was a trial, I used the expo to newly initialize an rn project called TestApp."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"npx create-expo-app TestApp\n")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"create TestApp",src:n(3894).Z,width:"1272",height:"1020"})),(0,r.kt)("h3",{id:"step-3-building-an-app-on-mobile-devices"},"Step 3. Building an app on mobile devices"),(0,r.kt)("p",null,"Generate ios and android app packages with a command line. iOS is recommended to use the emulator (no need to match the certificate), while Android I was connected to the real machine."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"yarn android\nyarn ios\n")),(0,r.kt)("p",null,"After generating the package, the app like the one below is already installed on the phone, which means it is successful."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"picture",src:n(5011).Z,width:"222",height:"280"})),(0,r.kt)("h3",{id:"step-4-install-related-dependencies"},"Step 4. Install related dependencies"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"yarn add @wuba/react-native-echarts echarts\nyarn add @shopify/react-native-skia\nyarn add react-native-svg\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Note: if you are installing in an existing project, you have to build a new package after the installation is complete, otherwise the lack of native dependencies will report an error.")),(0,r.kt)("h3",{id:"step-5-try-the-skia-model"},"Step 5. Try the Skia model"),(0,r.kt)("p",null,"@wuba/react-native-echarts supports two ",(0,r.kt)("strong",{parentName:"p"},"rendering modes (Skia and Svg)"),", try a simple chart with Skia first. It's divided into these small steps\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Introduce echarts, chart components and other dependencies."),(0,r.kt)("li",{parentName:"ul"},"Registering chart components."),(0,r.kt)("li",{parentName:"ul"},"Create a chart instance and set an option."),(0,r.kt)("li",{parentName:"ul"},"Synchronized destruction of chart instances when the page is destroyed.")),(0,r.kt)("p",null,"The specific code is as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"import { useRef, useEffect } from 'react';\nimport { View } from 'react-native';\n/**\n * 1. Import the echarts dependency, this example first tries the line chart\n */\nimport * as echarts from 'echarts/core';\nimport { LineChart } from 'echarts/charts';\nimport { GridComponent } from 'echarts/components';\nimport SkiaChart, { SVGRenderer } from '@wuba/react-native-echarts/skiaChart';\n\n/**\n * 2. Register the required components\n * SVGRenderer: it is required to register\n * LineChart: because we want to show the line chart, we have to import LineChart\n *      - If you don't know which components to import, just look at the error report and add whatever the error says is missing\n * GridComponent: This is the prompt when the error is reported, and then I added the, ha ha\n */\necharts.use([SVGRenderer, LineChart, GridComponent]);\n\nexport default () => {\n  const skiaRef = useRef(null); // Ref for saving chart instances\n  useEffect(() => {\n    /**\n     * 3. chart option\n     */\n    const option = {\n      xAxis: {\n        type: 'category',\n        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],\n      },\n      yAxis: {\n        type: 'value',\n      },\n      series: [\n        {\n          data: [150, 230, 224, 218, 135, 147, 260],\n          type: 'line',\n        },\n      ],\n    };\n    let chart;\n    if (skiaRef.current) {\n      /**\n       * 4. Initialize the chart, specifying the lower width and height\n       */\n      chart = echarts.init(skiaRef.current, 'light', {\n        renderer: 'svg',\n        width: 400,\n        height: 400,\n      });\n      chart.setOption(option);\n    }\n    /**\n     * 5. To destroy the chart instance after the page is closed\n     */\n    return () => chart?.dispose();\n  }, []);\n  return (\n    <View className='index'>\n      <SkiaChart ref={skiaRef} />\n    </View>\n  );\n};\n")),(0,r.kt)("p",null,"After writing the code, shaking the phone and reloading the bundle package, an error was reported:"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},'ERROR Invariant Violation: requireNativeComponent: "SkiaDomView" was not found in the UIManager.')),(0,r.kt)("p",null,"I googled it and it says it requires a ",(0,r.kt)("a",{parentName:"p",href:"https://stackoverflow.com/questions/74648194/shopify-react-native-skia-with-expo"},"version downgrade"),". It should correspond to the expo version, there will be a similar prompt when installing the dependency, install the prompted version and it will be fine.\n",(0,r.kt)("img",{alt:"warning",src:n(1333).Z,width:"1692",height:"340"})),(0,r.kt)("p",null,"So I followed the instructions and did a version downgrade:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"@shopify/react-native-skia@0.1.157\nreact-native-svg@13.4.0\n")),(0,r.kt)("p",null,"It loaded up after rebuilding the app, which was nice. (but Android covers up the point, it seems that the screen width should be adaptive.)"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"iOS"),(0,r.kt)("th",{parentName:"tr",align:null},"Android"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("img",{alt:"iOS",src:n(104).Z,width:"1170",height:"2532"})),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("img",{alt:"Android",src:n(5898).Z,width:"1080",height:"2340"}))))),(0,r.kt)("h3",{id:"step-6-try-the-svg-model"},"Step 6. Try the Svg model"),(0,r.kt)("p",null,"Write a more complex dynamic sorting bar chart with Svg mode, and compare Svg and Skia by the way. The full code is ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/iambool/TestApp/blob/main/pages/barRace/index.js"},"here"),"\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';\n// ...Some unimportant code is omitted here\n\n// Register the required components, such as BarChart and LegendComponent\necharts.use([SVGRenderer, BarChart, LegendComponent, GridComponent]);\n\nexport default () => {\n  const skiaRef = useRef(null);\n  const svgRef = useRef(null);\n\n  useEffect(() => {\n    // Skia mode\n    const skiaChartData = getData(); // Generate chart bar data\n    let skiaChart;\n    let skiaInter;\n    if (skiaRef.current) {\n      skiaChart = echarts.init(skiaRef.current, 'light', {\n        renderer: 'svg',\n        width: 300,\n        height: 300,\n      });\n      skiaChart.setOption(getDefaultOption(skiaChartData));\n      setTimeout(function () {\n        run(skiaChart, skiaChartData);\n      }, 0);\n      skiaInter = setInterval(function () {\n        run(skiaChart, skiaChartData);\n      }, 3000);\n    }\n\n    // Svg mode\n    const svgChartData = getData();\n    let svgChart;\n    let svgInter;\n    if (svgRef.current) {\n      svgChart = echarts.init(svgRef.current, 'light', {\n        renderer: 'svg',\n        width: 300,\n        height: 300,\n      });\n      svgChart.setOption(getDefaultOption(svgChartData));\n      setTimeout(function () {\n        run(svgChart, svgChartData);\n      }, 0);\n      svgInter = setInterval(function () {\n        run(svgChart, svgChartData);\n      }, 3000);\n    }\n\n    return () => {\n      skiaChart?.dispose();\n      svgChart?.dispose();\n      // The timer has to be cleaned up, otherwise it will still run after exiting the page\n      clearInterval(skiaInter);\n      clearInterval(svgInter);\n    };\n  }, []);\n  return (\n    <View>\n      <Text>skia</Text>\n      <SkiaChart ref={skiaRef} />\n      <Text>svg</Text>\n      <SvgChart ref={svgRef} />\n    </View>\n  );\n};\n")),(0,r.kt)("p",null,"I can't see the difference between these two modes with my eyes."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"iOS"),(0,r.kt)("th",{parentName:"tr",align:null},"Android"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("img",{alt:"picture",src:n(7517).Z,width:"640",height:"1385"})),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("img",{alt:"picture",src:n(3604).Z,width:"590",height:"1280"}))))),(0,r.kt)("h3",{id:"step-7-wrapping-chart-components"},"Step 7. Wrapping Chart Components"),(0,r.kt)("p",null,"So far the effect was quite good, but every time I used a bunch of things to import, It bothered me. Let's wrap it up simply:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"import { useRef, useEffect } from 'react';\nimport * as echarts from 'echarts/core';\nimport { BarChart, LineChart, PieChart } from 'echarts/charts';\nimport {\n  DataZoomComponent,\n  GridComponent,\n  LegendComponent,\n  TitleComponent,\n  ToolboxComponent,\n  TooltipComponent,\n} from 'echarts/components';\nimport {\n  SVGRenderer,\n  SvgChart as _SvgChart,\n  SkiaChart as _SkiaChart,\n} from '@wuba/react-native-echarts';\n// Note: If only one of svg or skia is installed, it needs to be imported separately as follows.\n// import _SkiaChart, { SVGRenderer } from '@wuba/react-native-echarts/skiaChart';\n// import _SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';\n\nimport { Dimensions } from 'react-native';\n\n// Register the required components\necharts.use([\n  DataZoomComponent,\n  SVGRenderer,\n  BarChart,\n  GridComponent,\n  LegendComponent,\n  ToolboxComponent,\n  TooltipComponent,\n  TitleComponent,\n  PieChart,\n  LineChart,\n]);\n\n// Default width and height of the chart\nconst CHART_WIDTH = Dimensions.get('screen').width; // Default with the phone screen width\nconst CHART_HEIGHT = 300;\n\nconst Chart = ({\n  option,\n  onInit,\n  width = CHART_WIDTH,\n  height = CHART_HEIGHT,\n  ChartComponent,\n}) => {\n  const chartRef = useRef(null);\n\n  useEffect(() => {\n    let chart;\n    if (chartRef.current) {\n      chart = echarts.init(chartRef.current, 'light', {\n        renderer: 'svg',\n        width,\n        height,\n      });\n      option && chart.setOption(option);\n      onInit?.(chart);\n    }\n    return () => chart?.dispose();\n  }, [option]);\n  return <ChartComponent ref={chartRef} />;\n};\n\nconst SkiaChart = (props) => <Chart {...props} ChartComponent={_SkiaChart} />;\nconst SvgChart = (props) => <Chart {...props} ChartComponent={_SvgChart} />;\n// Just export these two guys\nexport { SkiaChart, SvgChart };\n")),(0,r.kt)("h3",{id:"step-8-using-multiple-charts"},"Step 8. Using multiple charts"),(0,r.kt)("p",null,"Once it\u2019s wrapped, let\u2019s write a page with multiple charts and see how it works. Here is a page for \u201ce-commerce data analysis\u201d, including a line chart, bar chart and pie chart. Below is the main code written with svg mode, click ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/iambool/TestApp/tree/main/pages/ECdata"},"here")," for detailed code."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"import { SkiaChart } from '../../components/Chart';\nimport { ScrollView, Text, View } from 'react-native';\nimport { StatusBar } from 'expo-status-bar';\nimport { useCallback, useEffect, useState } from 'react';\nimport {\n  defaultActual,\n  lineOption,\n  salesStatus,\n  salesVolume,\n  userAnaly,\n  getLineData,\n} from './contants';\nimport styles from './styles';\n// Turn on chart loading\nconst showChartLoading = (chart) =>\n  chart.showLoading('default', {\n    maskColor: '#305d9e',\n  });\n// Close chart loading\nconst hideChartLoading = (chart) => chart.hideLoading();\n\nexport default () => {\n  const [actual, setActual] = useState(defaultActual); // Recording real-time data\n\n  useEffect(() => {\n    // Assuming a recurring request for data\n    const interv = setInterval(() => {\n      const newActual = [];\n      for (let it of actual) {\n        newActual.push({\n          ...it,\n          num: it.num + Math.floor((Math.random() * it.num) / 100),\n        });\n      }\n      setActual(newActual);\n    }, 200);\n    return () => clearInterval(interv);\n  }, [actual]);\n\n  const onInitLineChart = useCallback((myChart) => {\n    showChartLoading(myChart);\n    // Simulation of data requests\n    setTimeout(() => {\n      myChart.setOption({\n        series: getLineData,\n      });\n      hideChartLoading(myChart);\n    }, 1000);\n  }, []);\n\n  const onInitUserChart = useCallback((myChart) => {\n    // Simulate data request, similar to onInitLineChart\n  }, []);\n  const onInitSaleChart = useCallback((myChart) => {\n    // Simulate data request, similar to onInitLineChart\n  }, []);\n  const onInitStatusChart = useCallback((myChart) => {\n    // Simulate data request, similar to onInitLineChart\n  }, []);\n\n  const chartList = [\n    ['\u8ba2\u5355\u8d70\u52bf', lineOption, onInitLineChart],\n    ['\u7528\u6237\u7edf\u8ba1', userAnaly, onInitUserChart],\n    ['\u5404\u54c1\u7c7b\u9500\u552e\u7edf\u8ba1', salesVolume, onInitSaleChart],\n    ['\u8ba2\u5355\u72b6\u6001\u7edf\u8ba1', salesStatus, onInitStatusChart],\n  ];\n\n  return (\n    <ScrollView style={styles.index}>\n      <StatusBar style='light' />\n      <View>\n        <View style={styles.index_panel_header}>\n          <Text style={styles.index_panel_title}>\u5b9e\u65f6\u6570\u636e</Text>\n        </View>\n        <View style={styles.index_panel_content}>\n          {actual.map(({ title, num, unit }) => (\n            <View key={title} style={styles.sale_item}>\n              <View style={styles.sale_item_cell}>\n                <Text style={styles.sale_item_text}>{title}</Text>\n              </View>\n              <View style={[styles.sale_item_cell, styles.num]}>\n                <Text style={styles.sale_item_num}>{num}</Text>\n              </View>\n              <View style={[styles.sale_item_cell, styles.unit]}>\n                <Text style={styles.sale_item_text}>{unit}</Text>\n              </View>\n            </View>\n          ))}\n        </View>\n      </View>\n      {chartList.map(([title, data, callback]) => (\n        <View key={title}>\n          <View style={styles.index_panel_header}>\n            <Text style={styles.index_panel_title}>{title}</Text>\n          </View>\n          <View style={styles.index_panel_content}>\n            <SkiaChart option={data} onInit={callback} />\n          </View>\n        </View>\n      ))}\n    </ScrollView>\n  );\n};\n")),(0,r.kt)("p",null,"Reload the bundle and see the result"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"iOS"),(0,r.kt)("th",{parentName:"tr",align:null},"Android"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("img",{alt:"picture",src:n(7413).Z,width:"400",height:"888"})),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("img",{alt:"picture",src:n(4052).Z,width:"400",height:"868"}))))),(0,r.kt)("p",null,"After rendering, the interaction on iOS is very smooth, while the interaction on Android feels occasionally laggy (not because my phone is too bad, right?...)"),(0,r.kt)("p",null,"Try Skia mode again"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"picture",src:n(7579).Z,width:"322",height:"696"})),(0,r.kt)("p",null,"Well, although it can, it seems that Chinese can not be displayed properly, Android Chinese is not displayed, and iOS is a mess of code. After reading the documentation, skia currently does not support Chinese on the Android side, We can display Chinese on iOS by setting the font to \u2018PingFang SC\u2019, for example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"const option = {\n  title: {\n    text: '\u6211\u662f\u4e2d\u6587',\n    textStyle: {\n      fontFamily: 'PingFang SC', // setting the font type\n    },\n  },\n};\n")),(0,r.kt)("p",null,"But every place that displays Chinese has to set the font... that or use Svg first, I'm lazy."),(0,r.kt)("h2",{id:"summary"},"Summary"),(0,r.kt)("p",null,"After using it for a while, I summarized the following:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"In terms of support, @wuba/react-native-echarts supports all types of charts except GL series and map charts which are not yet supported, which is very enough for daily business. The code to implement the various charts in echarts can be found in ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/wuba/taro-playground"},"taro-playground"),"."),(0,r.kt)("li",{parentName:"ul"},"Interaction, iOS is very silky smooth, Android sometimes there are cases of frame drops."),(0,r.kt)("li",{parentName:"ul"},"Performance: Performance is officially reported as better than other solutions.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"I tried it, not a very large amount of data will not have any problems, but when the amount of data is too large (such as drawing a large amount of data heat map), the rendering speed significantly decreased a lot, which is a point waiting for the official to optimize."),(0,r.kt)("li",{parentName:"ul"},"In addition, if there are many charts on the page, the loading speed will be slow when debugging on the real machine, so it is recommended to use the simulator first."))),(0,r.kt)("li",{parentName:"ul"},"Chinese support, Svg mode supports Chinese, but Skia mode is not available yet.")),(0,r.kt)("p",null,"The above is only a personal view, any questions welcome communication."))}d.isMDXComponent=!0},3894:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/create-expo-3e491a8c7755f9697ddfef5a2d7e736d.jpeg"},3604:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/dynamic-data-android-a3a87f304ce4b02b5f552ea83bbd15a5.gif"},7517:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/dynamic-data-ios-a48f027a0a497a7eef3ff6ba4c47c2f4.gif"},4052:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/ecdata-android-5ead76e0684e019e33e9b780617f6e11.gif"},7413:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/ecdata-ios-941b5a2e55c797502af1f3f9fddad871.gif"},8309:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/example-6d869e9b1647cc3ebb8f87dac4d444ae.png"},5011:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/expo-app-e5e5fc8d237f76a2a2b457f619024188.png"},5898:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/skia-android-81c23447be12009352f45a607e082328.jpg"},7579:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/skia-chinese-284dae33c30d6d1057aef3b39336f8a3.png"},104:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/skia-ios-2f06aa82687b30a65848913f0e68cb83.png"},1333:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/warning-850be6006cf70a2e55d7dfb51c2936e0.jpg"}}]);