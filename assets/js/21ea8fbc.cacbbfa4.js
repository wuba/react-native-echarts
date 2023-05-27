"use strict";(self.webpackChunkreact_native_echarts=self.webpackChunkreact_native_echarts||[]).push([[1139],{3905:(e,t,a)=>{a.d(t,{Zo:()=>h,kt:()=>m});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=r.createContext({}),p=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},h=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},l="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,h=o(e,["components","mdxType","originalType","parentName"]),l=p(a),g=n,m=l["".concat(s,".").concat(g)]||l[g]||u[g]||i;return a?r.createElement(m,c(c({ref:t},h),{},{components:a})):r.createElement(m,c({ref:t},h))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,c=new Array(i);c[0]=g;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[l]="string"==typeof e?e:n,c[1]=o;for(var p=2;p<i;p++)c[p]=a[p];return r.createElement.apply(null,c)}return r.createElement.apply(null,a)}g.displayName="MDXCreateElement"},6581:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>c,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var r=a(7462),n=(a(7294),a(3905));const i={slug:"using-apache-echarts-in-react-native",title:"Using Apache ECharts in React Native",authors:["zhiqing"],tags:["intro"]},c=void 0,o={permalink:"/react-native-echarts/blog/using-apache-echarts-in-react-native",editUrl:"https://github.com/wuba/react-native-echarts/tree/docs/blog/2023-02-09-using-apache-echarts-in-react-native/index.md",source:"@site/blog/2023-02-09-using-apache-echarts-in-react-native/index.md",title:"Using Apache ECharts in React Native",description:"We have developed an open source graphics library for react native APP, which is based on Apache ECharts and uses RNSVG or RNSkia for rendering in a way that is almost identical to using it in the web, and can satisfy most graphics situations. The project source code is available at https://github.com/wuba/react-native-echarts.",date:"2023-02-09T00:00:00.000Z",formattedDate:"February 9, 2023",tags:[{label:"intro",permalink:"/react-native-echarts/blog/tags/intro"}],readingTime:6.79,hasTruncateMarker:!0,authors:[{name:"Zhiqing Chen",title:"Maintainer of react-native-echarts",url:"https://github.com/zhiqingchen",imageURL:"https://github.com/zhiqingchen.png",key:"zhiqing"}],frontMatter:{slug:"using-apache-echarts-in-react-native",title:"Using Apache ECharts in React Native",authors:["zhiqing"],tags:["intro"]},prevItem:{title:"Using @wuba/react-native-echarts in Expo",permalink:"/react-native-echarts/blog/using-wuba-react-native-echarts"},nextItem:{title:"Welcome",permalink:"/react-native-echarts/blog/welcome"}},s={authorsImageUrls:[void 0]},p=[],h={toc:p},l="wrapper";function u(e){let{components:t,...i}=e;return(0,n.kt)(l,(0,r.Z)({},h,i,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"We have developed an ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/wuba/react-native-echarts"},"open source graphics library")," for react native APP, which is based on ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/echarts"},"Apache ECharts")," and uses ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/react-native-svg/react-native-svg"},"RNSVG")," or ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/shopify/react-native-skia"},"RNSkia")," for rendering in a way that is almost identical to using it in the web, and can satisfy most graphics situations. The project source code is available at ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/wuba/react-native-echarts"},"https://github.com/wuba/react-native-echarts"),"."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Examples",src:a(6378).Z,width:"4160",height:"3120"})))}u.isMDXComponent=!0},6378:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/examples-3176fb6a357e32d589e7b3eb13b21ace.jpg"}}]);