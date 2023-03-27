---
slug: the-official-website-has-launched
title: React Native Echarts 官方网站正式上线！
authors: [zhiqing]
tags: [website]
---

![](@site/static/img/react-native-echarts-social-card.png)

我们非常高兴地宣布 React Native Echarts 的官方网站已经上线！

我们将不断更新网站，为您提供关于我们项目的最新信息。在网站上，您可以找到完整的文档、在线编辑示例、查看常见问题的解决方案以及其他相关信息。

## 全新的 Logo 与设计

![](@site/static/img/logo-with-title.svg)

我们设计了一个体现项目核心特点的 Logo：高效、简洁和科技感。Logo 基于极坐标柱状图，经过改造，呈现出现代化和科技感。

希望您喜欢！
<!--truncate-->
## 为 React Native 库构建现代化文档网站

除了网站上线信息外，我还将介绍如何构建现代化文档网站。如果您对为开源项目构建文档网站感兴趣，本指南可以作为一个很好的参考。

### 使用 Docusaurus 初始化

![](https://docusaurus.io/img/slash-introducing.svg)

要构建现代化文档网站，第一步是使用 [Docusaurus](https://docusaurus.io/zh-CN/) 初始化您的项目。Docusaurus 提供了一个快速、简便地构建文档网站的框架。您可以使用以下命令初始化您的项目：

```bash
npx create-docusaurus@latest my-website classic --typescript
```

如需更多信息，请参阅 [Docusaurus 安装流程](https://docusaurus.io/zh-CN/docs/installation)。

### 集成 Expo Snack 到网站中

[Expo Snack](https://snack.expo.dev/) 是一个在浏览器中运行 React Native 应用的开源平台。如果您正在为 React Native 库构建网站，这是一个非常好的功能，帮助开发者轻松尝试和测试代码，而无需在本地下载任何内容。

在 Docusaurus 项目中集成 Snack 可能会具有挑战性。我参考了这个[问题](https://github.com/facebook/docusaurus/issues/3966)以及 [react-native-website](https://github.com/facebook/react-native-website) 的源代码。

集成 Snack 需要以下步骤：

- 编写一个名为 `@react-native-website/remark-snackplayer` 的 remark 插件。当编译 markdown 文件时，该插件将访问所有 `node.lang == 'SnackPlayer'` 的 `code` 节点，用 SnackPlayer `div` 替换该节点。
- 编写一个名为 `snackPlayerInitializer` 的客户端模块。该模块监听客户端事件，并在适当的时间调用 `initSnackPlayers`、`updateSnacksTheme`。
- 修改配置文件 `docusaurus.config.js`，将 `@react-native-website/remark-snackplayer` 添加到 remarkPlugins，将 `snackPlayerInitializer` 添加到 clientModules，将 `https://snack.expo.dev/embed.js` 添加到 `scripts`。
- 在 `src/css/custom.css` 文件中，为 snack-player 定义一些样式。

现在您已经拥有了一个在线编辑器，就像下面的编辑器一样。

```SnackPlayer name=你好世界
import { Text } from 'react-native';
export default function() {
  return (
    <Text>你好，世界！</Text>
  );
}
```

如果您对实现原理感兴趣，可以查看我们的[提交记录](https://github.com/wuba/react-native-echarts/commit/4ff00c01066b0d7eca7f243e3ac3e07de7dbd902)，以及学习[如何在文档中集成 Snacks](https://github.com/expo/snack/blob/main/docs/embedding-snacks.md)。

### 使用 SnackPlayer 组件

集成 Expo Snack 很酷，但有时我想将代码放在 tsx 文件中，然后将其导入到我需要的文章中。这样我的代码更容易编辑，而且可重用。

除了在线编辑器之外，我们还提供了一个 SnackPlayer 组件，可以像下面这样使用。

```tsx
import SnackPlayer from '@site/src/components/SnackPlayer';
import SimpleLineChart from '!!raw-loader!@site/src/snippets/simple-line-chart/index.tsx';

<SnackPlayer name="Simple Line Chart">{SimpleLineChart}</SnackPlayer>
```

感谢 Webpack raw-loader 的支持，您可以将任何代码文件作为原始文本导入，然后将其插入到代码块中。该组件的实现也非常简单，接受与 snack 相关的 props 和代码字符串，并将它们转换为 SnackPlayer `div`，请参考[这个提交](https://github.com/wuba/react-native-echarts/commit/745d5c2d21bc03a42071af4e1da978ec93dbde9e)。

![](./expo-snacks_simple-line-chart.png)

您现在可以在线使用 @wuba/react-native-echarts 了，[点击这里立即尝试](/docs/expo-snacks/simple-line-chart)。我们计划在未来提供更多的用例。

如果您想自定义自己的组件，请参考[如何在 Markdown 中使用 JSX](https://docusaurus.io/zh-CN/docs/markdown-features/react#using-jsx-in-markdown)。

顺便说一下，如果您只想拥有一个用于 React 的实时编辑器，[React Live](https://docusaurus.io/zh-CN/docs/markdown-features/code-blocks#interactive-code-editor) 是一个不错的选择。

### 添加文档搜索

Algolia 是一款搜索引擎，可以集成到您的 Docusaurus 项目中，为您的文档网站提供快速高效的搜索功能。这个功能帮助用户快速轻松地找到所需信息。

使用 Algolia 集成到 Docusaurus 很容易。您可以参考 [Docusaurus 文档搜索](https://docusaurus.io/zh-CN/docs/search)获取更多信息。

### I18n 支持

随着国际用户的增加，支持多种语言变得越来越重要。Docusaurus 提供了 i18n 支持，以帮助您创建一个可以轻松翻译成不同语言的网站。

目前我们只添加了中文和英文两种语言，如果您有其他需求，请告诉我们。

更多信息，请参考 [Docusaurus i18n](https://docusaurus.io/zh-CN/docs/i18n/introduction)。

### 显示 Github 贡献者

在文档网站上展示项目的贡献者是一个很好的方式来认可他们的辛勤工作和奉献精神。

我们在 https://opencollective.com/ 上建立了一个 [react-native-echart 团队](https://opencollective.com/react-native-echarts)，并将团队与 Github 仓库关联起来。

您可以通过以下链接组装项目的贡献者图片：
```
https://opencollective.com/react-native-echarts/contributors.svg?button=false
```

感谢以下贡献者，如果您想加入我们，请随时提交 PR 或 issue。

![](https://opencollective.com/react-native-echarts/contributors.svg?button=false)

## 部署您的网站

### 使用 Github Pages 进行部署

将您的网站部署到公共网络是一个重要的步骤。Docusaurus 可以使用 GitHub Pages 来快速、高效地部署您的网站，让您的网站尽快上线。

有关更多信息，请参阅 [Docusaurus 部署到 GitHub Pages](https://docusaurus.io/zh-CN/docs/deployment#deploying-to-github-pages)。

## 如何增加网站流量

### 为站点添加谷歌分析

为了更好地了解用户如何与我们的网站互动，我们可以使用 Google Analytics 来跟踪各种指标，如页面浏览量、跳出率和用户人口统计信息。

为了将 Google Analytics 与 Docusaurus 集成，您可以使用 `@docusaurus/plugin-google-gtag` 插件。

有关更多信息，请参阅 [Docusaurus Google Analytics](https://docusaurus.io/zh-CN/docs/api/plugins/@docusaurus/plugin-google-gtag)。

### SEO 优化

搜索引擎优化（SEO）对于确保您的文档网站易于被搜索引擎发现非常重要。Docusaurus 提供了各种工具和功能，可以帮助您为 SEO 优化您的网站。

有关更多信息，请参阅 [Docusaurus SEO](https://docusaurus.io/zh-CN/docs/seo)。

### 向 Google Search Console 添加 Sitemap

Sitemap 是一个文件，列出了我们网站上的所有页面，并帮助像 Google 这样的搜索引擎更有效地索引我们的网站。通过向 Google Search Console 添加站点地图，我们可以帮助 Google 发现并索引我们网站上的所有页面。

Docusaurus 带有用于生成站点地图的内置插件。您可以通过访问您网站上的 /sitemap.xml 页面来获取站点地图。每种语言都有自己的站点地图，例如：

- https://wuba.github.io/react-native-echarts/sitemap.xml
- https://wuba.github.io/react-native-echarts/zh-Hans/sitemap.xml

更多信息，请参考 [Docusaurus 网站地图](https://docusaurus.io/zh-CN/docs/api/plugins/@docusaurus/plugin-sitemap)。

一旦生成了网站地图，我们就可以将其提交到 Google Search Console。

## 总结

在本文中，我们向您展示了如何使用 Docusaurus 构建现代化的文档网站，以及如何集成常见功能，例如在线编辑、文档搜索、多语言支持、贡献者展示和分析。通过遵循这些步骤，您可以为您的开源项目创建一个强大而用户友好的文档网站。

此外，我们网站的源代码位于[这里](https://github.com/wuba/react-native-echarts/tree/docs)。
