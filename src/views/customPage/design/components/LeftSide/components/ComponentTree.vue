<script setup>
import useCustomPageDesign from '@/hooks/useCustomPageDesign';
import MaterielFactory from '@/hooks/useCustomPage/materielFactory';


const { customPageData, subscribe } = useCustomPageDesign();

/**
 * @author: chenbz
 * @description: 是否允许放置
 * @param {object} draggingNode 拖拽的节点
 * @param {object} dropNode 放置的节点
 * @param {string} type 拖拽的类型
 * @return {boolean} 是否允许拖拽
 */
function allowDrop(draggingNode, dropNode, type) {

  // 插槽根节点 && 放置在插槽根节点下面
  if (dropNode.data.name && (type === 'inner')) {
    return true;
  }

  return false;
}

/**
 * @author: chenbz
 * @description: 是否允许拖拽
 * @param {object} draggingNode 拖拽的节点
 * @param {object} dropNode 放置的节点
 * @param {string} type 拖拽的类型
 * @return {boolean} 是否允许拖拽
 */
function allowDrag(draggingNode, dropNode, type) {

  // 插槽根节点不允许拖拽
  if (draggingNode.data.name) {
    return false;
  }

  return true;
}

/**
 * @author: chenbz
 * @description: 节点点击事件
 * @param {object} node 节点
 * @return {*}
 */
function handleNodeClick(data) {
  if (!data.type) {
    return;
  }

  subscribe.emit('clickComponent', data);
}

// 拖拽开始
function handleDragStart(event) {
  const { data } = event;

  subscribe.emit('onStart', data);
}

// 拖拽结束
function handleDragEnd(event) {
  const { data } = event;

  subscribe.emit('clickComponent', data);
}
</script>

<template>
  <div>
    <el-tree :data="customPageData" :allow-drop="allowDrop" :allow-drag="allowDrag" draggable default-expand-all
      node-key="key" @node-click="handleNodeClick" @node-drag-start="handleDragStart" @node-drag-end="handleDragEnd">
      <template #default="{ data }">
        <div class="custom-tree-node">
          {{ data.title || MaterielFactory.createMateriel(data.type)?.title }}
        </div>
      </template>
    </el-tree>
  </div>
</template>

<style scoped></style>