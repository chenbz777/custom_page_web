<script setup>
import { ref } from 'vue';
import AttributeSettings from './components/AttributeSettings.vue';
import useCustomPageDesign from '@/hooks/useCustomPageDesign';
import MaterielFactory from '@/hooks/useCustomPage/materielFactory';
import StyleSettings from './components/StyleSettings.vue';
import EventSettings from './components/EventSettings.vue';


const { subscribe } = useCustomPageDesign();

const segmented = ref('基础');

const options = [
  {
    label: '基础',
    value: '基础'
  },
  {
    label: '样式',
    value: '样式'
  },
  {
    label: '事件',
    value: '事件'
  },
  {
    label: '编辑态',
    value: '编辑态'
  }
];

// 当前组件模型数据
const currentComponentModel = ref(null);

const currentComponentData = ref(null);

subscribe.on('clickComponent', (data) => {

  if (data) {
    currentComponentModel.value = MaterielFactory.createMateriel(data.type, data, {
      isFull: true
    });

    currentComponentData.value = data;

    segmented.value = '基础';
  } else {
    currentComponentModel.value = null;
    currentComponentData.value = null;
  }
});
</script>

<template>
  <div class="configuration" v-if="currentComponentData">
    <div class="configuration-segmented">
      <el-segmented v-model="segmented" :options="options" block>
        <template #default="{ item }">
          {{ item.label }}
        </template>
      </el-segmented>
    </div>

    <div class="configuration__content" :key="currentComponentData.key">
      <AnimateTransition>
        <template v-if="segmented === '基础'">
          <AttributeSettings :settings="currentComponentModel.attributeSettings" v-model="currentComponentData.props"
            v-if="currentComponentModel.attributeSettings.length" />
        </template>
        <template v-if="segmented === '样式'">
          <StyleSettings v-model="currentComponentData.style" />
        </template>
        <template v-if="segmented === '事件'">
          <EventSettings :settings="currentComponentModel.eventSettings" v-model="currentComponentData.events">
          </EventSettings>
        </template>
        <template v-if="segmented === '编辑态'">
          <AttributeSettings :settings="currentComponentModel.editSettings" v-model="currentComponentData.editProps" />
        </template>
      </AnimateTransition>
    </div>
  </div>
</template>

<style scoped>
.configuration {
  height: 100%;
}

.configuration-segmented {
  background-color: white;
  padding: 6px 2px;
  border-bottom: 1px solid rgba(31, 56, 88, 0.1);
}

.configuration-segmented .el-segmented {
  --el-border-radius-base: 16px;
  --el-segmented-bg-color: white;
}

.configuration__content {
  height: calc(100% - 46px);
  overflow-y: auto;
}

.configuration__as-key {
  display: flex;
  align-items: center;
  padding: 10px;
}

.configuration__as-key__title {
  color: #16191b;
  font-weight: 400;
  font-size: 12px;
  margin-right: 10px;
}

.configuration__as-key__input {
  flex: 1;
}
</style>