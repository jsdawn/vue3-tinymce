import { reactive, watch, onMounted, onActivated, onDeactivated, onBeforeUnmount, openBlock, createElementBlock, Fragment, createElementVNode, toDisplayString, createCommentVNode } from "vue";
const uuid = (prefix) => {
  return prefix + "_" + (Date.now() + Math.floor(Math.random() * 1e6));
};
const getTinymce = () => {
  const root = typeof window !== "undefined" ? window : global;
  return root && "tinymce" in root ? root.tinymce : null;
};
function getContent(editor) {
  if (!editor)
    return "";
  return editor.getContent();
}
function setContent(val, editor) {
  if (!editor)
    return;
  editor.setContent(val);
}
function resetContent(val, editor) {
  if (!editor)
    return;
  if (!!editor.resetContent)
    return editor.resetContent(val);
  editor.setContent(val);
  editor.setDirty(false);
  editor.undoManager.clear();
}
function setModeDisabled(editor, disabled = true) {
  if (!editor)
    return;
  editor.mode.set(disabled ? "readonly" : "design");
}
function imageUploadHandler(setting, blobInfo, progress) {
  return new Promise((resolve, reject) => {
    let {
      images_upload_url,
      images_upload_credentials,
      custom_images_upload_header,
      custom_images_upload_param,
      custom_images_upload_callback
    } = setting || {};
    let xhr, formData;
    xhr = new XMLHttpRequest();
    xhr.withCredentials = !!images_upload_credentials;
    xhr.open("POST", images_upload_url || "");
    if (custom_images_upload_header) {
      Object.keys(custom_images_upload_header).forEach((key) => {
        xhr.setRequestHeader(key, custom_images_upload_header[key]);
      });
    }
    xhr.upload.onprogress = function(e) {
      progress(e.loaded / e.total * 100);
    };
    xhr.onload = function() {
      if (xhr.status === 403) {
        reject({ message: "HTTP Error: " + xhr.status, remove: true });
        return;
      }
      if (xhr.status < 200 || xhr.status >= 300) {
        reject("HTTP Error: " + xhr.status);
        return;
      }
      let json = JSON.parse(xhr.responseText);
      if (!json) {
        reject("Invalid JSON: " + xhr.responseText);
        return;
      }
      let backImgUrl = typeof custom_images_upload_callback === "function" ? custom_images_upload_callback(json) : json.location;
      if (!backImgUrl) {
        reject("Failed Path: location image path is error/empty");
        return;
      }
      resolve(backImgUrl);
    };
    xhr.onerror = function() {
      reject(
        "Image upload failed due to a XHR Transport error. Code: " + xhr.status
      );
    };
    formData = new FormData();
    formData.append("file", blobInfo.blob(), blobInfo.filename());
    if (custom_images_upload_param) {
      Object.keys(custom_images_upload_param).forEach((key) => {
        formData.append(key, custom_images_upload_param[key]);
      });
    }
    xhr.send(formData);
  });
}
function getContentStyle(style) {
  const defaultStyle = `body{font-size: 14px;} img{padding: 0 2px;} `;
  return defaultStyle + (style ? style : "");
}
const scriptLoaderCreator = () => {
  let state = {
    status: {},
    loadedCallbacks: {}
  };
  const creactScriptElm = (url, callback) => {
    const scriptElm = document.createElement("script");
    scriptElm.id = uuid("tiny-script");
    scriptElm.type = "application/javascript";
    scriptElm.src = url;
    scriptElm.referrerPolicy = "origin";
    const handler = () => {
      scriptElm.removeEventListener("load", handler);
      callback();
    };
    scriptElm.addEventListener("load", handler);
    (document.head || document.body).appendChild(scriptElm);
  };
  const execCallbacks = (url) => {
    if (!state.loadedCallbacks[url])
      return;
    state.loadedCallbacks[url].forEach((callback) => {
      if (typeof callback["handler"] === "function") {
        callback["handler"].call(callback.scope);
      }
    });
    state.loadedCallbacks[url] = void 0;
  };
  const load = (url, callback, scope) => {
    if (callback) {
      if (!state.loadedCallbacks[url]) {
        state.loadedCallbacks[url] = [];
      }
      state.loadedCallbacks[url].push({
        handler: callback,
        scope: scope || globalThis
      });
    }
    if (state.status[url] === "LOADED") {
      execCallbacks(url);
      return;
    }
    if (state.status[url] !== "LOADING") {
      state.status[url] = "LOADING";
      creactScriptElm(url, () => {
        state.status[url] = "LOADED";
        execCallbacks(url);
      });
    }
  };
  return {
    load
  };
};
const scriptLoader = scriptLoaderCreator();
const _hoisted_1 = ["id"];
const _hoisted_2 = { key: 0 };
const __default__ = {
  name: "Vue3Tinymce"
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  props: {
    modelValue: String,
    setting: { type: Object, default: () => ({}) },
    setup: Function,
    disabled: Boolean,
    scriptSrc: String,
    debug: Boolean
  },
  emits: ["update:modelValue", "init", "change"],
  setup(__props, { expose, emit }) {
    const props = __props;
    let mounting = true;
    const state = reactive({
      editor: null,
      id: uuid("tinymce"),
      err: ""
    });
    const getModelValue = () => {
      var _a;
      return String((_a = props.modelValue) != null ? _a : "");
    };
    const updateValue = (val) => emit("update:modelValue", val);
    const printLog = (e, val, oldVal) => {
      if (!props.debug)
        return;
      console.log(`\u6765\u81EA\uFF1A${e.type} | 
 ${val} 
 ${oldVal || "--"}`);
    };
    const onChanged = (e, editor) => {
      if (!editor)
        editor = state.editor;
      const content = getContent(editor);
      printLog(e, content);
      updateValue(content);
      emit("change", content);
    };
    const onInited = (editor) => {
      state.editor = editor;
      setContent(getModelValue(), editor);
      if (props.disabled && editor.mode.get() !== "readonly") {
        setModeDisabled(editor);
      }
      editor.on("change input undo redo", (e) => {
        onChanged(e, editor);
      });
      emit("init", editor);
    };
    const initEditor = () => {
      var _a;
      if (getTinymce() === null) {
        state.err = "tinymce is null";
        return;
      }
      if (props.debug) {
        console.warn("vue3-tinymce \u8FDB\u5165debug\u6A21\u5F0F");
      }
      let setting = {
        ...props.setting,
        selector: "#" + state.id,
        content_style: getContentStyle((_a = props.setting) == null ? void 0 : _a.content_style),
        setup: (editor) => {
          if (props.setup)
            props.setup(editor);
          editor.on("init", () => onInited(editor));
        }
      };
      if (props.setting.custom_images_upload) {
        setting.images_upload_handler = (...arg) => {
          return imageUploadHandler.apply(null, [props.setting, ...arg]);
        };
      }
      getTinymce().init(setting);
      mounting = false;
    };
    watch(
      () => props.modelValue,
      (val, oldVal) => {
        if (!state.editor || !state.editor.initialized)
          return;
        if (oldVal === val || val === getContent(state.editor))
          return;
        printLog({ type: "propsChanged to setContent" }, val, oldVal);
        if (val === null)
          return resetContent("", state.editor);
        setContent(getModelValue(), state.editor);
      }
    );
    watch(
      () => props.disabled,
      (val) => {
        if (!state.editor || !state.editor.initialized)
          return;
        setModeDisabled(state.editor, val);
      }
    );
    expose({
      id: state.id,
      editor: state.editor
    });
    onMounted(() => {
      var _a;
      if (getTinymce() !== null) {
        initEditor();
        return;
      }
      const scriptSrc = (_a = props.scriptSrc) != null ? _a : "https://cdn.bootcdn.net/ajax/libs/tinymce/6.1.2/tinymce.min.js";
      scriptLoader.load(scriptSrc, initEditor);
    });
    onActivated(() => {
      if (!mounting)
        initEditor();
    });
    onDeactivated(() => {
      if (!state.editor)
        return;
      state.editor.remove();
    });
    onBeforeUnmount(() => {
      if (!state.editor)
        return;
      state.editor.remove();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("div", {
          id: state.id,
          class: "tiny-textarea"
        }, null, 8, _hoisted_1),
        state.err ? (openBlock(), createElementBlock("p", _hoisted_2, toDisplayString(state.err), 1)) : createCommentVNode("", true)
      ], 64);
    };
  }
});
_sfc_main.install = function(app) {
  app.component("Vue3Tinymce", _sfc_main);
};
export { _sfc_main as default };
