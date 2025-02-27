<script setup>
import { useRouter } from 'vue-router';


const router = useRouter();

// 前往页面设计页
const toDesign = () => {
  router.push('/customPage/design');
};

// 集成【页面设计页】示例
const toDemoDesign = () => {
  router.push('/demo/design');
};

// 集成【页面预览页】示例
const goDemoDesign = () => {
  router.push('/demo/preview');
};
</script>

<template>
  <div class="home">
    <el-button type="primary" @click="toDesign()">前往页面设计页</el-button>
    <el-button type="primary" @click="toDemoDesign()">集成【页面设计页】示例</el-button>
    <el-button type="primary" @click="goDemoDesign()">集成【页面预览页】示例</el-button>
  </div>
</template>

<style scoped>
.home {
  padding: 20px;
}
</style>