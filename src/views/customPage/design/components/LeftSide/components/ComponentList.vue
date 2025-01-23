<script setup>
import MaterielFactory from '@/hooks/useCustomPage/materielFactory';
import { vDraggable } from 'vue-draggable-plus';
import useCustomPageDesign from '@/hooks/useCustomPageDesign';


const { addComponent } = useCustomPageDesign();

const groups = {
  '布局': [],
  '基础': [],
  '展示': [],
  '高级': [],
  '辅助': []
};

Object.values(MaterielFactory.getModules()).forEach((itemClass) => {

  const model = new itemClass();

  if (!model.group) {
    return;
  }

  if (!groups[model.group]) {
    groups[model.group] = [];
  }

  groups[model.group].push(model);

  // 根据sort字段排序
  groups[model.group].sort((a, b) => a.sort - b.sort);
});

delete groups['页面'];

// 拖拽配置
const draggableOption = {
  animation: 200,
  sort: false,
  group: {
    name: 'customPageDesignGroup',
    put: false,
    pull: 'clone'
  },
  clone: (data) => {
    return MaterielFactory.createMateriel(data.type);
  }
};

// 点击组件
function handleClick(data) {
  addComponent(MaterielFactory.createMateriel(data.type));
}
</script>

<template>
  <div class="component-list">
    <AnimateTransitionGroup>
      <template v-for="(groupItems, key) in groups" :key="key">
        <div class="component-list__title">
          {{ key }}
        </div>
        <el-row :gutter="10" v-draggable="[groupItems, draggableOption]">
          <el-col :span="12" v-for="item in groupItems" :key="item.key">
            <div class="component-list__item" @click="handleClick(item)">{{ item.title }}</div>
          </el-col>
        </el-row>
      </template>
    </AnimateTransitionGroup>
  </div>
</template>

<style scoped>
.component-list__title {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  line-height: 40px;
}

.component-list__item {
  background-color: #f0f0f0;
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.3s;
}

.component-list__item:hover {
  border: 1px solid #3095fa;
}
</style>