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
  <div class="exhibition-rolling-notification" @click="handleClick()">
    <van-notice-bar :left-icon="data.props.showLeftIcon ? 'volume-o' : ''" :text="data.props.text"
      :scrollable="data.props.rolling" :mode="data.props.allowClose ? 'closeable' : ''" :speed="data.props.rollingSpeed"
      :background="data.props.backgroundColor" :color="data.props.textColor" />
  </div>
</template>

<style scoped></style>