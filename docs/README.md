# 使用指南

vue3-tinymce 是基于 `vue@3.x` + `tinymce@5.8.x` 封装的富文本编辑器。

[![vue3-tinymce](@assets/images/svg_vue3_tinymce.svg)](https://gitee.com/jsdawn/vue3-tinymce.git)
[![tinymce](@assets/images/svg_tinymce.svg)](https://www.tiny.cloud/docs/)

## 为什么

在开发管理台项目的时候有富文本编辑的功能需求，封装为组件方便使用。

个人开发一套完美的富文本编辑器难度大且耗时，在挑选插件中发现 tinymce editor 背景和功能都非常强大，并且文档清晰。基于 tinymce 封装组件是一个非常好的选择。

期待你的 Star <Badge type="tip" text="+1" vertical="top" /> ，发现问题可以提到 issues 👏

## 快速上手

### 获取组件

前往组件 [Vue3Tinymce 仓库](https://gitee.com/jsdawn/vue3-tinymce.git) 获取 `packages/Vue3Tinymce` 组件文件，Copy 到自己项目中使用。setting 选项配置参照 [tinymce 官方文档](https://www.tiny.cloud/docs/)

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
    height: 400
  }
});
</script>
```

## 组件属性

| 名称         | 类型       | 描述                                                                                      |
| ------------ | ---------- | ----------------------------------------------------------------------------------------- |
| `modelValue` | `String`   | 绑定值/内容，建议以 `v-model` 的形式使用                                                  |
| `:setting`   | `Object`   | 配置项，参照 [tinymce 配置](https://www.tiny.cloud/docs/configure/integration-and-setup/) |
| `:setup`     | `Function` | 编辑器设置时的回调，常见用例是将编辑器事件添加到 TinyMCE 中                               |
| `@change`    | `Function` | tinymce 编辑器触发事件 `change input undo redo` 时触发，回调参数为编辑器当前文本          |

## 使用示例

