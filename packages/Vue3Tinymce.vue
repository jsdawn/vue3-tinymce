<template>
  <textarea :id="state.id"></textarea>
  <p v-if="state.err">{{ state.err }}</p>
</template>

<script>
export default {
  name: 'Vue3Tinymce'
};
</script>

<script setup>
import {
  reactive,
  watch,
  onMounted,
  onBeforeUnmount,
  onActivated,
  onDeactivated
} from 'vue';

import {
  getTinymce,
  setContent,
  resetContent,
  setModeDisabled,
  imageUploadHandler
} from './utils';

const props = defineProps({
  modelValue: String,
  setting: Object,
  setup: Function,
  disabled: Boolean,
  debug: Boolean
});

const emit = defineEmits(['update:modelValue', 'init', 'change']);

let mounting = true;

const state = reactive({
  editor: null,
  id: `vue3-tinymce-${Date.now() + Math.floor(Math.random() * 1000)}`,
  err: '',
  status: 'INIT' // INIT INPUT
});

const getModelValue = () => String(props.modelValue ?? '');

const updateValue = val => emit('update:modelValue', val);

const setHandleStatus = val => (state.status = val);

const printLog = (e, val, oldVal) => {
  if (!props.debug) return;
  console.log(
    `来自：${e.type} | 状态：${state.status} \n ${val} \n ${oldVal || '--'}`
  );
};

const onChanged = (e, editor) => {
  if (!editor) editor = state.editor;

  const content = editor.getContent();
  printLog(e, content);

  updateValue(content);
  emit('change', content);
};

const onInited = editor => {
  state.editor = editor;

  setContent(getModelValue(), editor);

  if (props.disabled && editor.mode.get() !== 'readonly') {
    setModeDisabled(editor);
  }

  //只在编辑器中打字才会触发, 录入文字时标记为`INPUT`状态
  editor.on('keyup input', () => {
    setHandleStatus('INPUT');
  });

  editor.on('Blur', e => {
    setHandleStatus('INIT');
    printLog(e, editor.getContent());
  });

  editor.on('input keyup Change Undo Redo ExecCommand NodeChange', e => {
    onChanged(e, editor);
  });

  emit('init', editor);
};

const initEditor = () => {
  let setting = {
    ...props.setting,
    selector: '#' + state.id,
    setup: editor => {
      if (props.setup) props.setup(editor);
      editor.on('init', () => onInited(editor));
    }
  };

  // custom_images_upload true
  if (props.setting.custom_images_upload) {
    setting.images_upload_handler = (...arg) => {
      imageUploadHandler.apply(null, [props.setting || {}, ...arg]);
    };
  }

  getTinymce().init(setting);
  mounting = false;
};

watch(
  () => props.modelValue,
  (val, oldVal) => {
    printLog({ type: 'propsChanged' }, val, oldVal);

    if (state.status === 'INPUT' || oldVal === val) return;
    if (!state.editor || !state.editor.initialized) return;

    if (val === null) return resetContent('', state.editor);
    setContent(getModelValue(), state.editor);
  }
);

watch(
  () => props.disabled,
  val => {
    if (!state.editor || !state.editor.initialized) return;
    setModeDisabled(state.editor, val);
  }
);

defineExpose({
  editor: state.editor
});

onMounted(() => {
  if (getTinymce() === null) {
    state.err = 'tinymce is null';
    return;
  }

  if (props.debug) {
    console.warn('vue3-tinymce 进入debug模式');
  }

  initEditor();
});

onActivated(() => {
  if (!mounting) initEditor();
});

onDeactivated(() => {
  if (!state.editor) return;
  state.editor.remove();
});

onBeforeUnmount(() => {
  if (!state.editor) return;
  state.editor.remove();
});
</script>
