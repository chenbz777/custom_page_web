<script setup>
import { ref } from 'vue';
import materielComponents from '@/hooks/useCustomPage/materielComponents';


const props = defineProps({
  renderList: {  // 渲染数据
    type: Array,
    required: true
  },
  option: {  // 配置项
    type: Object,
    required: true,
    default: () => ({})
  }
});

// 渲染数据
const myRenderList = ref(props.renderList);

/**
 * @author: chenbz
 * @description: 触发订阅事件
 * @param eventName {string} 事件名称
 * @param data {*} 事件数据
 * @return {*}
 */
function emitSubscribe(eventName, data) {

  if (!eventName) {
    return;
  }

  if (!props.option) {
    return;
  }

  if (!props.option.subscribe) {
    return;
  }

  if (!props.option.subscribe.emit) {
    return;
  }

  const componentData = this;

  const key = componentData.key;

  // 拼接事件名称
  const newEventName = `${key}_${eventName}`;

  // 触发订阅事件
  props.option.subscribe.emit(newEventName, data);
}
</script>

<template>
  <div v-for="item in myRenderList" :key="item.key">
    <component :is="materielComponents[item.type]" :data="item" :emitSubscribe="emitSubscribe.bind(item)"
      :style="item.style" :id="item.key">
      <template v-for="slotData in item.slots" :key="slotData.name" v-slot:[slotData.name]>
        <RenderEngine v-model:renderList="slotData.children" :option="option" />
      </template>
    </component>
  </div>
</template>

<style scoped></style>