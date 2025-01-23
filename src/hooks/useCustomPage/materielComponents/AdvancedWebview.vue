<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="advanced-webview">
    <iframe :src="data.props.url" class="advanced-webview__iframe" :style="{
      width: data.props.width,
      height: data.props.height,
    }"></iframe>
  </div>
</template>

<style scoped>
.advanced-webview__iframe {
  display: block;
  border: 0;
  width: 100%;
  height: 100%;
}
</style>