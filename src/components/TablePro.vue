<script setup>
import { ref, useSlots, watch } from 'vue';
import { ElMessage } from 'element-plus';

// 插槽对象
const slots = useSlots();

// 表单ref
const tablePro = ref(null);

/**
 * 表格配置
 */
const props = defineProps({
  tableConfig: {
    type: Array,
    default: () => []
  },
  tableData: {
    type: Array,
    default: () => []
  },
  operationConfig: {
    type: Array,
    default: () => []
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  total: {
    type: Number,
    default: 0
  }
});

class Column {
  constructor(columnData = {}) {
    Object.assign(this, {
      label: '默认标题',
      key: 'default',
      width: '',
      showOverflowTooltip: false,
      getText: (row) => {

        if (!this.key) {
          return '---';
        }

        if (!row) {
          return '---';
        }

        return row[this.key];
      }
    }, columnData);
  }
}

const columnList = props.tableConfig.map(item => new Column(item));

class Operation {
  constructor(operationData = {}) {
    Object.assign(this, {
      text: '操作按钮',
      type: 'primary',
      showFn: (row) => {
        return true;
      },
      clickFn: (row) => {
        ElMessage({
          message: '功能暂未开放',
          type: 'warning'
        });
      }
    }, operationData);
  }
}

const operationList = props.operationConfig.map(item => new Operation(item));


/**
 * 分页
 */
const emit = defineEmits(['paginationChange']);

const current = ref(1);
const size = ref(10);

// 改变了分页
const handlePagination = () => {
  emit('paginationChange', {
    current: current.value,
    size: size.value
  });
};

watch(() => current.value, handlePagination);
watch(() => size.value, handlePagination);
</script>

<template>
  <BaseContainer>
    <el-table :data="tableData" border stripe style="width: 100%" ref="tablePro">
      <el-table-column v-for="column in columnList" :key="column.key" :prop="column.key" :label="column.label"
        :width="column.width" :show-overflow-tooltip="column.showOverflowTooltip">
        <template #default="scope">
          <slot v-if="slots[column.key]" :name="column.key" :data="scope.row"></slot>
          <div v-else>
            <div v-html="column.getText(scope.row)"></div>
          </div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" :width="`${operationList.length * 80}px`" v-if="operationList.length">
        <template #default="scope">
          <template v-for="operation in operationList" :key="operation.text">
            <el-button :type="operation.type" v-show="operation.showFn(scope.row)"
              @click="operation.clickFn(scope.row)">
              {{ operation.text }}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <template #foot>
      <div class="pt-5" v-if="showPagination">
        <el-pagination background :total="total" :page-sizes="[10, 20, 50, 100, 200, 300, 500, 1000]"
          layout="total, sizes, prev, pager, next, jumper" v-model:page-size="size" v-model:current-page="current" />
      </div>
    </template>
  </BaseContainer>
</template>

<style scoped></style>