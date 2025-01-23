<script setup>
import { ref, watch } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import materielComponents from '@/hooks/useCustomPage/materielComponents';
import useCustomPageDesign from '@/hooks/useCustomPageDesign';
import { ElNotification } from 'element-plus';


const props = defineProps({
  renderList: {  // 渲染数据
    type: Array,
    required: true
  },
  allowComponents: {  // 允许添加的组件
    type: Array,
    required: false,
    default: () => ([])
  },
  denyComponents: {  // 不允许添加的组件
    type: Array,
    required: false,
    default: () => ([])
  }
});

const emit = defineEmits(['update:renderList']);

const { subscribe } = useCustomPageDesign();

// 渲染数据
const myRenderList = ref([]);

// 监听渲染数据
watch(() => props.renderList, (value) => {
  myRenderList.value = value;
}, {
  immediate: true,
  deep: true
});

// 监听渲染数据
watch(() => myRenderList.value, (value) => {
  emit('update:renderList', value);
}, {
  deep: true
});

// 处理不允许添加的组件
function handleDenyComponent(data) {

  const deleteComponent = () => {
    const index = myRenderList.value.findIndex((item) => item.key === data.key);

    myRenderList.value.splice(index, 1);

    ElNotification({
      title: '提示',
      message: '该组件不允许添加',
      type: 'warning'
    });
  };

  // 如果存在不允许添加的组件
  if (props.allowComponents && props.allowComponents.length) {
    if (!props.allowComponents.includes(data.type)) {
      deleteComponent();

      return;
    }
  }

  // 如果存在不允许添加的组件
  if (props.denyComponents && props.denyComponents.length) {
    if (props.denyComponents.includes(data.type)) {
      deleteComponent();

      return;
    }
  }

  return true;
}

// 添加组件
function onAdd(event) {
  const { clonedData } = event;

  // 处理不允许添加的组件
  if (handleDenyComponent(clonedData)) {
    handleClickComponent(clonedData);
  }
}

// 点击组件
function handleClickComponent(data) {
  subscribe.emit('clickComponent', data);
}

// 开始拖拽
function onStart(event) {
  const { data } = event;

  subscribe.emit('onStart', data);
}

// 结束拖拽
function onEnd(event) {
  const { data } = event;

  subscribe.emit('clickComponent', data);
}

/**
 * @author: chenbz
 * @description: 触发订阅事件
 * @param eventName {string} 事件名称
 * @param data {*} 事件数据
 * @return {*}
 */
function emitSubscribe(eventName, data) {
}
</script>

<template>
  <VueDraggable v-model="myRenderList" :animation="300" group="customPageDesignGroup"
    filter=".edit-engine__render--disabled-move" class="edit-engine" :onAdd="onAdd" :onStart="onStart" :onEnd="onEnd">
    <template v-for="item in myRenderList" :key="item.key">
      <component :is="materielComponents[item.type]" :data="item" :emitSubscribe="emitSubscribe" :style="item.style"
        :id="item.key" @click.stop="handleClickComponent(item)" :class="{
          'edit-engine__render--disabled-move': !item.editProps.move
        }">
        <template v-for="slotData in item.slots" :key="slotData.name" v-slot:[slotData.name]>
          <EditEngine v-model:renderList="slotData.children" :allowComponents="slotData.allowComponents"
            :denyComponents="slotData.denyComponents" />
        </template>
      </component>
    </template>
  </VueDraggable>
</template>

<style scoped>
.edit-engine {
  height: 100%;
  cursor: move;
  position: relative;
}

.edit-engine:empty {
  border: 1px dashed rgba(17, 31, 44, .2);
  background-image: -webkit-repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0, 0, 0, .08) 4px, rgba(0, 0, 0, .08) 0);
  display: flex;
  transition: all 0.3s;
}

.edit-engine:empty:before {
  content: '请拖拽组件到此处';
  color: rgba(0, 0, 0, .25);
  font-size: 16px;
  margin: auto;
  padding: 6px;
}
</style>