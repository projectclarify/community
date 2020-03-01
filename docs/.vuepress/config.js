// .vuepress/config.js

const sidebar = [
  {
    title: 'Community',
    collapsable: true,
    children: [
      '/community/how_we_work',
      '/community/code_of_conduct',
      '/community/we_the_developers',
      '/community/founding_members'
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
          '/projects/proposals/user_studies_ftw',
          '/projects/proposals/um_eeg_ssl',
          '/projects/proposals/image_fec'
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
      {
        title: 'Machine Learning',
	collapsable: false,
	children: [
	  '/developer/dev-ml/',
          '/developer/dev-ml/codelabs'
	]
      },
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
      '/community/how_we_work': sidebar,
      '/community/code_of_conduct': sidebar,
      '/community/we_the_developers': sidebar,
      '/community/founding_members': sidebar,
      '/projects/': sidebar,
      '/projects/current/subproject_template/': sidebar,
      '/projects/proposals/proposal_template': sidebar,
      '/projects/proposals/user_studies_ftw': sidebar,
      '/projects/proposals/um_eeg_ssl': sidebar,
      '/projects/proposals/image_fec': sidebar,
      '/projects/archive/': sidebar,
      '/community/': sidebar,
      '/community/code_of_conduct': sidebar,
      '/developer/': sidebar,
      '/developer/dev-oss/': sidebar,
      '/developer/dev-fx/': sidebar,
      '/developer/dev-ml/': sidebar,
      '/developer/dev-ml/codelabs': sidebar,
      '/developer/dev-ftw/': sidebar,
      '/developer/dev-docs/': sidebar,
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/community/how_we_work/' },
    ],
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit Page',
    lastUpdated: 'Last Updated',
  },
  dest: '_site',
};
