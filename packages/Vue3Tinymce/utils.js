/**
 * tinymce 工具函数
 * 无状态函数、可移植
 */
export const uuid = prefix => {
  return prefix + '_' + (Date.now() + Math.floor(Math.random() * 1000000));
};

export const getTinymce = () => {
  const root = typeof window !== 'undefined' ? window : global;
  return root && 'tinymce' in root ? root.tinymce : null;
};

export function getContent(editor) {
  if (!editor) return '';
  return editor.getContent();
}

export function setContent(val, editor) {
  if (!editor) return;
  editor.setContent(val);
}

export function resetContent(val, editor) {
  if (!editor) return;
  if (!!editor.resetContent) return editor.resetContent(val);
  // 若无 reset fun，则手动 reset
  editor.setContent(val);
  editor.setDirty(false); // 恢复初始状态
  editor.undoManager.clear();
}

export function setModeDisabled(editor, disabled = true) {
  if (!editor) return;
  editor.mode.set(disabled ? 'readonly' : 'design');
}

// custom images upload handler
export function imageUploadHandler(
  setting,
  blobInfo,
  success,
  failure,
  progress
) {
  let {
    images_upload_url,
    images_upload_credentials,
    custom_images_upload_param,
    custom_images_upload_callback
  } = setting || {};

  let xhr, formData;

  xhr = new XMLHttpRequest();

  // 是否开启 withCredentials <= images_upload_credentials
  xhr.withCredentials = !!images_upload_credentials;

  xhr.open('POST', images_upload_url || '');

  xhr.upload.onprogress = function (e) {
    progress((e.loaded / e.total) * 100);
  };

  xhr.onload = function () {
    let json;

    if (xhr.status === 403) {
      failure('HTTP Error (custom): ' + xhr.status, { remove: true });
      return;
    }

    if (xhr.status < 200 || xhr.status >= 300) {
      failure('HTTP Error (custom): ' + xhr.status);
      return;
    }

    json = JSON.parse(xhr.responseText);

    if (!json) {
      failure('Invalid JSON (custom): ' + xhr.responseText);
      return;
    }

    // 处理返回图片地址 custom_images_upload_callback
    let backImgUrl =
      typeof custom_images_upload_callback === 'function'
        ? custom_images_upload_callback(json)
        : json.location;

    if (!backImgUrl) {
      failure('Failed Path (custom): location image path is error/empty');
      return;
    }

    success(backImgUrl);
  };

  xhr.onerror = function () {
    failure(
      'Image upload failed due to a XHR Transport error. Code: ' + xhr.status
    );
  };

  formData = new FormData();
  formData.append('file', blobInfo.blob(), blobInfo.filename());

  // 额外的请求参数 custom_images_upload_param
  if (custom_images_upload_param) {
    Object.keys(custom_images_upload_param).forEach(key => {
      formData.append(key, custom_images_upload_param[key]);
    });
  }

  xhr.send(formData);
}
