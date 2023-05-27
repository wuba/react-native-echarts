"use strict";(self.webpackChunkreact_native_echarts=self.webpackChunkreact_native_echarts||[]).push([[3156],{3905:(e,t,a)=>{a.d(t,{Zo:()=>l,kt:()=>v});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=n.createContext({}),p=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},l=function(e){var t=p(e.components);return n.createElement(o.Provider,{value:t},e.children)},h="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),h=p(a),m=r,v=h["".concat(o,".").concat(m)]||h[m]||u[m]||i;return a?n.createElement(v,s(s({ref:t},l),{},{components:a})):n.createElement(v,s({ref:t},l))}));function v(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,s=new Array(i);s[0]=m;var c={};for(var o in t)hasOwnProperty.call(t,o)&&(c[o]=t[o]);c.originalType=e,c[h]="string"==typeof e?e:r,s[1]=c;for(var p=2;p<i;p++)s[p]=a[p];return n.createElement.apply(null,s)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},7605:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>s,default:()=>u,frontMatter:()=>i,metadata:()=>c,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const i={slug:"using-apache-echarts-in-react-native",title:"\u5728 React Native \u4e2d\u4f7f\u7528 Apache ECharts",authors:["zhiqing"],tags:["intro"]},s=void 0,c={permalink:"/react-native-echarts/zh-Hans/blog/using-apache-echarts-in-react-native",editUrl:"https://github.com/wuba/react-native-echarts/tree/docs/i18n/zh-Hans/docusaurus-plugin-content-blog/2023-02-09-using-apache-echarts-in-react-native/index.md",source:"@site/i18n/zh-Hans/docusaurus-plugin-content-blog/2023-02-09-using-apache-echarts-in-react-native/index.md",title:"\u5728 React Native \u4e2d\u4f7f\u7528 Apache ECharts",description:"\u6211\u4eec\u4e3a react native APP \u5f00\u53d1\u4e86\u4e00\u4e2a\u5f00\u6e90\u56fe\u5f62\u5e93\uff0c\u5b83\u57fa\u4e8e Apache ECharts\uff0c\u4f7f\u7528 RNSVG \u6216 RNSkia \u8fdb\u884c\u6e32\u67d3\uff0c\u5176\u65b9\u5f0f\u4e0e\u5728\u6d4f\u89c8\u5668\u4e2d\u4e2d\u4f7f\u7528\u51e0\u4e4e\u76f8\u540c\uff0c\u53ef\u4ee5\u6ee1\u8db3\u5927\u591a\u6570\u7ed8\u56fe\u573a\u666f\u3002\u8be5\u9879\u76ee\u6e90\u4ee3\u7801\u53ef\u5728 https://github.com/wuba/react-native-echarts \u4e2d\u67e5\u770b\u3002",date:"2023-02-09T00:00:00.000Z",formattedDate:"2023\u5e742\u67089\u65e5",tags:[{label:"intro",permalink:"/react-native-echarts/zh-Hans/blog/tags/intro"}],readingTime:8.935,hasTruncateMarker:!0,authors:[{name:"Zhiqing Chen",title:"react-native-echarts \u7684\u7ef4\u62a4\u8005",url:"https://github.com/zhiqingchen",imageURL:"https://github.com/zhiqingchen.png",key:"zhiqing"}],frontMatter:{slug:"using-apache-echarts-in-react-native",title:"\u5728 React Native \u4e2d\u4f7f\u7528 Apache ECharts",authors:["zhiqing"],tags:["intro"]},prevItem:{title:"Expo\u4e2d\u4f7f\u7528@wuba/react-native-echarts",permalink:"/react-native-echarts/zh-Hans/blog/using-wuba-react-native-echarts"},nextItem:{title:"\u6b22\u8fce",permalink:"/react-native-echarts/zh-Hans/blog/welcome"}},o={authorsImageUrls:[void 0]},p=[{value:"\u4ecb\u7ecd",id:"\u4ecb\u7ecd",level:2},{value:"\u5982\u4f55\u4f7f\u7528",id:"\u5982\u4f55\u4f7f\u7528",level:2},{value:"\u6027\u80fd",id:"\u6027\u80fd",level:2},{value:"\u5b9e\u73b0\u7ec6\u8282",id:"\u5b9e\u73b0\u7ec6\u8282",level:2},{value:"\u5904\u7406\u89e6\u6478\u4e8b\u4ef6",id:"\u5904\u7406\u89e6\u6478\u4e8b\u4ef6",level:2},{value:"\u66f4\u591a\u7684\u4fe1\u606f",id:"\u66f4\u591a\u7684\u4fe1\u606f",level:2}],l={toc:p},h="wrapper";function u(e){let{components:t,...i}=e;return(0,r.kt)(h,(0,n.Z)({},l,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"\u6211\u4eec\u4e3a react native APP \u5f00\u53d1\u4e86\u4e00\u4e2a",(0,r.kt)("a",{parentName:"p",href:"https://github.com/wuba/react-native-echarts"},"\u5f00\u6e90\u56fe\u5f62\u5e93"),"\uff0c\u5b83\u57fa\u4e8e ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/echarts"},"Apache ECharts"),"\uff0c\u4f7f\u7528 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/react-native-svg/react-native-svg"},"RNSVG")," \u6216 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/shopify/react-native-skia"},"RNSkia")," \u8fdb\u884c\u6e32\u67d3\uff0c\u5176\u65b9\u5f0f\u4e0e\u5728\u6d4f\u89c8\u5668\u4e2d\u4e2d\u4f7f\u7528\u51e0\u4e4e\u76f8\u540c\uff0c\u53ef\u4ee5\u6ee1\u8db3\u5927\u591a\u6570\u7ed8\u56fe\u573a\u666f\u3002\u8be5\u9879\u76ee\u6e90\u4ee3\u7801\u53ef\u5728 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/wuba/react-native-echarts"},"https://github.com/wuba/react-native-echarts")," \u4e2d\u67e5\u770b\u3002"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"\u793a\u4f8b",src:a(477).Z,width:"4160",height:"3120"})),(0,r.kt)("h2",{id:"\u4ecb\u7ecd"},"\u4ecb\u7ecd"),(0,r.kt)("p",null,"\u5728\u7ed8\u5236\u56fe\u8868\u65f6\uff0c\u6211\u4eec\u6700\u5e38\u4f7f\u7528\u7684\u56fe\u8868\u5e93\u662f ECharts\u3002\u4f5c\u4e3a\u5e02\u573a\u4e0a\u6700\u6210\u719f\u7684\u56fe\u8868\u5e93\u4e4b\u4e00\uff0c\u4e3b\u8981\u7528\u4e8e Web \u7aef\uff0c\u5728 React Native \u4e2d\u5e76\u6ca1\u6709\u6700\u597d\u7684\u4f7f\u7528\u65b9\u6cd5\uff0c\u9762\u5bf9\u8fd9\u79cd\u60c5\u51b5\uff0c\u6211\u4eec\u7684\u89e3\u51b3\u65b9\u6848\u6709\u4e24\u79cd\uff1a"),(0,r.kt)("p",null,"\u65b9\u6848\u4e00\uff0c\u4f7f\u7528\u4e13\u95e8\u4e3a React Native \u5f00\u53d1\u7684\u56fe\u8868\u5e93\u4f5c\u4e3a\u66ff\u4ee3\uff0c\u6bd4\u5982 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/wuxudong/react-native-charts-wrapper"},"react-native-charts-wrapper"),"\uff0c",(0,r.kt)("a",{parentName:"p",href:"https://github.com/FormidableLabs/victory/tree/main/packages/victory-native"},"victory-native")," \u7b49\u3002\u8fd9\u4e9b\u56fe\u8868\u5e93\u7684\u98ce\u683c\u548c\u4ea4\u4e92\u65b9\u5f0f\u4e0e ECahrts \u4e0d\u540c\uff0c\u800c\u4e14\u56fe\u8868\u7684\u4e30\u5bcc\u6027\u4e5f\u4e0d\u591f\u3002\u7279\u522b\u662f\u5728\u591a\u5e73\u53f0\u9700\u6c42\u7684\u573a\u666f\u4e0b\uff0c\u9700\u8981\u5bf9 React Native \u8fdb\u884c\u5355\u72ec\u7684 UI \u4ea4\u4e92\u8bbe\u8ba1\u3002"),(0,r.kt)("p",null,"\u65b9\u6848\u4e8c\uff0c\u56fe\u8868\u7531 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/react-native-webview/react-native-webview"},"react-native-webview")," \u6e32\u67d3\uff0c\u6b64\u65b9\u6848\u4f7f\u7528 injectedJavaScript \u8fdb\u884c\u521d\u59cb\u5316\uff0c\u4f7f\u7528 postMessage \u8fdb\u884c\u4e8b\u4ef6\u54cd\u5e94\uff0c\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/supervons/react-native-echarts-pro"},"react-native-echarts-pro"),"\u3001",(0,r.kt)("a",{parentName:"p",href:"https://github.com/somonus/react-native-echarts"},"native-echarts")," \u7b49\u5f00\u6e90\u5e93\u3002\u5f53\u9875\u9762\u4e0a\u6709\u591a\u4e2a\u56fe\u8868\u6216\u56fe\u8868\u5143\u7d20\u8fc7\u591a\u65f6\uff0c\u4f1a\u9047\u5230\u6027\u80fd\u74f6\u9888\uff0c\u5982 Android \u4e0a\u7684\u5927\u6570\u636e\u91cf\u533a\u57df\u56fe\u548c\u5355\u8f74\u6563\u70b9\u56fe\u4f1a\u51fa\u73b0\u767d\u5c4f\u73b0\u8c61\uff0c\u6e32\u67d3\u65f6\u6709\u6bd4\u8f83\u660e\u663e\u7684\u6ede\u540e\u548c\u6389\u5e27\u3002"),(0,r.kt)("p",null,"\u56e0\u6b64\uff0c\u6211\u4eec\u8003\u8651\u5f00\u53d1\u4e00\u4e2a\u65b0\u7684\u56fe\u8868\u5e93\uff0c\u53ef\u4ee5\u5c06 ECharts \u7684\u529f\u80fd\u6574\u5408\u5230 React Native \u5e94\u7528\u4e2d\uff0c\u4ee5\u83b7\u5f97\u66f4\u597d\u7684\u53ef\u7528\u6027\u548c\u66f4\u5f3a\u7684\u6027\u80fd\u3002"),(0,r.kt)("p",null,"\u56e0\u4e3a\u6211\u4eec\u4e0d\u60f3\u4ece\u5934\u5f00\u59cb\u5199\u4e00\u4e2a\u56fe\u5f62\u5e93\uff0c\u6240\u4ee5\u6211\u4eec\u6765\u770b\u770b\u76ee\u524d\u6709\u54ea\u4e9b\u4e3a React Native \u8bbe\u8ba1\u7684\u56fe\u5f62\u5e93\uff1a"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"react-native-svg\uff1a\u4e3a iOS\u3001Android\u3001macOS\u3001Windows\u4e0a\u7684 React Native \u63d0\u4f9b SVG \u652f\u6301\uff0c\u5e76\u4e3a\u6d4f\u89c8\u5668\u63d0\u4f9b\u4e00\u4e2a\u517c\u5bb9\u5c42\u3002"),(0,r.kt)("li",{parentName:"ol"},"react-native-skia\uff1aReact Native Skia \u5c06 Skia \u56fe\u5f62\u5e93\u5f15\u5165 React Native\u3002Skia \u4f5c\u4e3a Google Chrome \u548c Chrome OS\u3001Android\u3001Flutter\u3001Mozilla Firefox \u548c Firefox OS \u4ee5\u53ca\u8bb8\u591a\u5176\u4ed6\u4ea7\u54c1\u7684\u56fe\u5f62\u5f15\u64ce\u3002\u5b83\u8fd8\u63d0\u4f9b\u4e86\u4e00\u4e2a ",(0,r.kt)("a",{parentName:"li",href:"https://shopify.github.io/react-native-skia/docs/images-svg"},"ImageSVG")," \u7ec4\u4ef6\uff0c\u652f\u6301\u6e32\u67d3 SVG \u683c\u5f0f\u7684\u56fe\u7247\u3002")),(0,r.kt)("p",null,"\u6211\u4eec\u77e5\u9053 ECharts \u652f\u6301 SVG \u6e32\u67d3\uff0c\u6240\u4ee5\u5982\u679c\u6211\u4eec\u5728\u56fe\u8868\u6e32\u67d3\u4e4b\u524d\u83b7\u5f97 SVG \u6570\u636e\u5e76\u63d0\u4f9b\u7ed9 react-native-svg \u6216 react-native-skia \u8fdb\u884c\u6e32\u67d3\uff0c\u6211\u4eec\u5c31\u80fd\u5b9e\u73b0\u6211\u4eec\u7684\u76ee\u6807\u4e86\u3002"),(0,r.kt)("p",null,"\u7ecf\u8fc7\u4e00\u6bb5\u65f6\u95f4\u7684\u5b9e\u9a8c\uff0c\u6211\u4eec\u5f00\u53d1\u4e86 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/wuba/react-native-echarts"},"@wuba/react-native-echart"),"\uff0c\u5177\u6709\u4ee5\u4e0b\u7279\u70b9\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\ud83d\udd25 \u4e0e Apache ECharts \u7684\u4f7f\u7528\u65b9\u5f0f\u76f8\u540c"),(0,r.kt)("li",{parentName:"ul"},"\ud83c\udfa8 \u4e30\u5bcc\u7684\u56fe\u8868\uff0c\u51e0\u4e4e\u6db5\u76d6\u6240\u6709\u7684\u4f7f\u7528\u573a\u666f"),(0,r.kt)("li",{parentName:"ul"},"\u2728 \u53ef\u9009\u7684\u6e32\u67d3\u5e93\uff0cSkia \u6216 SVG"),(0,r.kt)("li",{parentName:"ul"},"\ud83d\ude80 \u53ef\u4e0e web \u9875\u9762\u590d\u7528\u4ee3\u7801"),(0,r.kt)("li",{parentName:"ul"},"\ud83d\udcf1 \u652f\u6301\u7f29\u653e\u624b\u52bf")),(0,r.kt)("h2",{id:"\u5982\u4f55\u4f7f\u7528"},"\u5982\u4f55\u4f7f\u7528"),(0,r.kt)("p",null,"\u5728\u5b9e\u8df5\u4e2d\uff0c@wuba/react-native-echarts \u7684\u6574\u4f53\u6d41\u7a0b\u4e0e ECharts \u7c7b\u4f3c\uff1a"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\u5b89\u88c5 @wuba/react-native-echarts"),(0,r.kt)("li",{parentName:"ol"},"\u9009\u62e9\u5b89\u88c5 react-native-svg \u6216 @shopify/react-native-skia"),(0,r.kt)("li",{parentName:"ol"},"\u5f15\u5165 @wuba/react-native-echarts \u7684\u76f8\u5173\u7ec4\u4ef6"),(0,r.kt)("li",{parentName:"ol"},"\u7528 @wuba/react-native-echarts \u7684 SVGRenderer \u66ff\u6362 ECharts \u7684 SVGRenderer"),(0,r.kt)("li",{parentName:"ol"},"\u7f16\u5199\u56fe\u8868\u7684\u9009\u9879\u914d\u7f6e\u4fe1\u606f"),(0,r.kt)("li",{parentName:"ol"},"\u4f7f\u7528 SkiaChart \u6216 SvgChart \u7ec4\u4ef6")),(0,r.kt)("p",null,"\u4e0b\u9762\u662f\u793a\u4f8b\u4ee3\u7801\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"// import { SkiaChart, SVGRenderer } from '@wuba/react-native-echarts';\nimport SkiaChart, { SVGRenderer } from '@wuba/react-native-echarts/skiaChart';\nimport * as echarts from 'echarts/core';\nimport { useRef, useEffect } from 'react';\nimport { LineChart } from 'echarts/charts';\n\necharts.use([ SVGRenderer, LineChart ])\n\nexport default function App() {\n  const skiaRef = useRef<any>(null);\n  useEffect(() => {\n    const option = {\n      xAxis: {\n        type: 'category',\n        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']\n      },\n      yAxis: {\n        type: 'value'\n      },\n      series: [\n        {\n          data: [150, 230, 224, 218, 135, 147, 260],\n          type: 'line'\n        }\n      ]\n    }\n    let chart: any;\n    if (skiaRef.current) {\n      chart = echarts.init(skiaRef.current, 'light', {\n        renderer: 'svg',\n        width: 250,\n        height: 300,\n      });\n      chart.setOption(option);\n    }\n    return () => chart?.dispose();\n  }, []);\n\n  return <SkiaChart ref={skiaRef} />;\n}\n")),(0,r.kt)("p",null,"\u4e0b\u9762\u662f\u5b83\u7684\u5c4f\u5e55\u622a\u56fe\uff1a"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Screenshot",src:a(9522).Z,width:"584",height:"395"})),(0,r.kt)("p",null,"\u662f\u4e0d\u662f\u7279\u522b\u7b80\u5355\uff1f\u66f4\u591a\u7684\u56fe\u8868\u914d\u7f6e\u53ef\u4ee5\u5728 ",(0,r.kt)("a",{parentName:"p",href:"https://echarts.apache.org/examples/en/index.html"},"echarts \u5b98\u7f51"),"\u4e0a\u67e5\u770b\u3002"),(0,r.kt)("p",null,"\u76ee\u524d ECharts \u6240\u652f\u6301\u7684\u5927\u90e8\u5206\u56fe\u8868\u90fd\u80fd\u652f\u6301\u3002\u6211\u5c06\u5728\u4e0b\u9762\u5c55\u793a\u4e00\u4e9b\u56fe\u8868\uff0c\u66f4\u591a\u7684\u4f8b\u5b50\u53ef\u4ee5\u5728 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/wuba/taro-playground"},"tao-playground")," \u9879\u76ee\u4e2d\u770b\u5230\u3002"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"\u4f8b\u5b50",src:a(5002).Z,width:"645",height:"527"}),"\n",(0,r.kt)("img",{alt:"\u4f8b\u5b50",src:a(9730).Z,width:"400",height:"287"}),"\n",(0,r.kt)("img",{alt:"\u4f8b\u5b50",src:a(1884).Z,width:"400",height:"292"}),"\n",(0,r.kt)("img",{alt:"\u4f8b\u5b50",src:a(5479).Z,width:"400",height:"284"})),(0,r.kt)("h2",{id:"\u6027\u80fd"},"\u6027\u80fd"),(0,r.kt)("p",null,"\u5982\u524d\u6240\u8ff0\uff0c\u5728 React Native \u4e2d\u4f7f\u7528 ECharts \u7684\u4e3b\u6d41\u65b9\u6848\u662f\u901a\u8fc7 WebView \u5b9e\u73b0\u3002\u5728\u4f17\u591a\u57fa\u4e8e WebView \u7684\u5b9e\u73b0\u4e2d\uff0creact-native-echarts-pro \u62e5\u6709\u66f4\u591a\u7684\u7528\u6237\uff0c\u6240\u4ee5\u6211\u4eec\u9009\u62e9 react-native-echarts-pro \u4f5c\u4e3a\u5bf9\u6bd4\u3002"),(0,r.kt)("p",null,"\u4e0b\u9762\u662f\u4e0d\u540c\u5b9e\u73b0\u65b9\u5f0f\u7684\u521d\u59cb\u5316\u8fc7\u7a0b\u7684\u622a\u56fe\uff1a"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"\u6027\u80fd",src:a(5581).Z,width:"400",height:"776"})),(0,r.kt)("p",null,"\u7ecf\u8fc7\u76f8\u5f53\u591a\u7684\u6d4b\u8bd5\u6848\u4f8b\uff0c\u6211\u4eec\u53d1\u73b0 @wuba/react-native-echarts \u5728\u5e38\u89c4\u4f7f\u7528\u573a\u666f\u4e2d\u5177\u6709\u6027\u80fd\u4f18\u52bf\uff0c\u4f46\u5728\u6709\u5927\u91cf\u6570\u636e\u7684\u573a\u666f\u4e2d\uff0c\u7531\u4e8e\u58f0\u660e\u5f0f\u7684 UI \u6e32\u67d3\u65b9\u6cd5\uff0c\u4f1a\u6709\u660e\u663e\u7684\u6ede\u540e\u6027\uff0c\u540e\u7eed\u6211\u4eec\u4f1a\u7ee7\u7eed\u63a2\u7d22\uff0c\u4ee5\u63d0\u9ad8\u6027\u80fd\u3002"),(0,r.kt)("h2",{id:"\u5b9e\u73b0\u7ec6\u8282"},"\u5b9e\u73b0\u7ec6\u8282"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"\u539f\u7406",src:a(1484).Z,width:"1146",height:"640"})),(0,r.kt)("p",null,"\u4ee5\u4e0a\u662f\u8be5\u5e93\u7684\u6d41\u7a0b\u56fe\uff0c\u4ee5 react-native-svg \u4e3a\u4f8b\uff0c\u6838\u5fc3\u5de5\u4f5c\u6d41\u7a0b\u662f\uff1a"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\u66ff\u6362 ECharts \u7684 SVGRenderer\uff0c\u7528\u81ea\u5b9a\u4e49\u7684 SVGPainter \u66ff\u6362\u6ce8\u518c\u7684 SVGPainter\u3002"),(0,r.kt)("li",{parentName:"ol"},"CustomSVGPainter \u7ee7\u627f\u4e86 SVGPainter\uff0c\u8986\u76d6\u4e86 constructor \u548c refresh \u51fd\u6570\uff0c\u5f53\u56fe\u8868\u6570\u636e\u88ab\u521d\u59cb\u5316\u6216\u66f4\u65b0\u65f6\uff0c\u8c03\u7528 SVGComponent \u4e0a\u6ce8\u518c\u7684 patch \u51fd\u6570\uff0c\u5e76\u5c06\u8ba1\u7b97\u51fa\u7684\u65b0 SVG \u6570\u636e\u4f20\u9012\u7ed9\u5b83\u3002"),(0,r.kt)("li",{parentName:"ol"},"\u5b9a\u4e49 SVGComponent\uff0c\u5b83\u7ba1\u7406\u7740\u5f53\u524d\u7684\u56fe\u8868\u5b9e\u4f8b\uff0c\u5e76\u5728\u5176\u4e0a\u6709\u4e00\u4e2a\u6838\u5fc3\u7684 patch \u51fd\u6570\u6765\u63a5\u6536\u5b9e\u65f6\u7684 SVG \u6570\u636e\uff0c\u7136\u540e\u8c03\u7528 SVGElement \u51fd\u6570\u3002"),(0,r.kt)("li",{parentName:"ol"},"SVGElement \u51fd\u6570\u4f1a\u8fed\u4ee3\u6240\u6709\u7684 SVG \u8282\u70b9\uff0c\u5e76\u5c06\u5b83\u4eec\u8f6c\u5316\u4e3a react-native-svg \u63d0\u4f9b\u7684\u76f8\u5e94\u7684 SVG \u5143\u7d20\uff0c\u7528\u4e8e\u6700\u7ec8\u7684\u6e32\u67d3\u52a8\u4f5c\u3002")),(0,r.kt)("p",null,"\u5f53\u4f7f\u7528 react-native-skia \u65f6\uff0c\u6709\u4e00\u4e9b\u533a\u522b\u3002\u5728\u5b9a\u4e49\u7684 SkiaComponent \u7ec4\u4ef6\u4e0a\u6709\u4e00\u4e2a\u6838\u5fc3\u65b9\u6cd5 patchString\uff0cpatchString \u63a5\u6536\u6539\u53d8\u7684 SVG \u6570\u636e\uff0c\u5c06\u5176\u8f6c\u6362\u4e3a SVG \u5b57\u7b26\u4e32\uff0c\u5e76\u5c06\u5176\u4f20\u9012\u7ed9 react-native-skia \u7684 ImageSVG \u7ec4\u4ef6\u8fdb\u884c\u6e32\u67d3\u3002"),(0,r.kt)("h2",{id:"\u5904\u7406\u89e6\u6478\u4e8b\u4ef6"},"\u5904\u7406\u89e6\u6478\u4e8b\u4ef6"),(0,r.kt)("p",null,"ECharts \u4e8b\u4ef6\u662f\u9f20\u6807\u4e8b\u4ef6\uff0c\u5982\u70b9\u51fb\u3001\u53cc\u51fb\u3001\u9f20\u6807\u4e0b\u62c9\u3001\u9f20\u6807\u79fb\u52a8\u7b49\u3002\u9f20\u6807\u4e8b\u4ef6\u88ab\u7528\u6765\u89e6\u53d1\u56fe\u8868\u5143\u7d20\u7684\u663e\u793a\u6216\u52a8\u753b\u3002"),(0,r.kt)("p",null,"\u6211\u4eec\u4f7f\u7528 React Native \u7684 PanResponder \u6765\u6355\u83b7\u8fd9\u4e9b\u4e8b\u4ef6\uff0c\u7136\u540e\u5c06\u79fb\u52a8 TouchEvent \u6a21\u62df\u6210\u9f20\u6807\u4e8b\u4ef6\uff0c\u5e76\u5c06\u5176\u6d3e\u53d1\u7ed9 ECharts init \u65b9\u6cd5\u751f\u6210\u7684\u56fe\u8868\u5b9e\u4f8b\u3002"),(0,r.kt)("p",null,"\u4f8b\u5982\uff0c\u8ddf\u968f\u9f20\u6807\u5728\u56fe\u8868\u4e0a\u663e\u793a\u56fe\u4f8b\u7684\u52a8\u4f5c\u5728\u79fb\u52a8\u7aef\u662f TouchStart + TouchMove\uff0c\u7ffb\u8bd1\u6210\u9f20\u6807\u4e8b\u4ef6\u662f mousedown + mousemove\u3002"),(0,r.kt)("p",null,"\u53e6\u4e00\u4e2a\u4f8b\u5b50\u662f\u56fe\u8868\u7684\u7f29\u653e\uff0c\u79fb\u52a8\u7aef\u662f\u53cc\u6307\u7f29\u653e\uff0c\u8f6c\u5316\u4e3a\u9f20\u6807\u7684 mousewheel \u4e8b\u4ef6\uff0c\u5bf9\u5e94\u7684\u9f20\u6807\u6eda\u8f6e\u6eda\u52a8\u8ddd\u79bb\u662f\u7531\u53cc\u6307\u8ddd\u79bb\u53d8\u5316\u8ba1\u7b97\u7684\u3002"),(0,r.kt)("p",null,"\u4e0b\u9762\u662f\u5173\u952e\u4ee3\u7801\uff1a"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\u5c06 TouchEvent \u8f6c\u6362\u4e3a MouseEvent")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"PanResponder.create({\n  onPanResponderGrant: ({ nativeEvent }) => {\n    // Action start, translated into mouse down and move events\n    dispatchEvent(\n      zrenderId,\n      ['mousedown', 'mousemove'],\n      nativeEvent,\n      'start'\n    );\n  },\n  onPanResponderMove: ({ nativeEvent }) => {\n    // Handling finger movement operations\n    const length = nativeEvent.touches.length;\n    if (length === 1) {\n      // single finger\n    } else if (length === 2) {\n      // Handling two-finger movement operations here\n      if (!zooming) {\n        // ...\n      } else {\n        // Here the event is converted to a scroll wheel\n        const { initialX, initialY, prevDistance } = pan.current;\n        const delta = distance - prevDistance;\n        pan.current.prevDistance = distance;\n        dispatchEvent(zrenderId, ['mousewheel'], nativeEvent, undefined, {\n          zrX: initialX,\n          zrY: initialY,\n          zrDelta: delta / 120,\n        });\n      }\n    }\n  },\n  onPanResponderRelease: ({ nativeEvent }) => {\n    // The action is over, where it is transformed into a mouse click release operation\n  },\n})\n")),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"\u5c06 MouseEvent \u5e94\u7528\u5230 ECharts \u56fe\u8868\u5b9e\u4f8b\u4e0a")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"function dispatchEvent(\n  zrenderId: number,\n  types: HandlerName[],\n  nativeEvent: NativeTouchEvent,\n  stage: 'start' | 'end' | 'change' | undefined,\n  props: any = {\n    zrX: nativeEvent.locationX,\n    zrY: nativeEvent.locationY,\n  }\n) {\n  if (zrenderId) {\n    var handler = getInstance(zrenderId).handler;\n    types.forEach(function (type) {\n      handler.dispatch(type, {\n        preventDefault: noop,\n        stopImmediatePropagation: noop,\n        stopPropagation: noop,\n        ...props,\n      });\n      stage && handler.processGesture(wrapTouch(nativeEvent), stage);\n    });\n  }\n}\n")),(0,r.kt)("h2",{id:"\u66f4\u591a\u7684\u4fe1\u606f"},"\u66f4\u591a\u7684\u4fe1\u606f"),(0,r.kt)("p",null,"\u53bb ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/wuba/react-native-echarts"},"https://github.com/wuba/react-native-echarts")," \u67e5\u770b\u6e90\u4ee3\u7801\uff0c\u5982\u679c\u4f60\u559c\u6b22\uff0c\u8bf7\u7ed9\u6211\u4eec\u4e00\u9897\u661f\u3002\u5982\u679c\u4f60\u9047\u5230\u4efb\u4f55\u95ee\u9898\uff0c\u4f60\u53ef\u4ee5\u63d0\u4ea4\u4e00\u4e2a ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/wuba/react-native-echarts/issues"},"issue"),"\u3002"),(0,r.kt)("p",null,"\u672c\u6587\u7684\u793a\u4f8b\u4ee3\u7801\u5728 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/wuba/taro-playground"},"https://github.com/wuba/taro-playground")," \u9879\u76ee\u4e0a\uff0c\u8be5\u9879\u76ee\u4e5f\u662f\u5f00\u6e90\u7684\uff0c\u611f\u5174\u8da3\u7684\u670b\u53cb\u4e5f\u53ef\u4ee5\u76f4\u63a5\u4ece\u5e94\u7528\u5546\u5e97\u6216\u4ece",(0,r.kt)("a",{parentName:"p",href:"https://github.com/wuba/taro-playground/releases"},"\u53d1\u5e03\u9875"),"\u4e0a\u5b89\u88c5\u65b0\u7248\u7684 Taro Playground \u5e94\u7528\u6765\u4f53\u9a8c\u5b83\u3002"))}u.isMDXComponent=!0},9730:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/animate1-dbd822744dbd0fe1f6889daa7a980b0e.gif"},1884:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/animate2-f3d76bae8015d20cf42452fc509cdec0.gif"},5479:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/animate3-f7aa597993b2b557ba16e2551d5efe64.gif"},5002:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/example-425748ac187589df63f342b881e6f028.jpg"},477:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/examples-3176fb6a357e32d589e7b3eb13b21ace.jpg"},5581:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/performance-e78c5567d2d303b78c2e7b7ac9d3d9f4.gif"},1484:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/principle-40b62cc09f12dee58ca5dffe28733a63.webp"},9522:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/screenshot-00bb1a17b9d5bf43e26b384f6deff8c0.jpg"}}]);