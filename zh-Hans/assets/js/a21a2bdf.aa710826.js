"use strict";(self.webpackChunkreact_native_echarts=self.webpackChunkreact_native_echarts||[]).push([[207],{3905:(e,t,a)=>{a.d(t,{Zo:()=>h,kt:()=>m});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},c=Object.keys(e);for(r=0;r<c.length;r++)a=c[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)a=c[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=r.createContext({}),p=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},h=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,c=e.originalType,s=e.parentName,h=o(e,["components","mdxType","originalType","parentName"]),u=p(a),g=n,m=u["".concat(s,".").concat(g)]||u[g]||l[g]||c;return a?r.createElement(m,i(i({ref:t},h),{},{components:a})):r.createElement(m,i({ref:t},h))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var c=a.length,i=new Array(c);i[0]=g;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[u]="string"==typeof e?e:n,i[1]=o;for(var p=2;p<c;p++)i[p]=a[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}g.displayName="MDXCreateElement"},1382:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>l,frontMatter:()=>c,metadata:()=>o,toc:()=>p});var r=a(7462),n=(a(7294),a(3905));const c={slug:"using-apache-echarts-in-react-native",title:"\u5728 React Native \u4e2d\u4f7f\u7528 Apache ECharts",authors:["zhiqing"],tags:["intro"]},i=void 0,o={permalink:"/react-native-echarts/zh-Hans/blog/using-apache-echarts-in-react-native",editUrl:"https://github.com/wuba/react-native-echarts/tree/docs/i18n/zh-Hans/docusaurus-plugin-content-blog/2023-02-09-using-apache-echarts-in-react-native/index.md",source:"@site/i18n/zh-Hans/docusaurus-plugin-content-blog/2023-02-09-using-apache-echarts-in-react-native/index.md",title:"\u5728 React Native \u4e2d\u4f7f\u7528 Apache ECharts",description:"\u6211\u4eec\u4e3a react native APP \u5f00\u53d1\u4e86\u4e00\u4e2a\u5f00\u6e90\u56fe\u5f62\u5e93\uff0c\u5b83\u57fa\u4e8e Apache ECharts\uff0c\u4f7f\u7528 RNSVG \u6216 RNSkia \u8fdb\u884c\u6e32\u67d3\uff0c\u5176\u65b9\u5f0f\u4e0e\u5728\u6d4f\u89c8\u5668\u4e2d\u4e2d\u4f7f\u7528\u51e0\u4e4e\u76f8\u540c\uff0c\u53ef\u4ee5\u6ee1\u8db3\u5927\u591a\u6570\u7ed8\u56fe\u573a\u666f\u3002\u8be5\u9879\u76ee\u6e90\u4ee3\u7801\u53ef\u5728 https://github.com/wuba/react-native-echarts \u4e2d\u67e5\u770b\u3002",date:"2023-02-09T00:00:00.000Z",formattedDate:"2023\u5e742\u67089\u65e5",tags:[{label:"intro",permalink:"/react-native-echarts/zh-Hans/blog/tags/intro"}],readingTime:8.935,hasTruncateMarker:!0,authors:[{name:"Zhiqing Chen",title:"react-native-echarts \u7684\u7ef4\u62a4\u8005",url:"https://github.com/zhiqingchen",imageURL:"https://github.com/zhiqingchen.png",key:"zhiqing"}],frontMatter:{slug:"using-apache-echarts-in-react-native",title:"\u5728 React Native \u4e2d\u4f7f\u7528 Apache ECharts",authors:["zhiqing"],tags:["intro"]},prevItem:{title:"Expo\u4e2d\u4f7f\u7528@wuba/react-native-echarts",permalink:"/react-native-echarts/zh-Hans/blog/using-wuba-react-native-echarts"},nextItem:{title:"\u6b22\u8fce",permalink:"/react-native-echarts/zh-Hans/blog/welcome"}},s={authorsImageUrls:[void 0]},p=[],h={toc:p},u="wrapper";function l(e){let{components:t,...c}=e;return(0,n.kt)(u,(0,r.Z)({},h,c,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"\u6211\u4eec\u4e3a react native APP \u5f00\u53d1\u4e86\u4e00\u4e2a",(0,n.kt)("a",{parentName:"p",href:"https://github.com/wuba/react-native-echarts"},"\u5f00\u6e90\u56fe\u5f62\u5e93"),"\uff0c\u5b83\u57fa\u4e8e ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/echarts"},"Apache ECharts"),"\uff0c\u4f7f\u7528 ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/react-native-svg/react-native-svg"},"RNSVG")," \u6216 ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/shopify/react-native-skia"},"RNSkia")," \u8fdb\u884c\u6e32\u67d3\uff0c\u5176\u65b9\u5f0f\u4e0e\u5728\u6d4f\u89c8\u5668\u4e2d\u4e2d\u4f7f\u7528\u51e0\u4e4e\u76f8\u540c\uff0c\u53ef\u4ee5\u6ee1\u8db3\u5927\u591a\u6570\u7ed8\u56fe\u573a\u666f\u3002\u8be5\u9879\u76ee\u6e90\u4ee3\u7801\u53ef\u5728 ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/wuba/react-native-echarts"},"https://github.com/wuba/react-native-echarts")," \u4e2d\u67e5\u770b\u3002"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"\u793a\u4f8b",src:a(477).Z,width:"4160",height:"3120"})))}l.isMDXComponent=!0},477:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/examples-3176fb6a357e32d589e7b3eb13b21ace.jpg"}}]);