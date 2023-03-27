---
slug: the-official-website-has-launched
title: React Native Echarts Official Website Has Launched!
authors: [zhiqing]
tags: [website]
---

![](@site/static/img/react-native-echarts-social-card.png)

We're excited to announce that the official website for React Native Echarts has launched.!

We're constantly updating the site to provide you with the latest information about our project. On the website, you will find the complete documentation, edit demos online, and view solutions to common issues and other related information.

## New Logo & Design

![](@site/static/img/logo-with-title.svg)

We've designed a logo that reflects our project's key features: efficiency, simplicity, and technology. The logo is based on a polar coordinate bar chart and has been transformed into a modern and technological style.

Hope you like it!
<!--truncate-->
## Building a Modern Document Website for React Native Library

In addition to the website launch information, I will also describe how to build a modern documentation website. If you're interested in building a documentation website for your open-source project, this guide can be a great reference.

### Initialized with Docusaurus

![](https://docusaurus.io/img/slash-introducing.svg)

To build a modern documentation website, the first step is to use [Docusaurus](https://docusaurus.io/) to initialize your project. Docusaurus provides a framework for building documentation websites quickly and easily. You can initialize your project with the following command.

```bash
npx create-docusaurus@latest my-website classic --typescript
```

For more information, please refer to [Docusaurus Getting Started](https://docusaurus.io/docs/installation).

### Ember Expo Snack

[Expo Snack](https://snack.expo.dev/) is an open-source platform for running React Native apps in the browser. If you are building a website for a React Native library, this is an excellent feature that helps developers easily try out and test their code without having to download anything locally.

Integrating Snack in a Docusaurus project can be challenging. I refer to this [issue](https://github.com/facebook/docusaurus/issues/3966) and the source code at [react-native-website](https://github.com/facebook/react-native-website).

Integrating Snack involves the following steps.

- Write a remarkPlugins call `@react-native-website/remark-snackplayer`. This plugin will visit all `code` nodes with `node.lang == 'SnackPlayer'` when compiling markdown files, and replace the node with a SnackPlayer `div`.
- Write a client module call `snackPlayerInitializer`. This module listens for client-side events and call `initSnackPlayers`, `updateSnacksTheme` at the appropriate time.
- Modify the a configuration file `docusaurus.config.js`, add `@react-native-website/remark-snackplayer` to remarkPlugins, add `snackPlayerInitializer` to clientModules, and add `https://snack.expo.dev/embed.js` to `scripts`.
- In the `src/css/custom.css` file, define some styles for snack-player.

Now you have an online editor, like the one below.

```SnackPlayer name=Hello%20World
import { Text } from 'react-native';
export default function() {
  return (
    <Text>Hello, world!</Text>
  );
}
```

If you are interested in the implementation principles, you can take a look at our [commit](https://github.com/wuba/react-native-echarts/commit/4ff00c01066b0d7eca7f243e3ac3e07de7dbd902) as well as [Including Snacks in your documentation](https://github.com/expo/snack/blob/main/docs/embedding-snacks.md).

### Use a SnackPlayer Component

Ember Expo Snack is cool, but sometimes I want to put the code in a tsx file and then import it to the article where I need it. In this way, my code is easier to edit and reusable.

In addition to the online editor, we provide a SnackPlayer component that can be used like below.

```tsx
import SnackPlayer from '@site/src/components/SnackPlayer';
import SimpleLineChart from '!!raw-loader!@site/src/snippets/simple-line-chart/index.tsx';

<SnackPlayer name="Simple Line Chart">{SimpleLineChart}</SnackPlayer>
```

Thanks to Webpack raw-loader, you can import any code file as raw text, and then insert it in a code block. This component is also very simple to implement, accepting snack-related props and code string, and turning them into SnackPlayer `div`, refer to [this commit](https://github.com/wuba/react-native-echarts/commit/745d5c2d21bc03a42071af4e1da978ec93dbde9e).

![](./expo-snacks_simple-line-chart.png)

You can now use @wuba/react-native-echarts online, [try it out now](/docs/expo-snacks/simple-line-chart). We plan to provide more use cases in the future.

If you want to customize your own components, please refer to [Using JSX in Markdown](https://docusaurus.io/docs/markdown-features/react#using-jsx-in-markdown).

By the way, if you just want to have a live editor for react, [React Live](https://docusaurus.io/docs/markdown-features/code-blocks#interactive-code-editor) is a good choice.

### Add Doc Search

Algolia is a search engine that can be integrated into your Docusaurus project to provide fast and efficient search functionality for your documentation website. This feature helps users quickly and easily find the information they need.

It's easy to integrate Algolia with Docusaurus. You can refer to [Docusaurus Doc Search](https://docusaurus.io/docs/search) for more information.

### I18n Support

With the increase of international users, supporting multiple languages is becoming increasingly important. Docusaurus provides i18n support to help you create a website that can be easily translated into different languages.

Currently, we have only added 2 languages, Chinese and English, if you have other needs, please let us know.

For more information, please refer to [Docusaurus i18n](https://docusaurus.io/docs/i18n/introduction).

### Show Github Contributes

It's always important to give credit where credit is due. Showing the contributors of your project on your documentation website is a great way to acknowledge their hard work and dedication.

We build a [react-native-echart team](https://opencollective.com/react-native-echarts) on https://opencollective.com/ and associate the team with the GitHub repository.

You can then get the contributor images for the project by assembling the following link:
```
https://opencollective.com/react-native-echarts/contributors.svg?button=false
```

Thanks to the following contributors, if you want to join us, please feel free to submit a PR or issue.

![](https://opencollective.com/react-native-echarts/contributors.svg?button=false)

## Deploying Your Website

### Use GitHub Pages to Deploys

Deploying your website is an important step in making it accessible to the public. Docusaurus makes it easy to deploy your website using GitHub Pages. This is a fast and efficient way to get your website online quickly.

For more information, please refer to [Docusaurus Deploying to GitHub Pages](https://docusaurus.io/docs/deployment#deploying-to-github-pages).

## Increase Website Traffic

### Add Global Site Tag for Analytics

To better understand how users interact with our website, we can use Google Analytics to track various metrics such as page views, bounce rates, and user demographics.

To integrate Google Analytics with Docusaurus, you can use the `@docusaurus/plugin-google-gtag` plugin.

For more information, please refer to [Docusaurus Google Analytics](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-gtag).

### SEO Optimization

Search engine optimization (SEO) is critical for ensuring that your documentation website is easily discoverable by search engines. Docusaurus provides a variety of tools and features that can help you optimize your website for SEO.

For more information, please refer to [Docusaurus SEO](https://docusaurus.io/docs/seo).

### Add Sitemap to Google Search Console

A sitemap is a file that lists all the pages on our website and helps search engines like Google index our website more efficiently. By adding a sitemap to Google Search Console, we can help Google to discover and index all the pages on our website.

Docusaurus comes with a built-in plugin for generating a sitemap. You can get the sitemap by visiting the /sitemap.xml page on your website. Every language has its sitemap, for example:

- https://wuba.github.io/react-native-echarts/sitemap.xml
- https://wuba.github.io/react-native-echarts/zh-Hans/sitemap.xml

For more information, please refer to [Docusaurus Sitemap](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-sitemap).

Once the sitemap is generated, we can submit it to Google Search Console.

## Summary

In this article, we have shown you how to use Docusaurus to build a modern documentation website, as well as how to integrate common features such as online editing, document search, multi-language support, contributor display, and analytics. By following these steps, you can create a robust and user-friendly documentation website for your open-source project.

Also, the source code of our website is located [here](https://github.com/wuba/react-native-echarts/tree/docs).