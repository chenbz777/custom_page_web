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
  <img :src="data.props.url" alt="image" class="base-image" @click="handleClick()" />
</template>

<style scoped></style>