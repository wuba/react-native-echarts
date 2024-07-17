---
slug: the-official-website-has-launched
title: React Native Echarts公式ウェブサイトがローンチしました！
authors: [zhiqing]
tags: [website]
---

![](@site/static/img/react-native-echarts-social-card.png)

React Native Echartsの公式ウェブサイトがローンチされたことをお知らせします！

私たちは常に最新の情報を提供するためにサイトを更新しています。ウェブサイトでは、完全なドキュメンテーション、オンラインでのデモの編集、一般的な問題の解決策や関連情報をご覧いただけます。

## 新しいロゴとデザイン

![](@site/static/img/logo-with-title.svg)

私たちは、効率性、シンプルさ、テクノロジーというプロジェクトのキーフィーチャーを反映したロゴをデザインしました。このロゴは、極座標バーチャートを基にしており、モダンでテクノロジー感のあるスタイルに変換されています。

お気に入りいただければ幸いです！
<!--truncate-->
## React Nativeライブラリのためのモダンなドキュメントウェブサイトの構築

ウェブサイトのローンチ情報に加えて、モダンなドキュメントウェブサイトの構築方法についても説明します。オープンソースプロジェクトのドキュメントウェブサイトを構築することに興味がある場合、このガイドは大いに参考になるでしょう。

### Docusaurusで初期化

モダンなドキュメントウェブサイトを構築するための最初のステップは、[Docusaurus](https://docusaurus.io/)を使用してプロジェクトを初期化することです。Docusaurusは、ドキュメントウェブサイトを迅速かつ簡単に構築するためのフレームワークを提供しています。以下のコマンドでプロジェクトを初期化することができます。

```bash
npx create-docusaurus@latest my-website classic --typescript
```

詳細については、[Docusaurusのはじめ方](https://docusaurus.io/docs/installation)を参照してください。

### Ember Expo Snack

[Expo Snack](https://snack.expo.dev/)は、ブラウザでReact Nativeアプリを実行するためのオープンソースプラットフォームです。React Nativeライブラリのウェブサイトを構築している場合、これはローカルに何もダウンロードせずにコードを簡単に試すことができる優れた機能です。

DocusaurusプロジェクトにSnackを統合することは難しいかもしれません。私はこの[issue](https://github.com/facebook/docusaurus/issues/3966)と[react-native-website](https://github.com/facebook/react-native-website)のソースコードを参照しました。

Snackを統合するには、以下の手順が必要です。

- `@react-native-website/remark-snackplayer`というremarkPluginsを呼び出す。このプラグインは、markdownファイルをコンパイルする際に、`node.lang == 'SnackPlayer'`となるすべての`code`ノードを訪れ、ノードをSnackPlayerの`div`で置き換えます。
- `snackPlayerInitializer`というクライアントモジュールを作成する。このモジュールは、クライアント側のイベントをリッスンし、適切なタイミングで`initSnackPlayers`、`updateSnacksTheme`を呼び出します。
- `docusaurus.config.js`という設定ファイルを変更し、remarkPluginsに`@react-native-website/remark-snackplayer`を追加し、clientModulesに`snackPlayerInitializer`を追加し、`scripts`に`https://snack.expo.dev/embed.js`を追加します。
- `src/css/custom.css`ファイルで、snack-playerのためのいくつかのスタイルを定義します。

これで、以下のようなオンラインエディタを使用できます。

```SnackPlayer name=Hello%20World
import { Text } from 'react-native';
export default function() {
  return (
    <Text>Hello, world!</Text>
  );
}
```

実装原理に興味がある場合は、[このcommit](https://github.com/wuba/react-native-echarts/commit/4ff00c01066b0d7eca7f243e3ac3e07de7dbd902)と[ドキュメントへのSnacksの組み込み](https://github.com/expo/snack/blob/main/docs/embedding-snacks.md)を参照してください。

### SnackPlayerコンポーネントの使用

Ember Expo Snackは素晴らしいですが、コードをtsxファイルに入れてから必要な記事にインポートしたいことがあります。この方法では、コードを編集しやすく、再利用性が高くなります。

オンラインエディタに加えて、以下のように使用できるSnackPlayerコンポーネントも提供しています。

```tsx
import SnackPlayer from '@site/src/components/SnackPlayer';
import SimpleLineChart from '!!raw-loader!@site/src/snippets/simple-line-chart/index.tsx';

<SnackPlayer name="Simple Line Chart">{SimpleLineChart}</SnackPlayer>
```

Webpackのraw-loaderのおかげで、任意のコードファイルを生のテキストとしてインポートし、コードブロックに挿入することができます。このコンポーネントも実装が非常にシンプルで、Snack関連のプロップとコード文字列を受け入れ、それらをSnackPlayerの`div`に変換します。[このcommit](https://github.com/wuba/react-native-echarts/commit/745d5c2d21bc03a42071af4e1da978ec93dbde9e)を参照してください。

![](./expo-snacks_simple-line-chart.png)

これで、@wuba/react-native-echartsをオンラインで使用できます。[今すぐ試してみてください](/docs/expo-snacks/simple-line-chart)。将来的には、さらに多くの使用例を提供する予定です。

独自のコンポーネントをカスタマイズしたい場合は、[MarkdownでJSXを使用する](https://docusaurus.io/docs/markdown-features/react#using-jsx-in-markdown)を参照してください。

ちなみに、Reactのライブエディタが必要な場合は、[React Live](https://docusaurus.io/docs/markdown-features/code-blocks#interactive-code-editor)が良い選択肢です。

### Doc Searchの追加

Algoliaは、Docusaurusプロジェクトに統合して高速かつ効率的な検索機能を提供することができる検索エンジンです。この機能により、ユーザーは必要な情報を迅速かつ簡単に見つけることができます。

DocusaurusとAlgoliaを簡単に統合することができます。詳細については、[Docusaurus Doc Search](https://docusaurus.io/docs/search)を参照してください。

### I18nサポート

国際ユーザーの増加に伴い、複数の言語をサポートすることはますます重要になっています。Docusaurusは、異なる言語に簡単に翻訳できるウェブサイトを作成するのに役立つi18nサポートを提供しています。

現在、中国語と英語の2つの言語のみを追加していますが、他の要件がある場合はお知らせください。

詳細については、[Docusaurus i18n](https://docusaurus.io/docs/i18n/introduction)を参照してください。

### GitHubの貢献者を表示

プロジェクトの貢献者をドキュメントウェブサイトに表示することは、彼らの努力と献身を認めるために常に重要です。

私たちはhttps://opencollective.com/で[react-native-echartチーム](https://opencollective.com/react-native-echarts)を作成し、そのチームをGitHubリポジトリに関連付けました。

次のリンクを組み立てることで、プロジェクトの貢献者の画像を取得することができます。
```
https://opencollective.com/react-native-echarts/contributors.svg?button=false
```

以下の貢献者に感謝します。参加したい場合は、自由にPRやissueを提出してください。

![](https://opencollective.com/react-native-echarts/contributors.svg?button=false)

## ウェブサイトのデプロイ

### GitHub Pagesを使用してデプロイする

ウェブサイトをデプロイすることは、公開可能にするための重要なステップです。Docusaurusを使用すると、GitHub Pagesを使用してウェブサイトを簡単にデプロイすることができます。これは、ウェブサイトを素早くオンラインにするための迅速かつ効率的な方法です。

詳細については、[Docusaurus GitHub Pagesへのデプロイ](https://docusaurus.io/docs/deployment#deploying-to-github-pages)を参照してください。

## ウェブサイトのトラフィックを増やす

### アナリティクスのためのグローバルサイトタグの追加

ユーザーがウェブサイトとのやり取りをどのように行っているかをよりよく理解するために、Google Analyticsを使用してページビュー、直帰率、ユーザーの属性など、さまざまなメトリクスを追跡することができます。

DocusaurusとGoogle Analyticsを統合するには、`@docusaurus/plugin-google-gtag`プラグインを使用できます。

詳細については、[Docusaurus Google Analytics](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-gtag)を参照してください。

### SEO最適化

検索エンジン最適化（SEO）は、ドキュメントウェブサイトが検索エンジンによって簡単に発見できるようにするために重要です。Docusaurusは、SEOのためにウェブサイトを最適化するためのさまざまなツールと機能を提供しています。

詳細については、[Docusaurus SEO](https://docusaurus.io/docs/seo)を参照してください。

### Google Search Consoleにサイトマップを追加

サイトマップは、ウェブサイトのすべてのページをリストアップし、Googleのような検索エンジンが効率的にウェブサイトをインデックスできるようにするファイルです。Google Search Consoleにサイトマップを追加することで、Googleがウェブサイトのすべてのページを発見し、インデックスするのに役立ちます。

Docusaurusには、サイトマップを生成するための組み込みプラグインが付属しています。ウェブサイトの/sitemap.xmlページを訪れることで、サイトマップを取得することができます。各言語には独自のサイトマップがあります。例えば：

- https://wuba.github.io/react-native-echarts/sitemap.xml
- https://wuba.github.io/react-native-echarts/zh-Hans/sitemap.xml

詳細については、[Docusaurus Sitemap](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-sitemap)を参照してください。

サイトマップが生成されたら、それをGoogle Search Consoleに送信することができます。

## まとめ

この記事では、Docusaurusを使用してモダンなドキュメントウェブサイトを構築する方法、オンライン編集、ドキュメント検索、多言語サポート、貢献者の表示、アナリティクスなどの一般的な機能の統合方法について説明しました。これらの手順に従うことで、オープンソースプロジェクトの堅牢で使いやすいドキュメントウェブサイトを作成することができます。

また、ウェブサイトのソースコードは[こちら](https://github.com/wuba/react-native-echarts/tree/docs)にあります。
