const lightCodeTheme = require('prism-react-renderer/themes/palenight');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

const rehypeLoader = require('./src/util/rehypePlugins')

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Web3.Storage Documentation',
  tagline: 'Better storage. Better transfers. Better internet.',
  url: 'https://docs.web3.storage',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico', // TODO: replace with web3.storage favicon
  organizationName: 'web3-storage',
  projectName: 'web3.storage',
  themeConfig: {
    colorMode: {
      // respectPrefersColorScheme: true,
      // disableSwitch: true,
    },
    navbar: {
      title: 'Web3.Storage',
      logo: {
        alt: 'Web3.Storage Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
        href: 'https://web3.storage',
      },
      items: [
        {
          label: 'Docs',
          type: 'doc',
          docId: 'intro',
          position: 'right',
        },
        {
          label: 'About',
          position: 'right',
          href: 'https://web3.storage/about',
        },
        {
          type: 'search',
          position: 'right',
        }
      ],
    },

    footer: {
      style: 'light',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: false,
          // Please change this to your repo.
          editUrl: 'https://github.com/web3-storage/web3.storage/edit/main/packages/docs/',
          routeBasePath: '/',
          remarkPlugins: [
            require('remark-docusaurus-tabs'),
          ],
          rehypePlugins: [
            rehypeLoader
          ]
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
    
    ['redocusaurus', {
      specs: [{
        spec: 'static/schema.yml',
        routePath: '/http-api/',
      }],

      theme: {
        primaryColor: '#171691',
      }
    }],
  ],
};
