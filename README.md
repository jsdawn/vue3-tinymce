# 使用指南

`vue3-tinymce` 是基于 `vue@3.x` + `tinymce@6.1.2` 封装的富文本编辑器。

[![visitors](https://visitor-badge.laobi.icu/badge?page_id=jsdawn.vue3-tinymce)](https://github.com/jsdawn/vue3-tinymce)

[![npm](https://img.shields.io/npm/dt/@jsdawn/vue3-tinymce?label=vue3-tinymce&logo=npm)](https://www.npmjs.com/package/@jsdawn/vue3-tinymce)

[![tinymce](https://img.shields.io/badge/tinymce-%5E6.1.2-blue)](https://www.tiny.cloud/docs/tinymce/6/)

**详细文档地址：[vue3-tinymce 富文本编辑器](https://note.qscoding.com/guide/vue3-tinymce.html)**

vue2版本demo地址：[tinymce-vue2-demo](https://github.com/jsdawn/tinymce-vue2-demo.git)

## 为什么

在开发管理台项目的时候有富文本编辑的功能需求，封装为组件方便使用。

个人开发一套完美的富文本编辑器难度大且耗时，在挑选插件中发现 tinymce editor 背景和功能都非常强大，并且文档清晰。基于 `tinymce` 封装组件是一个非常好的选择。

该组件清晰易懂，可自行修改为 vue2 版本使用。期待你的 Star ，发现问题可以提到 issues 👏

## 组件特色

### 开箱即用

组件内置按需加载 `tinymce@6.1.2` 版本 cdn 资源。使用 `v-if` 在必要时渲染组件。

组件包含 `tinymce@6.1.2`, 属性 `script-src` 可自定义 tinymce 静态资源路径。支持绝对路径和网络地址。

稳定使用：建议将 tinymce 资源包放到项目根目录，使用绝对路径。

### 拓展图片上传

本组件拓展了 `插入图片` 的图片上传部分，重写 `setting.images_upload_handler`，上传成功回填编辑器插入图片数据，关联 toolbar 和 plugins 中的 `image`。

```js
{
  // 开启组件拓展的 上传图片功能，工具栏 图片按钮 弹框中出现 `upload` 选项
  custom_images_upload: true,
  // 复用 图片上传 api 地址
  images_upload_url: 'your_upload_api_url...',
  // 上传成功回调函数，return 图片地址。默认 response.location
  custom_images_upload_callback: response => response.url,
  // 上传 api 请求头
  custom_images_upload_header: { 'X-Token': 'xxxx' }
  // 上传 api 额外的参数。图片默认 file
  custom_images_upload_param: { id: 'xxxx01', age: 18 }
}
```

## 快速上手

### NPM 使用

下载组件

```sh
npm install @jsdawn/vue3-tinymce
```

在 vue3 中使用

```vue
<template>
  <vue3-tinymce v-model="state.content" :setting="state.setting" />
</template>

<script setup>
import { reactive } from 'vue';
// 引入组件
import Vue3Tinymce from '@jsdawn/vue3-tinymce';

const state = reactive({
  content: 'hello vue3-tinymce!',
  // editor 配置项
  setting: {
    height: 400, // editor 高度
  },
});
</script>
```

稳定使用静态资源包（推荐）：

在 `node_modules` 目录中找到 `@jsdawn/vue3-tinymce`，将 `@jsdawn/vue3-tinymce/dist/tinymce` 目录复制到项目根目录的 `public/tinymce`，
然后传入 组件的 `script-src`:

```vue
<template>
  <vue3-tinymce
    v-model="state.content"
    :setting="state.setting"
    script-src="/tinymce/tinymce.min.js"
  />
</template>
```

### 自定义组件使用

前往 [Vue3Tinymce 仓库](https://github.com/jsdawn/vue3-tinymce) 获取 `packages/Vue3Tinymce` 组件文件，Copy 到自己项目中使用。setting 选项配置参照 [tinymce 官方文档](https://www.tiny.cloud/docs/tinymce/6/)

## 组件属性

| 名称         | 类型       | 描述                                                                                             |
| ------------ | ---------- | ------------------------------------------------------------------------------------------------ |
| `modelValue` | `String`   | 绑定值/内容，建议以 `v-model` 的形式使用                                                         |
| `script-src` | `String`   | 自定义 `tinymce` 静态资源，支持绝对路径和网络地址。内置按需加载 `tinymce@6.1.2`                  |
| `setting`    | `Object`   | 设置项，延用官方 [tinymce 设置](https://www.tiny.cloud/docs/tinymce/6/editor-important-options/) |
| `setup`      | `Function` | 编辑器设置时的回调，回调参数 editor 实例，在此将编辑器事件添加到 TinyMCE 中                      |
| `disabled`   | `Boolean`  | 是否禁用编辑器输入操作                                                                           |
| `@change`    | `Function` | 编辑器监听到 `change input undo redo` 时触发，回调参数为编辑器 content                           |
| `@init`      | `Function` | 编辑器初始化完成后触发，回调参数 `editor` 实例                                                   |

## 使用示例

点击前往 [使用示例](https://note.qscoding.com/guide/vue3-tinymce.html)

## 更新日志

### v1.1.7

_`2020-01-19`_

_Feature_

- 拓展图片上传：自定义图片上传请求头 `setting.custom_images_upload_header`

### v2.0.2

_`2022-09-23`_

_Feature_

- 升级 `tinymce` 版本，从 v5.8.x 版本升级到 `v6.1.2`。新增 `tinymce@6.1.2` 静态资源包，位置在 `dist/tinymce` 目录
