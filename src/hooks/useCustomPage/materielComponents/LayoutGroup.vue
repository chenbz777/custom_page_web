<script setup>
import { onMounted } from 'vue';


const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  emitSubscribe: {
    type: Function,
    required: true
  }
});

onMounted(() => {
  // 发送生命周期事件
  props.emitSubscribe('onMounted');
});

function handleClick() {
  // 发送"值改变"事件
  props.emitSubscribe('onClick');
}
</script>

<template>
  <div class="layout-group" @click="handleClick()">
    <div class="layout-group__head">
      <slot name="head"></slot>
    </div>

    <div class="layout-group__content">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<style scoped>
.layout-group__head {
  padding: 6px 10px;
  border-bottom: 1px solid #e8e8e8;
}

.layout-group__content {
  padding: 10px;
}

.layout-group__title {
  position: relative;
  display: inline-block;
}

.layout-group__title__text {
  position: relative;
  z-index: 2;
  font-size: 16px;
  font-weight: 600;
  padding: 0 6px;
}

.layout-group__title__bg-block {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 10px;
  background-color: #b3f64a;
}
</style>