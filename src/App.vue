<script setup>
import { onMounted } from 'vue';
import localStorage from '@/utils/localStorage';


onMounted(() => {
  // 初始化主题
  const theme = localStorage.get('theme');

  if (theme) {
    for (const key in theme) {
      document.documentElement.style.setProperty(key, theme[key]);
    }
  }
});
</script>

<template>
  <router-view />
</template>

<style scoped></style>

<style src="./styles/base.css"></style>
<style src="./styles/global.css"></style>
<style src="./styles/theme.css"></style>
<style></style>
