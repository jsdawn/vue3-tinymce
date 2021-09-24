const path = require('path');

const basePath = '/vue3-tinymce/';

module.exports = {
  lang: 'zh-CN',
  title: 'vue3-tinymce',
  description: 'vue3-tinymce 是基于 vue@3.x + tinymce@5.8.x 封装的富文本编辑器',
  head: [
    ['link', { rel: 'icon', href: '/images/v_tiny_logo.png' }],
    [
      'meta',
      {
        name: 'keywords',
        content: 'vue3-tinymce,tinymce,editor,富文本,富文本编辑器,青山依旧'
      }
    ]
  ],

  base: basePath,
  dest: path.resolve(__dirname, './gitee-pages'),

  themeConfig: {
    logo: '/images/v_tiny_logo.png',
    repo: 'https://gitee.com/jsdawn/vue3-tinymce.git',
    editLink: false,
    navbar: [
      { text: '指南', link: '/' },
      { text: '使用示例', link: '/example' },
      { text: '青山依旧', link: 'http://www.qscoding.com/' }
    ],
    lastUpdated: false,
    contributors: false
  }
};
