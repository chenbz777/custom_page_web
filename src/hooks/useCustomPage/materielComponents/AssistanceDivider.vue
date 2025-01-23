<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="assistance-divider">
    <van-divider :content-position="data.props.textPosition" :dashed="data.props.isDashed" v-if="data.props.text">
      {{ data.props.text }}
    </van-divider>
    <van-divider :content-position="data.props.textPosition" :dashed="data.props.isDashed" v-else />
  </div>
</template>

<style scoped></style>