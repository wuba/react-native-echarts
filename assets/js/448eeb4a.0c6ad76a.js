"use strict";(self.webpackChunkreact_native_echarts=self.webpackChunkreact_native_echarts||[]).push([[582],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=l(r),m=a,d=u["".concat(c,".").concat(m)]||u[m]||h[m]||i;return r?n.createElement(d,o(o({ref:t},p),{},{components:r})):n.createElement(d,o({ref:t},p))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[u]="string"==typeof e?e:a,o[1]=s;for(var l=2;l<i;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},866:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var n=r(7462),a=(r(7294),r(3905));const i={sidebar_position:3},o="Write a simple line chart",s={unversionedId:"getting-started/write-a-simple-line-chart",id:"getting-started/write-a-simple-line-chart",title:"Write a simple line chart",description:"Next let's try to draw the most basic diagram - Basic Line Chart.",source:"@site/docs/getting-started/write-a-simple-line-chart.md",sourceDirName:"getting-started",slug:"/getting-started/write-a-simple-line-chart",permalink:"/react-native-echarts/docs/getting-started/write-a-simple-line-chart",draft:!1,editUrl:"https://github.com/wuba/react-native-echarts/tree/docs/docs/getting-started/write-a-simple-line-chart.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Run example",permalink:"/react-native-echarts/docs/getting-started/run-example"},next:{title:"Write a dynamic data chart",permalink:"/react-native-echarts/docs/getting-started/write-a-dynamic-data-chart"}},c={},l=[],p={toc:l},u="wrapper";function h(e){let{components:t,...i}=e;return(0,a.kt)(u,(0,n.Z)({},p,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"write-a-simple-line-chart"},"Write a simple line chart"),(0,a.kt)("p",null,"Next let's try to draw the most basic diagram - Basic Line Chart."),(0,a.kt)("p",null,"To see how it looks like in the browser, you can visit the ",(0,a.kt)("a",{parentName:"p",href:"https://echarts.apache.org/examples/en/editor.html?c=line-simple"},"echarts editor")," and try to modify the configuration to see the changes."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"import echarts, @wuba/react-native-echarts, react. Here I have only import SkiaChart and SVGRenderer.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"import React, { useRef, useEffect } from 'react';\nimport * as echarts from 'echarts/core';\nimport { LineChart } from 'echarts/charts';\nimport { GridComponent } from 'echarts/components';\nimport { SVGRenderer, SkiaChart } from '@wuba/react-native-echarts';\n")),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"use echarts.use to register the renderer and chart.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"echarts.use([SVGRenderer, LineChart, GridComponent]);\n")),(0,a.kt)("ol",{start:3},(0,a.kt)("li",{parentName:"ol"},"create a ref for the SkiaChart.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"export default function App() {\n  const skiaRef = useRef<any>(null);\n  return <SkiaChart ref={skiaRef} />;\n}\n")),(0,a.kt)("ol",{start:4},(0,a.kt)("li",{parentName:"ol"},"write the chart option.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"const option = {\n  xAxis: {\n    type: 'category',\n    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],\n  },\n  yAxis: {\n    type: 'value',\n  },\n  series: [\n    {\n      data: [150, 230, 224, 218, 135, 147, 260],\n      type: 'line',\n    },\n  ],\n};\n")),(0,a.kt)("ol",{start:5},(0,a.kt)("li",{parentName:"ol"},"create a chart instance and set the option.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"let chart = echarts.init(skiaRef.current, 'light', {\n  renderer: 'svg',\n  width: 400,\n  height: 400,\n});\nchart.setOption(option);\n")),(0,a.kt)("ol",{start:6},(0,a.kt)("li",{parentName:"ol"},"use useEffect to make sure the chart is initialized only once. And dispose the chart when the component is unmounted.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"useEffect(() => {\n  return () => chart?.dispose();\n}, []);\n")),(0,a.kt)("p",null,"That's it! Here is the code:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"import React, { useRef, useEffect } from 'react';\nimport * as echarts from 'echarts/core';\nimport { LineChart } from 'echarts/charts';\nimport { GridComponent } from 'echarts/components';\nimport { SVGRenderer, SkiaChart } from '@wuba/react-native-echarts';\n\necharts.use([SVGRenderer, LineChart, GridComponent]);\n\nexport default function App() {\n  const skiaRef = useRef<any>(null);\n  useEffect(() => {\n    const option = {\n      xAxis: {\n        type: 'category',\n        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],\n      },\n      yAxis: {\n        type: 'value',\n      },\n      series: [\n        {\n          data: [150, 230, 224, 218, 135, 147, 260],\n          type: 'line',\n        },\n      ],\n    };\n    let chart: any;\n    if (skiaRef.current) {\n      chart = echarts.init(skiaRef.current, 'light', {\n        renderer: 'svg',\n        width: 400,\n        height: 400,\n      });\n      chart.setOption(option);\n    }\n    return () => chart?.dispose();\n  }, []);\n\n  return <SkiaChart ref={skiaRef} />;\n}\n")),(0,a.kt)("p",null,"You should see the following screen:"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"iOS"),(0,a.kt)("th",{parentName:"tr",align:null},"Android"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("img",{alt:"ios",src:r(9715).Z,width:"1290",height:"2796"})),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("img",{alt:"android",src:r(7878).Z,width:"1080",height:"2340"}))))),(0,a.kt)("p",null,"If you want to use the react-native-svg, just replace the SkiaChart with SvgChart."),(0,a.kt)("p",null,"Next you can find more configurations to use in @wuba/react-native-echarts from the ",(0,a.kt)("a",{parentName:"p",href:"https://echarts.apache.org/examples/en/index.html"},"echarts examples"),"."))}h.isMDXComponent=!0},7878:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/android-line-0da6020c8b1255532a9c4fb2162adf7e.jpg"},9715:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/ios-line-e54ad9fb3f2ce1a2e2a1237c0adbca45.png"}}]);