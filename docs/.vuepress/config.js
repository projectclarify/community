// .vuepress/config.js

const sidebar = [
  {
    title: 'Community',
    collapsable: true,
    children: [
      '/community/',
      '/community/we_the_developers',
      '/community/founding_members',
      '/community/code_of_conduct',
      '/community/how_we_work'
    ]
  },
  {
    title: 'Projects',
    collapsable: true,
    children: [
      '/projects/',
      {
        title: 'Current',
        collapsable: true,
        children: [
          '/projects/current/',
          '/projects/current/subproject_template/'
        ]
      },
      {
        title: 'Proposals',
        collapsable: true,
        children: [
          '/projects/proposals/',
          '/projects/proposals/proposal_template'
        ]
      },
      {
        title: 'Archive',
        collapsable: true,
        children: [
          '/projects/archive/'
        ]
      }
    ],
  },
  {
    title: 'Contributor Guide',
    collapsable: true,
    children: [
      '/developer/',
      '/developer/dev-oss/',
      '/developer/dev-fx/',
      '/developer/dev-ml/',
      '/developer/dev-ftw/',
      '/developer/dev-docs/'
    ],
  },
];

module.exports = {
  title: '',
  description: 'An open community devoted to using ML to benefit people.',
  themeConfig: {
    logo: '/logo.png',
    displayAllHeaders: false,
    sidebarDepth: 2,
    sidebar: {
      '/community/': sidebar,
      '/community/we_the_developers': sidebar,
      '/community/founding_members': sidebar,
      '/community/code_of_conduct': sidebar,
      '/community/how_we_work': sidebar,
      '/projects/': sidebar,
      '/projects/current/': sidebar,
      '/projects/current/subproject_template/': sidebar,
      '/projects/proposals/': sidebar,
      '/projects/proposals/proposal_template': sidebar,
      '/projects/archive/': sidebar,
      '/community/': sidebar,
      '/community/code_of_conduct': sidebar,
      '/developer/': sidebar,
      '/developer/dev-oss/': sidebar,
      '/developer/dev-fx/': sidebar,
      '/developer/dev-ml/': sidebar,
      '/developer/dev-ftw/': sidebar,
      '/developer/dev-docs/': sidebar,
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/project-overview/' },
    ],
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit Page',
    lastUpdated: 'Last Updated',
  },
  dest: '_site',
};
