"use strict";(self.webpackChunkreact_native_echarts=self.webpackChunkreact_native_echarts||[]).push([[863],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=s(r),f=a,d=u["".concat(l,".").concat(f)]||u[f]||m[f]||o;return r?n.createElement(d,i(i({ref:t},p),{},{components:r})):n.createElement(d,i({ref:t},p))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=f;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[u]="string"==typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},6791:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>c,toc:()=>s});var n=r(7462),a=(r(7294),r(3905));const o={sidebar_position:1},i="\u7b80\u4ecb",c={unversionedId:"intro",id:"intro",title:"\u7b80\u4ecb",description:"React Native ECharts \u9879\u76ee\u662f\u4e00\u4e2a\u5f00\u6e90\u7684\u5e93\uff0c\u7528\u4e8e\u5728 React Native \u5e94\u7528\u7a0b\u5e8f\u4e2d\u521b\u5efa\u4ea4\u4e92\u5f0f\u56fe\u8868\u3002\u901a\u8fc7\u7528\u6237\u53cb\u597d\u7684\u8bbe\u8ba1\u548c\u7b80\u5355\u7684 API\uff0c\u5f00\u53d1\u8005\u53ef\u4ee5\u521b\u5efa\u5404\u79cd\u53ef\u5b9a\u5236\u7684\u56fe\u8868\u3002",source:"@site/i18n/zh-Hans/docusaurus-plugin-content-docs/current/intro.md",sourceDirName:".",slug:"/intro",permalink:"/react-native-echarts/zh-Hans/docs/intro",draft:!1,editUrl:"https://github.com/wuba/react-native-echarts/tree/docs/i18n/zh-Hans/docusaurus-plugin-content-docs/current/intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"\u5b89\u88c5",permalink:"/react-native-echarts/zh-Hans/docs/getting-started/installation"}},l={},s=[{value:"\u7279\u70b9",id:"\u7279\u70b9",level:2},{value:"\u6848\u4f8b",id:"\u6848\u4f8b",level:2}],p={toc:s},u="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u7b80\u4ecb"},"\u7b80\u4ecb"),(0,a.kt)("p",null,"React Native ECharts \u9879\u76ee\u662f\u4e00\u4e2a\u5f00\u6e90\u7684\u5e93\uff0c\u7528\u4e8e\u5728 React Native \u5e94\u7528\u7a0b\u5e8f\u4e2d\u521b\u5efa\u4ea4\u4e92\u5f0f\u56fe\u8868\u3002\u901a\u8fc7\u7528\u6237\u53cb\u597d\u7684\u8bbe\u8ba1\u548c\u7b80\u5355\u7684 API\uff0c\u5f00\u53d1\u8005\u53ef\u4ee5\u521b\u5efa\u5404\u79cd\u53ef\u5b9a\u5236\u7684\u56fe\u8868\u3002"),(0,a.kt)("h2",{id:"\u7279\u70b9"},"\u7279\u70b9"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\ud83c\udfa8 ",(0,a.kt)("strong",{parentName:"li"},"\u4f7f\u7528 ",(0,a.kt)("a",{parentName:"strong",href:"https://github.com/apache/echarts"},"Apache ECharts")," \u6784\u5efa"),"\uff0c\u63d0\u4f9b\u81ea\u5b9a\u4e49\u9009\u9879\uff0c\u4ee5\u89c6\u89c9\u65b9\u5f0f\u8868\u793a\u590d\u6742\u7684\u6570\u636e\u3002\u4f7f\u7528\u65b9\u6cd5\u4e0e ECharts \u51e0\u4e4e\u76f8\u540c\u3002"),(0,a.kt)("li",{parentName:"ul"},"\ud83d\udcf1 ",(0,a.kt)("strong",{parentName:"li"},"\u4e3a ",(0,a.kt)("a",{parentName:"strong",href:"https://reactnative.dev/"},"React Native")," \u8bbe\u8ba1"),"\uff0c\u5728\u5e94\u7528\u7a0b\u5e8f\u4e2d\u76f4\u63a5\u63d0\u4f9b\u56fe\u8868\u53ef\u89c6\u5316\uff0c\u4ee5\u83b7\u5f97\u65e0\u7f1d\u4f53\u9a8c\u3002"),(0,a.kt)("li",{parentName:"ul"},"\ud83d\ude80 \u5141\u8bb8\u5f00\u53d1\u4eba\u5458",(0,a.kt)("strong",{parentName:"li"},"\u4e0e web \u9875\u9762\u590d\u7528\u4ee3\u7801"),"\uff0c\u63d0\u4f9b\u66f4\u591a\u7684\u7075\u6d3b\u6027\u548c\u6210\u672c\u6548\u76ca\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u2728 \u53ef\u4ee5\u81ea\u7531\u9009\u62e9",(0,a.kt)("strong",{parentName:"li"},"\u4f7f\u7528 ",(0,a.kt)("a",{parentName:"strong",href:"https://github.com/shopify/react-native-skia"},"Skia")," \u6216 ",(0,a.kt)("a",{parentName:"strong",href:"https://github.com/software-mansion/react-native-svg"},"SVG"))," \u4f5c\u4e3a\u6e32\u67d3\u5e93\uff0c\u5728\u4e3a\u7279\u5b9a\u7684\u4f7f\u7528\u60c5\u51b5\u9009\u62e9\u6700\u4f73\u65b9\u6848\u65f6\u63d0\u4f9b\u4e86\u66f4\u5927\u7684\u7075\u6d3b\u6027\u3002"),(0,a.kt)("li",{parentName:"ul"},"\ud83e\udd33 ",(0,a.kt)("strong",{parentName:"li"},"\u652f\u6301\u7279\u5b9a\u7684\u79fb\u52a8\u7aef\u64cd\u4f5c"),"\uff0c\u5982\u7f29\u653e\uff0c\u4e3a\u79fb\u52a8\u8bbe\u5907\u4e0a\u7684\u56fe\u8868\u53ef\u89c6\u5316\u63d0\u4f9b\u4e86\u66f4\u76f4\u89c2\u548c\u4e92\u52a8\u7684\u7528\u6237\u4f53\u9a8c\u3002")),(0,a.kt)("h2",{id:"\u6848\u4f8b"},"\u6848\u4f8b"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Taro Playground App \u662f\u4e00\u4e2a\u4f7f\u7528 Taro \u5f00\u53d1\u7684\u8de8\u5e73\u53f0\u5e94\u7528\u7a0b\u5e8f\uff0c\u7528\u4e8e\u5e2e\u52a9\u5f00\u53d1\u8005\u5f00\u53d1\u548c\u8c03\u8bd5 Taro \u5e94\u7528\u7a0b\u5e8f\u3002\u5b83\u5305\u542b\u4e86 React Native ECharts \u7684\u5927\u90e8\u5206\u5b9e\u4f8b\uff0c\u60a8\u53ef\u4ee5",(0,a.kt)("a",{parentName:"li",href:"https://github.com/wuba/taro-playground/releases"},"\u4e0b\u8f7d\u5e76\u5b89\u88c5\u8be5\u5e94\u7528"),"\u8fdb\u884c\u9884\u89c8\u3002")),(0,a.kt)("p",null,"\u5982\u679c\u4f60\u6709\u5176\u4ed6\u7684\u4f8b\u5b50\uff0c\u8bf7\u7f16\u8f91\u8fd9\u4e2a\u9875\u9762\u3002"))}m.isMDXComponent=!0}}]);