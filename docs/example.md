# 使用示例

## 使用中文

`language` - 语言 code， `language_url` - 语言包路径。

vue 脚手架项目可前往官网 [下载语言包](https://www.tiny.cloud/get-tiny/language-packages/) 放在 `pulish/tinymce/langs` 中，也可使用该组件语言包 cdn `https://unpkg.com/@jsdawn/vue3-tinymce@1.0.2/dist/tinymce/langs/zh_CN.js`

```js
const setting = {
    // 以中文简体为例
    language: 'zh_CN',
    language_url: '/tinymce/langs/zh_CN.js',
    ...
}
```

## 经典设置

经典设置，包含了大部分可能用到的富文本编辑器功能和插件。

```js
const classic_setting = {
  height: 190,
  toolbar:
    'undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |',
  toolbar_drawer: 'sliding',
  quickbars_selection_toolbar:
    'removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor',
  plugins: 'link image media table lists fullscreen quickbars',
  fontsize_formats: '12px 14px 16px 18px',
  default_link_target: '_blank',
  link_title: false,
  nonbreaking_force_tab: true
};
```

<iframe height="300" style="width: 100%;" scrolling="no" title="" src="https://codepen.io/jsdawn/embed/BaZmXYO?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/jsdawn/pen/BaZmXYO">
  </a> by 青山依旧 (<a href="https://codepen.io/jsdawn">@jsdawn</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 类似掘金设置

类似掘金设置服务 简洁的图文写作，仅包含较常用的文字格式，图片上传，与链接功能。

```js
const juejin_setting = {
  menubar: false,
  height: 190,
  toolbar:
    'bold italic underline h1 h2 blockquote codesample numlist bullist link image | removeformat fullscreen',
  plugins: 'codesample link image table lists fullscreen',
  toolbar_mode: 'sliding',
  nonbreaking_force_tab: true,
  link_title: false,
  default_link_target: '_blank',
  content_style: 'body{font-size: 16px}',
  // 自定义 图片上传模式
  custom_images_upload: true,
  images_upload_url: 'your_upload_api_url...',
  custom_images_upload_callback: res => res.url,
  custom_images_upload_param: { id: 'xxxx01', age: 18 }
};
```

<iframe height="300" style="width: 100%;" scrolling="no" title="vue3-tinymce-classic" src="https://codepen.io/jsdawn/embed/gORoYRy?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/jsdawn/pen/gORoYRy">
  vue3-tinymce-classic</a> by 青山依旧 (<a href="https://codepen.io/jsdawn">@jsdawn</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
