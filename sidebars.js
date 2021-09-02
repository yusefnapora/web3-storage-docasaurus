module.exports = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'How-tos',
      items: [
        'how-tos/store',
        'how-tos/retrieve',
        'how-tos/list',
        'how-tos/query',
        'how-tos/work-with-car-files',
        'how-tos/troubleshooting',
      ]
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        'concepts/content-addressing',
        'concepts/decentralized-storage',
      ]
    },
    {
      type: 'category',
      label: 'Examples',
      items: [
        'examples/getting-started',
        'examples/image-gallery',
      ]
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        {
          type: 'link',
          label: 'HTTP API',
          href: 'https://docs.web3.storage/http-api.html'
        },
        'reference/client-library',
        'reference/js-utilities'
      ]
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        'community/help-and-support'
      ]
    }
  ],

};
