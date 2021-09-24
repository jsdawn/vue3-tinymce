const path = require('path');
const { createConfig } = require('./createConfig');

const basePath = '/vue3-tinymce/';

module.exports = createConfig(basePath, {
  dest: path.resolve(__dirname, './gitee-pages')
});
