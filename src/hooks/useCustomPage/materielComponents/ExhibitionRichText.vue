<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="exhibition-rich-text">
    <div v-html="data.props.content" v-if="data.props.content && (data.props.content !== '<p><br></p>')"></div>
  </div>
</template>

<style scoped></style>