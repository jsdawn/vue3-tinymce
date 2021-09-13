<template>
  <router-link to="/">
    <section class="ui-face">
      <h1>Vue3Tinymce</h1>
      <p class="secondary">tinymce editor Components built on Vue3 and Vite</p>
    </section>
  </router-link>

  <router-view v-slot="{ Component }">
    <component :is="Component"></component>
  </router-view>
</template>

<script setup>
// https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style scoped>
@import './style/normalize.scss';

.ui-face {
  padding: 40px 20px;
}

.ui-face h1 {
  font-size: 16px;
  font-weight: normal;
}

.ui-face:hover {
  color: #576b95;
}
</style>
