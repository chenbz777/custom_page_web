<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="page">
    <div class="page__head">
      <slot name="head"></slot>
    </div>
    <div class="page__content">
      <slot name="default"></slot>
    </div>
    <div class="page__foot">
      <slot name="foot"></slot>
    </div>
  </div>
</template>

<style scoped>
.page {
  height: 100vh;
  display: flex !important;
  flex-direction: column !important;
}

.page__content {
  flex: 1;
  height: 0;
  overflow-y: auto;
}

.page__foot {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>