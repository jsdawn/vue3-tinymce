(function(i,m){typeof exports=="object"&&typeof module!="undefined"?module.exports=m(require("vue")):typeof define=="function"&&define.amd?define(["vue"],m):(i=typeof globalThis!="undefined"?globalThis:i||self,i.Vue3Tinymce=m(i.Vue))})(this,function(i){"use strict";const m=t=>t+"_"+(Date.now()+Math.floor(Math.random()*1e6)),_=()=>{const t=typeof window!="undefined"?window:global;return t&&"tinymce"in t?t.tinymce:null};function C(t){return t?t.getContent():""}function b(t,r){!r||r.setContent(t)}function T(t,r){if(!!r){if(r.resetContent)return r.resetContent(t);r.setContent(t),r.setDirty(!1),r.undoManager.clear()}}function E(t,r=!0){!t||t.mode.set(r?"readonly":"design")}function S(t,r,u){return new Promise((d,o)=>{let{images_upload_url:n,images_upload_credentials:l,custom_images_upload_header:p,custom_images_upload_param:g,custom_images_upload_callback:y}=t||{},s,f;s=new XMLHttpRequest,s.withCredentials=!!l,s.open("POST",n||""),p&&Object.keys(p).forEach(e=>{s.setRequestHeader(e,p[e])}),s.upload.onprogress=function(e){u(e.loaded/e.total*100)},s.onload=function(){if(s.status===403){o({message:"HTTP Error: "+s.status,remove:!0});return}if(s.status<200||s.status>=300){o("HTTP Error: "+s.status);return}let e=JSON.parse(s.responseText);if(!e){o("Invalid JSON: "+s.responseText);return}let a=typeof y=="function"?y(e):e.location;if(!a){o("Failed Path: location image path is error/empty");return}d(a)},s.onerror=function(){o("Image upload failed due to a XHR Transport error. Code: "+s.status)},f=new FormData,f.append("file",r.blob(),r.filename()),g&&Object.keys(g).forEach(e=>{f.append(e,g[e])}),s.send(f)})}function D(t){return"body{font-size: 14px;} img{padding: 0 2px;} "+(t||"")}const k=(()=>{let t={status:{},loadedCallbacks:{}};const r=(o,n)=>{const l=document.createElement("script");l.id=m("tiny-script"),l.type="application/javascript",l.src=o,l.referrerPolicy="origin";const p=()=>{l.removeEventListener("load",p),n()};l.addEventListener("load",p),(document.head||document.body).appendChild(l)},u=o=>{!t.loadedCallbacks[o]||(t.loadedCallbacks[o].forEach(n=>{typeof n.handler=="function"&&n.handler.call(n.scope)}),t.loadedCallbacks[o]=void 0)};return{load:(o,n,l)=>{if(n&&(t.loadedCallbacks[o]||(t.loadedCallbacks[o]=[]),t.loadedCallbacks[o].push({handler:n,scope:l||globalThis})),t.status[o]==="LOADED"){u(o);return}t.status[o]!=="LOADING"&&(t.status[o]="LOADING",r(o,()=>{t.status[o]="LOADED",u(o)}))}}})(),w=["id"],V={key:0},h=Object.assign({name:"Vue3Tinymce"},{props:{modelValue:String,setting:{type:Object,default:()=>({})},setup:Function,disabled:Boolean,scriptSrc:String,debug:Boolean},emits:["update:modelValue","init","change"],setup(t,{expose:r,emit:u}){const d=t;let o=!0;const n=i.reactive({editor:null,id:m("tinymce"),err:""}),l=()=>{var e;return String((e=d.modelValue)!=null?e:"")},p=e=>u("update:modelValue",e),g=(e,a,c)=>{!d.debug||console.log(`\u6765\u81EA\uFF1A${e.type} | 
 ${a} 
 ${c||"--"}`)},y=(e,a)=>{a||(a=n.editor);const c=C(a);g(e,c),p(c),u("change",c)},s=e=>{n.editor=e,b(l(),e),d.disabled&&e.mode.get()!=="readonly"&&E(e),e.on("change input undo redo",a=>{y(a,e)}),u("init",e)},f=()=>{var a;if(_()===null){n.err="tinymce is null";return}d.debug&&console.warn("vue3-tinymce \u8FDB\u5165debug\u6A21\u5F0F");let e={...d.setting,selector:"#"+n.id,content_style:D((a=d.setting)==null?void 0:a.content_style),setup:c=>{d.setup&&d.setup(c),c.on("init",()=>s(c))}};d.setting.custom_images_upload&&(e.images_upload_handler=(...c)=>S.apply(null,[d.setting,...c])),_().init(e),o=!1};return i.watch(()=>d.modelValue,(e,a)=>{if(!(!n.editor||!n.editor.initialized)&&!(a===e||e===C(n.editor))){if(g({type:"propsChanged to setContent"},e,a),e===null)return T("",n.editor);b(l(),n.editor)}}),i.watch(()=>d.disabled,e=>{!n.editor||!n.editor.initialized||E(n.editor,e)}),r({id:n.id,editor:n.editor}),i.onMounted(()=>{var a;if(_()!==null){f();return}const e=(a=d.scriptSrc)!=null?a:"https://cdn.bootcdn.net/ajax/libs/tinymce/6.1.2/tinymce.min.js";k.load(e,f)}),i.onActivated(()=>{o||f()}),i.onDeactivated(()=>{!n.editor||n.editor.remove()}),i.onBeforeUnmount(()=>{!n.editor||n.editor.remove()}),(e,a)=>(i.openBlock(),i.createElementBlock(i.Fragment,null,[i.createElementVNode("div",{id:n.id,class:"tiny-textarea"},null,8,w),n.err?(i.openBlock(),i.createElementBlock("p",V,i.toDisplayString(n.err),1)):i.createCommentVNode("",!0)],64))}});return h.install=function(t){t.component("Vue3Tinymce",h)},h});