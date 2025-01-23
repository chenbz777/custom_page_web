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
  <div class="base-title" @click="handleClick()">
    <div class="base-title__title" v-if="data.props.title">
      <div class="base-title__title__text">
        {{ data.props.title }}
      </div>
      <div class="base-title__title__bg-block" :style="{ backgroundColor: data.props.lineColor }"></div>
    </div>
  </div>
</template>

<style scoped>
.base-title__title {
  position: relative;
  display: inline-block;
}

.base-title__title__text {
  position: relative;
  z-index: 2;
  padding: 0 6px;
}

.base-title__title__bg-block {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 10px;
}
</style>