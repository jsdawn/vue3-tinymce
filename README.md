# vue3-tinymce

tinymce editor Components built on Vue3 and Vite

## start editor

环境：基于 tinymce 5.x 的封装，在 vue3.x 环境中运行。

使用：可直接获取 packages/Vue3Tinymce 组件使用。setting 选项配置参照 [tinymce 官方文档](https://www.tiny.cloud/docs/)

拓展：setting 选项

```javascript
{
    // 开启组件自定义 图片上传模式
    custom_images_upload: true,
    // 上传的 api 地址
    images_upload_url: '',
    // 额外的参数 （图片以 file 字段上传）
    custom_images_upload_param: { id: 'xxxx01', age: 18 },
    // 响应处理函数，接受 response，需返回图片地址 (默认 response.location)
    custom_images_upload_callback: response => response.image_url,
}
```
