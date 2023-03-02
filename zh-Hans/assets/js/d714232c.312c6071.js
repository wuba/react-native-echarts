"use strict";(self.webpackChunkreact_native_echarts=self.webpackChunkreact_native_echarts||[]).push([[229],{3905:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>m});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),p=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},l=function(e){var n=p(e.components);return r.createElement(s.Provider,{value:n},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=p(t),f=a,m=u["".concat(s,".").concat(f)]||u[f]||d[f]||i;return t?r.createElement(m,o(o({ref:n},l),{},{components:t})):r.createElement(m,o({ref:n},l))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=f;var c={};for(var s in n)hasOwnProperty.call(n,s)&&(c[s]=n[s]);c.originalType=e,c[u]="string"==typeof e?e:a,o[1]=c;for(var p=2;p<i;p++)o[p]=t[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},9097:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>y,frontMatter:()=>p,metadata:()=>u,toc:()=>f});var r=t(7462),a=t(7294),i=t(3905);const o=["wrn-echarts@0.1.5-all.0","react-native-svg","react-native-reanimated","@shopify/react-native-skia"];function c(e){const n=e.name?decodeURIComponent(e.name):"Example",t=e.description?decodeURIComponent(e.description):"Example usage",r=`App.${e.ext?decodeURIComponent(e.ext):"tsx"}`,i=encodeURIComponent(JSON.stringify({[r]:{type:"CODE",contents:e.children}})),c=e.dependencies||o.join(","),s=e.platform||"ios",p=e.supportedPlatforms||"ios,android",l=e.theme||"light",u=e.preview||"true",d=e.loading||"lazy";return a.createElement("div",{className:"snack-player","data-snack-name":n,"data-snack-description":t,"data-snack-files":i,"data-snack-dependencies":c,"data-snack-platform":s,"data-snack-supported-platforms":p,"data-snack-theme":l,"data-snack-preview":u,"data-snack-loading":d})}const s="import React, { useRef, useEffect } from 'react';\nimport { StyleSheet, View, Dimensions } from 'react-native';\nimport { SVGRenderer, SkiaChart, echarts } from 'wrn-echarts';\n\necharts.use([SVGRenderer]);\n\nconst E_HEIGHT = 400;\nconst E_WIDTH = Dimensions.get('screen').width;\n\nexport default function App() {\n  const skiaRef = useRef<any>(null);\n  useEffect(() => {\n    const option = {\n      xAxis: {\n        type: 'category',\n        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],\n      },\n      yAxis: {\n        type: 'value',\n      },\n      series: [\n        {\n          data: [150, 230, 224, 218, 135, 147, 260],\n          type: 'line',\n        },\n      ],\n    };\n    let chart: any;\n    if (skiaRef.current) {\n      chart = echarts.init(skiaRef.current, 'light', {\n        renderer: 'svg',\n        width: E_WIDTH,\n        height: E_HEIGHT,\n      });\n      chart.setOption(option);\n    }\n    return () => chart?.dispose();\n  }, []);\n\n  return (\n    <View style={styles.container}>\n      <SkiaChart ref={skiaRef} />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    alignItems: 'center',\n    justifyContent: 'center',\n  },\n});",p={sidebar_position:2},l="\u7b80\u5355\u7684\u6298\u7ebf\u56fe",u={unversionedId:"expo-snacks/simple-line-chart",id:"expo-snacks/simple-line-chart",title:"\u7b80\u5355\u7684\u6298\u7ebf\u56fe",description:"",source:"@site/i18n/zh-Hans/docusaurus-plugin-content-docs/current/expo-snacks/simple-line-chart.md",sourceDirName:"expo-snacks",slug:"/expo-snacks/simple-line-chart",permalink:"/react-native-echarts/zh-Hans/docs/expo-snacks/simple-line-chart",draft:!1,editUrl:"https://github.com/wuba/react-native-echarts/tree/docs/i18n/zh-Hans/docusaurus-plugin-content-docs/current/expo-snacks/simple-line-chart.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"\u7b80\u4ecb",permalink:"/react-native-echarts/zh-Hans/docs/expo-snacks/intro"},next:{title:"\u5355\u72ec\u5bfc\u5165",permalink:"/react-native-echarts/zh-Hans/docs/advanced-guides/import-individually"}},d={},f=[],m={toc:f},h="wrapper";function y(e){let{components:n,...t}=e;return(0,i.kt)(h,(0,r.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"\u7b80\u5355\u7684\u6298\u7ebf\u56fe"},"\u7b80\u5355\u7684\u6298\u7ebf\u56fe"),(0,i.kt)(c,{name:"\u7b80\u5355\u7684\u6298\u7ebf\u56fe",mdxType:"SnackPlayer"},s))}y.isMDXComponent=!0}}]);