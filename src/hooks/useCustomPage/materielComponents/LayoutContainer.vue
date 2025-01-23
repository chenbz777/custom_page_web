<script setup>
import { ref, watch, onMounted } from 'vue';

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

const propsData = ref(props.data);

const cols = ref([]);

watch(() => props.data.props.cols, (_cols) => {
  if (!_cols.length) {
    propsData.value.slots = [];
    cols.value = [];

    return;
  }

  // 如果没有设置默认的 name，那么默认第一个为 default
  if (!_cols.some(item => item.name === 'default')) {
    _cols[0].name = 'default';
  }

  cols.value = _cols;

  _cols.forEach((col) => {
    // 追加新的 slot
    if (!propsData.value.slots.some(item => item.name === col.name)) {
      propsData.value.slots.push({
        name: col.name,
        title: `插槽${col.name}`,
        allowComponents: [],
        denyComponents: [],
        children: []
      });
    }
  });
}, {
  immediate: true,
  deep: true
});
</script>

<template>
  <div class="layout-container" @click="handleClick()">
    <el-row :gutter="data.props.gutter" :justify="data.props.justify">
      <el-col :span="col.span" :offset="col.offset" v-for="col in cols" :key="col.name">
        <slot :name="col.name"></slot>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>