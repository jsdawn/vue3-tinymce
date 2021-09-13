<template>
  <vue3-tinymce
    v-model="state.content"
    :setting="state.setting"
    :setup="setup"
    :disabled="state.disabled"
    debug
  />

  <button @click="state.disabled = !state.disabled">disabled2</button>
</template>

<script setup>
import { reactive } from 'vue';
import Vue3Tinymce from '../../packages/Vue3Tinymce';

const state = reactive({
  content: '你好',
  disabled: false,
  setting: {
    menubar: false,
    height: 350,
    toolbar:
      'undo redo | removeformat | bold italic underline h1 h2 h3 | numlist bullist alignleft aligncenter alignright | image link unlink table | fontsizeselect forecolor backcolor | fullscreen',
    plugins: 'link image table lists fullscreen',
    toolbar_mode: 'sliding',
    fontsize_formats: '12px 14px 16px 18px',
    default_link_target: '_blank',
    link_title: false,
    nonbreaking_force_tab: true,
    language: 'zh_CN',
    language_url: '/tinymce/langs/zh_CN.js',
    content_style: 'body{font-size: 14px}'
    // images_upload_url: ''
    // automatic_uploads: true,
    // custom_images_upload: true,
    // custom_images_upload_callback: res => res.url,
    // custom_images_upload_param: { id: 'xxxx01', age: 18 }
  }
});

const setup = editor => {
  // console.log(editor);
};
</script>

<style>
#app {
}

.tox {
  font-size: 14px !important;
}
</style>
