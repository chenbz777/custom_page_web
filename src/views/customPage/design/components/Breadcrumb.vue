<script setup>
import { ref } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';
import useCustomPageDesign from '@/hooks/useCustomPageDesign';
import MaterielFactory from '@/hooks/useCustomPage/materielFactory';


const { subscribe, findCurrentComponentHierarchy } = useCustomPageDesign();

const currentComponentHierarchy = ref(findCurrentComponentHierarchy());

subscribe.on('clickComponent', (data) => {
  setTimeout(() => {
    currentComponentHierarchy.value = findCurrentComponentHierarchy(data);
  }, 100);
});

function handleClickBreadcrumb(item) {
  subscribe.emit('clickComponent', item);
}
</script>

<template>
  <div class="breadcrumb">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item class="breadcrumb__item" v-for="item in currentComponentHierarchy" :key="item.key"
        @click="handleClickBreadcrumb(item)">
        {{ item.title || MaterielFactory.createMateriel(item.type)?.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped>
.breadcrumb {
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.breadcrumb__item {
  cursor: pointer;
}
</style>