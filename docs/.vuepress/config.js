const path = require('path');

module.exports = {
  lang: 'zh-CN',
  title: 'vue3-tinymce',
  description: 'vue3-tinymce 是基于 vue@3.x + tinymce@5.8.x 封装的富文本编辑器',
  head: [['link', { rel: 'icon', href: '/images/v_tiny_logo.png' }]],

  alias: {
    '@assets': path.resolve(__dirname, '../assets')
  },

  themeConfig: {
    home: '/',
    logo: '/images/v_tiny_logo.png',
    repo: 'https://gitee.com/jsdawn/vue3-tinymce.git',
    editLink: false,
    navbar: [
      { text: '指南', link: '/' },
      { text: '使用示例', link: '/example.md' }
    ],
    lastUpdated: false,
    contributors: false,
    toggleSidebar: 'ddd'
  }
};
