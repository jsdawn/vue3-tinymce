# 使用指南

vue3-tinymce 是基于 `vue@3.x` + `tinymce@5.8.x` 封装的富文本编辑器。

[![npm](https://img.shields.io/npm/dt/@jsdawn/vue3-tinymce?label=vue3-tinymce&logo=npm)](https://www.npmjs.com/package/@jsdawn/vue3-tinymce)
[![tinymce](https://img.shields.io/badge/tinymce-%5E5.8.2-blue)](https://www.tiny.cloud/docs/)

## 为什么

在开发管理台项目的时候有富文本编辑的功能需求，封装为组件方便使用。

个人开发一套完美的富文本编辑器难度大且耗时，在挑选插件中发现 tinymce editor 背景和功能都非常强大，并且文档清晰。基于 tinymce 封装组件是一个非常好的选择。

该组件清晰易懂，可自行修改为 vue2 版本使用。期待你的 Star <Badge type="tip" text="+1" vertical="top" /> ，发现问题可以提到 issues 👏

## 组件特色

### 开箱即用

组件内置按需加载 `tinymce@5.8.2` 版本 cdn 资源，无需另外引入。使用 `v-if` 在必要时渲染组件。

属性 `script-src` 可自定义 tinymce 静态资源。支持绝对路径和网络地址。

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
  // 上传 api 额外的参数。图片默认 file
  custom_images_upload_param: { id: 'xxxx01', age: 18 }
}
```

## 快速上手

### 获取组件

前往 [Vue3Tinymce 仓库](https://gitee.com/jsdawn/vue3-tinymce.git) 获取 `packages/Vue3Tinymce` 组件文件，Copy 到自己项目中使用。setting 选项配置参照 [tinymce 官方文档](https://www.tiny.cloud/docs/)

这里也提供 NPM 引入：`npm install @jsdawn/vue3-tinymce`，然后在 vue 中引入

```js
import Vue3Tinymce from '@jsdawn/vue3-tinymce';
```

### 在 vue 中使用

```vue
<template>
  <vue3-tinymce v-model="state.content" :setting="state.setting" />
</template>

<script setup>
import { reactive } from 'vue';
// 引入组件
import Vue3Tinymce from 'your-path/Vue3Tinymce';

const state = reactive({
  content: 'hello vue3-tinymce!',
  // editor 配置项
  setting: {
    height: 400 // editor 高度
  }
});
</script>
```

## 组件属性

| 名称         | 类型       | 描述                                                                                          |
| ------------ | ---------- | --------------------------------------------------------------------------------------------- |
| `modelValue` | `String`   | 绑定值/内容，建议以 `v-model` 的形式使用                                                      |
| `setting`    | `Object`   | 设置项，延用官方 [tinymce 设置](https://www.tiny.cloud/docs/configure/integration-and-setup/) |
| `setup`      | `Function` | 编辑器设置时的回调，回调参数 editor 实例，在此将编辑器事件添加到 TinyMCE 中                   |
| `script-src` | `Function` | 自定义 `tinymce` 静态资源，支持绝对路径和网络地址。内置按需加载 `tinymce@5.8.2`               |
| `@change`    | `Function` | 编辑器监听到 `change input undo redo` 时触发，回调参数为编辑器 content                        |
| `@init`      | `Function` | 编辑器初始化完成后触发，回调参数 `editor` 实例                                                |

## 使用示例

点击前往 [使用示例](http://tinymce.qscoding.com/)
