"use strict";(self.webpackChunkreact_native_echarts=self.webpackChunkreact_native_echarts||[]).push([[343],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>f});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=r.createContext({}),l=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},u=function(e){var n=l(e.components);return r.createElement(c.Provider,{value:n},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,s=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=l(t),m=a,f=p["".concat(c,".").concat(m)]||p[m]||d[m]||s;return t?r.createElement(f,o(o({ref:n},u),{},{components:t})):r.createElement(f,o({ref:n},u))}));function f(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var s=t.length,o=new Array(s);o[0]=m;var i={};for(var c in n)hasOwnProperty.call(n,c)&&(i[c]=n[c]);i.originalType=e,i[p]="string"==typeof e?e:a,o[1]=i;for(var l=2;l<s;l++)o[l]=t[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},6776:(e,n,t)=>{t.d(n,{Z:()=>s});var r=t(7294);const a=["@wuba/react-native-echarts@1.2.5-all.0","react-native-svg","react-native-reanimated","@shopify/react-native-skia","react-native-gesture-handler"];function s(e){const n=e.name?decodeURIComponent(e.name):"Example",t=e.description?decodeURIComponent(e.description):"Example usage",s=`App.${e.ext?decodeURIComponent(e.ext):"tsx"}`,o=encodeURIComponent(JSON.stringify({[s]:{type:"CODE",contents:`import './polyfills';// temporary fixes for snack error\n${e.children}`},"polyfills.js":{type:"CODE",contents:"global.__reanimatedWorkletInit = function () {};export default {}"}})),i=e.dependencies||a.join(","),c=e.platform||"web",l=e.supportedPlatforms||"ios,android,web",u=e.theme||"light",p=e.preview||"true",d=e.loading||"lazy";return r.createElement("div",{className:"snack-player","data-snack-name":n,"data-snack-description":t,"data-snack-files":o,"data-snack-dependencies":i,"data-snack-platform":c,"data-snack-supported-platforms":l,"data-snack-theme":u,"data-snack-preview":p,"data-snack-loading":d})}},9839:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>c,default:()=>f,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var r=t(7462),a=(t(7294),t(3905)),s=t(6776);const o="// Original example: https://echarts.apache.org/examples/en/editor.html?c=area-simple\n// The following code is modified from\n// https://github.com/apache/echarts-examples/blob/gh-pages/public/examples/ts/area-simple.ts\n// under Apache License 2.0.\n\nimport { useRef, useEffect, useCallback, useState } from 'react';\nimport { StyleSheet, View, Dimensions, Text } from 'react-native';\nimport { SVGRenderer, SkiaChart, echarts } from '@wuba/react-native-echarts';\nimport { GestureHandlerRootView } from 'react-native-gesture-handler';\n\necharts.use([SVGRenderer]);\n\nconst E_HEIGHT = 400;\nconst E_WIDTH = Dimensions.get('window').width;\n\nlet base = +new Date(1968, 9, 3);\nlet oneDay = 24 * 3600 * 1000;\nlet date = [];\nlet data = [Math.random() * 300];\nfor (let i = 1; i < 20000; i++) {\n  var now = new Date((base += oneDay));\n  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));\n  data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));\n}\n\nconst option = {\n  tooltip: {\n    trigger: 'axis',\n    position: function (pt) {\n      return [pt[0], '10%'];\n    }\n  },\n  title: {\n    left: 'center',\n    text: 'Large Area Chart'\n  },\n  toolbox: {\n    feature: {\n      dataZoom: {\n        yAxisIndex: 'none'\n      },\n      restore: {},\n      saveAsImage: {}\n    }\n  },\n  xAxis: {\n    type: 'category',\n    boundaryGap: false,\n    data: date\n  },\n  yAxis: {\n    type: 'value',\n    boundaryGap: [0, '100%']\n  },\n  dataZoom: [\n    {\n      type: 'inside',\n      start: 0,\n      end: 10\n    },\n    {\n      start: 0,\n      end: 10\n    }\n  ],\n  series: [\n    {\n      name: 'Fake Data',\n      type: 'line',\n      symbol: 'none',\n      sampling: 'lttb',\n      itemStyle: {\n        color: 'rgb(255, 70, 131)'\n      },\n      areaStyle: {\n        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [\n          {\n            offset: 0,\n            color: 'rgb(255, 158, 68)'\n          },\n          {\n            offset: 1,\n            color: 'rgb(255, 70, 131)'\n          }\n        ])\n      },\n      data: data\n    }\n  ]\n};\n\nexport default function App() {\n  const skiaRef = useRef<any>(null);\n  useEffect(() => {\n    let chart: any;\n    if (skiaRef.current) {\n      chart = echarts.init(skiaRef.current, 'light', {\n        renderer: 'svg',\n        width: E_WIDTH,\n        height: E_HEIGHT,\n      });\n      chart.setOption(option);\n    }\n    return () => chart?.dispose();\n  }, []);\n  const [isZooming, setIsZooming] = useState(false);\n  const gesture = useCallback((defaultGestures) => {\n    // Add long press to pan gesture\n    defaultGestures[0].activateAfterLongPress(250);\n\n    // Listen to pinch gesture\n    defaultGestures[1].onStart(() => {\n      setIsZooming(true);\n    }).onEnd(() => {\n      setIsZooming(false);\n    });\n\n    // Omit tap gesture\n    return defaultGestures.slice(0, 2);\n  }, []);\n\n  return (\n    <GestureHandlerRootView style={{ flex: 1 }}>\n      <Text>Is zooming: {isZooming ? \"Yes\" : \"No\"}</Text>\n      <View style={styles.container}>\n        <SkiaChart ref={skiaRef} useRNGH gesture={gesture} />\n      </View>\n    </GestureHandlerRootView>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    alignItems: 'center',\n    justifyContent: 'center',\n  },\n});",i={sidebar_position:4},c="\u4f7f\u7528 react-native-gesture-handler \u5e76\u81ea\u5b9a\u4e49\u624b\u52bf",l={unversionedId:"expo-snacks/custom-gesture-use-rngh",id:"expo-snacks/custom-gesture-use-rngh",title:"\u4f7f\u7528 react-native-gesture-handler \u5e76\u81ea\u5b9a\u4e49\u624b\u52bf",description:"",source:"@site/i18n/zh-Hans/docusaurus-plugin-content-docs/current/expo-snacks/custom-gesture-use-rngh.md",sourceDirName:"expo-snacks",slug:"/expo-snacks/custom-gesture-use-rngh",permalink:"/react-native-echarts/zh-Hans/docs/expo-snacks/custom-gesture-use-rngh",draft:!1,editUrl:"https://github.com/wuba/react-native-echarts/tree/docs/i18n/zh-Hans/docusaurus-plugin-content-docs/current/expo-snacks/custom-gesture-use-rngh.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"\u4f7f\u7528 react-native-gesture-handler \u7684\u5927\u9762\u79ef\u56fe",permalink:"/react-native-echarts/zh-Hans/docs/expo-snacks/large-area-chart-use-rngh"},next:{title:"\u81ea\u9002\u5e94\u5c3a\u5bf8\u56fe\u8868",permalink:"/react-native-echarts/zh-Hans/docs/expo-snacks/adaptive-size-chart"}},u={},p=[],d={toc:p},m="wrapper";function f(e){let{components:n,...t}=e;return(0,a.kt)(m,(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u4f7f\u7528-react-native-gesture-handler-\u5e76\u81ea\u5b9a\u4e49\u624b\u52bf"},"\u4f7f\u7528 react-native-gesture-handler \u5e76\u81ea\u5b9a\u4e49\u624b\u52bf"),(0,a.kt)(s.Z,{name:"\u4f7f\u7528\u81ea\u5b9a\u4e49\u624b\u52bf\u7684\u5927\u9762\u79ef\u56fe",mdxType:"SnackPlayer"},o))}f.isMDXComponent=!0}}]);