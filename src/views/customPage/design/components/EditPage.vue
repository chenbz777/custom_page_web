<script setup>
import useCustomPageDesign from '@/hooks/useCustomPageDesign';
import EditEngine from './EditEngine.vue';


const { customPageData } = useCustomPageDesign();
</script>

<template>
  <div class="edit-page">
    <EditEngine v-model:renderList="customPageData" />
  </div>
</template>

<style scoped>
.edit-page {
  margin: 0 auto;
  height: 100%;
  background-color: white;
  border: 2px solid white;
}

:deep(.page) {
  height: 100% !important;
}
</style>