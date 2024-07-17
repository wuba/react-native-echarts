// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'React Native ECharts',
  tagline: 'An Open Source Visualization Library for React Native',
  favicon: 'img/favicon.ico',
  scripts: [
    { src: 'https://snack.expo.dev/embed.js', defer: true },
  ],

  // Set the production url of your site here
  url: 'https://wuba.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/react-native-echarts/',

  clientModules: [
    require.resolve('./snackPlayerInitializer.js'),
  ],
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'wuba', // Usually your GitHub org/user name.
  projectName: 'react-native-echarts', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans', 'zh-hant', 'ja'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/wuba/react-native-echarts/tree/docs/',
          remarkPlugins: [require('@react-native-website/remark-snackplayer')],
          editLocalizedFiles: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/wuba/react-native-echarts/tree/docs/',
          remarkPlugins: [require('@react-native-website/remark-snackplayer')],
          editLocalizedFiles: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-CT481QFWQF',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/react-native-echarts-social-card.png',
      navbar: {
        title: 'React Native ECharts',
        logo: {
          alt: 'react-native-echarts Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Tutorial',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/wuba/react-native-echarts',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Jue jin',
                href: 'https://juejin.cn/user/4495228528238279',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/RN_ECharts',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/wuba/react-native-echarts',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 58.Com, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        appId: 'Q787ESQO0U',
        apiKey: '2c04f87603852e296751cc01d11574ca',
        indexName: 'react-native-echarts',
      },
      metadata: [{
        name: 'keywords', content: 'React Native, echarts, chart, ios, android, web, Skia, SVG'
      }],
    }),
};

module.exports = config;
