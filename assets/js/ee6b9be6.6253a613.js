"use strict";(self.webpackChunkreact_native_echarts=self.webpackChunkreact_native_echarts||[]).push([[3841],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>g});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(r),m=a,g=d["".concat(l,".").concat(m)]||d[m]||p[m]||i;return r?n.createElement(g,o(o({ref:t},u),{},{components:r})):n.createElement(g,o({ref:t},u))}));function g(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:a,o[1]=s;for(var c=2;c<i;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},8991:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var n=r(7462),a=(r(7294),r(3905));const i={sidebar_position:2},o="Use React Native Gesture Handler",s={unversionedId:"advanced-guides/use-rngh",id:"advanced-guides/use-rngh",title:"Use React Native Gesture Handler",description:"React Native Gesture Handler provides native-driven gesture management APIs for building best possible touch-based experiences in React Native. Starting from version 1.1.0, You can use it to handle gestures instead of PanResponder.",source:"@site/docs/advanced-guides/use-rngh.md",sourceDirName:"advanced-guides",slug:"/advanced-guides/use-rngh",permalink:"/react-native-echarts/docs/advanced-guides/use-rngh",draft:!1,editUrl:"https://github.com/wuba/react-native-echarts/tree/docs/docs/advanced-guides/use-rngh.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Import individually",permalink:"/react-native-echarts/docs/advanced-guides/import-individually"},next:{title:"Use in React",permalink:"/react-native-echarts/docs/advanced-guides/use-in-react"}},l={},c=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"Example",id:"example",level:2}],u={toc:c},d="wrapper";function p(e){let{components:t,...r}=e;return(0,a.kt)(d,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"use-react-native-gesture-handler"},"Use React Native Gesture Handler"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/software-mansion/react-native-gesture-handler/"},"React Native Gesture Handler")," provides native-driven gesture management APIs for building best possible touch-based experiences in React Native. Starting from version 1.1.0, You can use it to handle gestures instead of PanResponder."),(0,a.kt)("h2",{id:"installation"},"Installation"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add react-native-gesture-handler\n")),(0,a.kt)("p",null,"After installation, wrap your entry point with ",(0,a.kt)("inlineCode",{parentName:"p"},"<GestureHandlerRootView>")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"gestureHandlerRootHOC"),"."),(0,a.kt)("p",null,"For example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"import { GestureHandlerRootView } from 'react-native-gesture-handler';\nexport default function App() {\n  return <GestureHandlerRootView style={{ flex: 1 }}>{/* content */}</GestureHandlerRootView>;\n}\n")),(0,a.kt)("p",null,"for more information, please refer to ",(0,a.kt)("a",{parentName:"p",href:"https://docs.swmansion.com/react-native-gesture-handler/docs/installation"},"React Native Gesture Handler Installation"),"."),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("p",null,"add ",(0,a.kt)("inlineCode",{parentName:"p"},"useRNGH")," prop to SkiaChart/SvgChart component."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"import { SkiaChart } from '@wuba/react-native-echarts';\n\nexport default function App() {\n  return <SkiaChart useRNGH />;\n}\n")),(0,a.kt)("p",null,"Please note that when react-native-gesture-handler is not installed or useRNGH is set to false, the component will gracefully fall back to using the built-in PanResponder."),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("p",null,"Here is an ",(0,a.kt)("a",{parentName:"p",href:"../expo-snacks/large-area-chart-use-rngh"},"example of a large area chart using react-native-gesture-handler"),"."))}p.isMDXComponent=!0}}]);