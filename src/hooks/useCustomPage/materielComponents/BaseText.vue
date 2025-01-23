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
  <div class="base-text" @click="handleClick()">
    {{ data.props.text }}
  </div>
</template>

<style scoped></style>