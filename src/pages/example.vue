<template>
  <section class="section">
    <h3>默认配置</h3>
    <vue3-tinymce v-model="stateDefault.content" />
  </section>

  <section class="section">
    <h3>类似掘金配置</h3>
    <vue3-tinymce
      v-model="stateJuejin.content"
      :setting="stateJuejin.setting"
    />
  </section>

  <section class="section">
    <h3>经典配置</h3>
    <vue3-tinymce
      v-model="stateClassic.content"
      :setting="stateClassic.setting"
    />
  </section>
</template>

<script setup>
import { reactive } from 'vue';
import Vue3Tinymce from '../../packages/Vue3Tinymce';

const stateDefault = reactive({
  content: 'default content ...'
});

const stateJuejin = reactive({
  content: '输入文章正文 ...',
  setting: {
    menubar: false,
    toolbar:
      'bold italic underline h1 h2 blockquote codesample codeformat numlist bullist link image | removeformat fullscreen',
    plugins: 'codesample link image table lists fullscreen codeformat',
    toolbar_mode: 'sliding',
    nonbreaking_force_tab: true,
    link_title: false,
    default_link_target: '_blank'
  }
});

const stateClassic = reactive({
  content: '比较详情的 toolbar...',
  disabled: false,
  setting: {
    menubar: true,
    height: 300,
    toolbar: [
      'bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript uploadimg',
      'hr bullist numlist link image charmap preview media table forecolor backcolor fullscreen'
    ],
    plugins:
      'advlist anchor autolink autosave code codesample directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace tabfocus table template textpattern visualblocks visualchars wordcount',

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

<style lang="scss" scoped>
.section {
  margin-bottom: 30px;
  font-weight: 16px;
  & > h3 {
    margin-bottom: 10px;
  }
}
</style>
