<template>
  <section class="section">
    <h3>默认设置</h3>
    <vue3-tinymce v-model="stateDefault.content" />
  </section>

  <section class="section">
    <h3>经典设置</h3>

    <vue3-tinymce
      v-model="stateClassic.content"
      :setting="stateClassic.setting"
    />
  </section>

  <section class="section">
    <h3>类似掘金设置</h3>
    <vue3-tinymce
      v-model="stateJuejin.content"
      :setting="stateJuejin.setting"
    />
  </section>
</template>

<script setup>
import { reactive } from 'vue';
import Vue3Tinymce from '../../packages/Vue3Tinymce';

const stateDefault = reactive({
  content: 'tinymce 默认的编辑器设置，不需要传参额外的setting ...',
});

const stateClassic = reactive({
  content: '列举了大部分正文用到的功能按钮 ...',
  disabled: false,
  setting: {
    menubar: true,
    toolbar:
      'undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |',
    toolbar_mode: 'sliding',
    quickbars_selection_toolbar:
      'removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor',
    plugins: 'link image media table lists fullscreen quickbars',
    fontsize_formats: '12px 14px 16px 18px',
    default_link_target: '_blank',
    link_title: false,
    nonbreaking_force_tab: true,
    // 设置中文语言
    language: 'zh-Hans',
    language_url: '/tinymce/langs/zh-Hans.js',
    content_style: 'body{font-size: 14px}',
  },
});

const stateJuejin = reactive({
  content: `<p>掘金的富文本编辑器比较简洁 ...</p> <p>开启自定义图片上传模式，点击工具栏插入图片按钮，弹框中会增加 Upload 功能选项</p>`,
  setting: {
    menubar: false,
    toolbar:
      'bold italic underline h1 h2 blockquote codesample numlist bullist link image | removeformat fullscreen',
    plugins: 'codesample link image table lists fullscreen',
    toolbar_mode: 'sliding',
    nonbreaking_force_tab: true,
    link_title: false,
    default_link_target: '_blank',
    // 自定义 图片上传模式
    custom_images_upload: true,
    images_upload_url:
      'https://api.diggmind.com/api/admin/v1next/bizcp/main/upload',
    custom_images_upload_callback: (res) => res.url,
    custom_images_upload_header: { 'X-Token': 'xxxx' },
    custom_images_upload_param: { id: 'xxxx01', age: 18 },
    // 设置中文语言
    language: 'zh-Hans',
    language_url: '/tinymce/langs/zh-Hans.js',
  },
});
</script>

<style lang="scss" scoped>
.section {
  margin-bottom: 30px;
  font-weight: 16px;
  & > h3 {
    margin-bottom: 10px;
  }
}
</style>
