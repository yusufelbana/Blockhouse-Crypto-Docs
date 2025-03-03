
import { Config } from '@docusaurus/types';

const config: Config = {
  title: 'Crypto Price Tracker',
  url: 'https://localhost:3000',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Yusuf Elbana',
  projectName: 'Crypto Price Tracker',
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', // This makes the docs the homepage
        },
        blog: false, // Disable the blog if unnecessary
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'Crypto Price Tracker Docs',
      items: [], // Remove sidebar links if unnecessary
    },
  },

};

export default config;
