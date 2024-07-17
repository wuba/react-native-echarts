---
sidebar_position: 5
---

# 故障排除

<!-- - ### skia/svg 版本与 expo 内置版本对应 -->

- ### ERROR Invariant Violation: requireNativeComponent: "SkiaDomView" was not found in the UIManager.

  如果使用 expo，您需要安裝與 expo 內建版本對應的 skia/svg 版本，否則將發生上述錯誤。 如果您不確定應該安裝哪個版本，您可以參考 expo 啟動時推薦的版本，例如

  !["SkiaDomView" was not found](./require-native-component.png)

<!-- 组件未注册 -->

- ### ERROR [ECharts] Component XXX is used but not imported.

  上述錯誤表明 XXX 元件已在圖表中使用，但尚未註冊。 圖表中使用的元件需要以以下方式手動註冊。

  ```js
  import { XXX } from 'echarts/components';
  echarts.use([XXX]);
  ```

<!-- ### 初始化时没有series -->

- ### ERROR [ECharts] Unknown series undefined
  在圖表還原(restore)時出現上述錯誤，很可能是在圖表對像初始化時，option 傳入的是空的對象，或傳入的對像中沒有series 字段，比如這樣的寫法`chartInstance.setOption({} )`。初始化時，option 應盡量傳入series 設定。

<!-- 单独安装时的引入方式 -->

- ### Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined.

  如果只安裝了Svg 或Skia 依賴，但是卻透過`import { SVGRenderer, XXXChart } from '@wuba/react-native-echarts'` 的寫法引入，會出現上述錯誤；

  單獨導入參考[這裡](../advanced-guides/import-individually)
