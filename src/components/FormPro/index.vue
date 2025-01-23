<script setup>
import { ref, useSlots, watch } from 'vue';
import FormItemModel from './Model/FormItemModel';
import { ElMessage } from 'element-plus';
import UploadFile from '@/components/UploadFile.vue';


const emit = defineEmits(['update:formData']);

// 插槽对象
const slots = useSlots();

// 表单ref
const formRef = ref(null);

const props = defineProps({
  formData: {
    required: true,
    type: Object,
    default: () => { }
  },
  formConfig: {
    required: true,
    type: Array,
    default: () => []
  },
  operationConfig: {
    required: false,
    type: Array,
    default: () => []
  },
  operationPosition: {
    required: false,
    type: String,
    default: 'left'  // 居左: left, 居右: right, 居中: center
  },
  labelPosition: {
    required: false,
    type: String,
    default: 'right'  // 居左: left, 居右: right, 顶部: top
  },
  inline: {
    required: false,
    type: Boolean,
    default: false
  },
  isReadOnly: {
    required: false,
    type: Boolean,
    default: false
  },
  labelWidth: {
    required: false,
    type: String,
    default: '120px'
  }
});

const myFormConfig = ref([]);

// 初始化表单配置
myFormConfig.value = props.formConfig.map(item => {
  return new FormItemModel(item);
});

// 初始化远程 options 数据
myFormConfig.value.forEach(item => {
  // 如果有远程数据
  if (item.props.optionsPromise) {
    // 获取远程数据
    item.props.optionsPromise().then(res => {
      // 设置 options
      item.props.options = res;
    });
  }
});

/**
 * 初始化表单校验规则
 */
const rules = ref({});

myFormConfig.value.forEach(item => {
  if (item.required) {
    rules.value[item.key] = item.props.getRules();
  }

  if (item.rules) {
    rules.value[item.key] = item.rules;

    item.required = true;
  }
});

/**
 * end 初始化表单校验规则
 */

/**
 * 初始化表单数据
 */
const myFormData = ref({});

function getFormData() {
  return JSON.parse(JSON.stringify(myFormData.value));
}

function initFormData() {

  myFormData.value = props.formData;

  const myFormDataKeys = Object.keys(myFormData.value);

  // 兜底默认值
  myFormConfig.value.forEach(formItem => {
    if (!myFormDataKeys.includes(formItem.key)) {
      myFormData.value[formItem.key] = formItem.props.getDefaultValue();
    }
  });
}

initFormData();

watch(() => myFormData.value, (value) => {
  emit('update:formData', value);
}, {
  immediate: true,
  deep: true
});
/**
 * end 初始化表单数据
 */


class Operation {
  constructor(operationData = {}) {
    Object.assign(this, {
      text: '操作按钮',
      type: 'primary',  // primary / success / warning / danger / info
      clickFn: () => {
        ElMessage({
          message: '功能暂未开放',
          type: 'warning'
        });
      }
    }, operationData);
  }
}

const defineExposeData = {
  formRef,
  getFormData
};

const operationList = props.operationConfig.map(item => new Operation(item));

function handleOperationClick(operation) {
  operation.clickFn(defineExposeData);
}

defineExpose(defineExposeData);
</script>

<template>
  <div>
    <el-form :model="myFormData" ref="formRef" :rules="rules" :label-width="labelWidth" :inline="inline" @submit.prevent
      class="form-plus" :class="{ 'form-plus-inline': inline }" :label-position="labelPosition">
      <AnimateTransitionGroup>
        <template v-for="formItem in myFormConfig" :key="formItem.key">
          <el-form-item :label="formItem.label" :prop="formItem.key" v-show="formItem.showFn(myFormData)">
            <template #label>
              {{ formItem.label }}
            </template>

            <!-- 预留自定义表单 -->
            <slot v-if="slots[formItem.key]" :name="formItem.key" :formItem="formItem"></slot>

            <template v-else-if="isReadOnly">
              <div class="form-item-read-only">
                <div class="form-item-read-only__content" v-html="formItem.props.getText(myFormData[formItem.key])">
                </div>
              </div>
            </template>

            <!-- 输入框 -->
            <el-input v-else-if="formItem.type === 'input'" v-model="myFormData[formItem.key]"
              :placeholder="formItem.props.placeholder" :disabled="formItem.props.disabled"
              :maxlength="formItem.props.maxLength" :show-word-limit="formItem.props.showLimit"
              :clearable="formItem.props.clearable" :style="formItem.props.style">
              <template #prepend v-if="formItem.props.prefix">{{ formItem.props.prefix }}</template>
              <template #append v-if="formItem.props.suffix">{{ formItem.props.suffix }}</template>
            </el-input>

            <!-- 文本框 -->
            <el-input v-else-if="formItem.type === 'textarea'" v-model="myFormData[formItem.key]"
              :autosize="{ minRows: formItem.props.minRows, maxRows: formItem.props.maxRows }" type="textarea"
              :placeholder="formItem.props.placeholder" :disabled="formItem.props.disabled"
              :show-word-limit="formItem.props.showLimit" :maxlength="formItem.props.maxLength"
              :clearable="formItem.props.clearable" :style="formItem.props.style">
            </el-input>

            <!-- 数字输入框 -->
            <el-input-number v-else-if="formItem.type === 'number'" v-model="myFormData[formItem.key]"
              :controls-position="formItem.props.controlsPosition" :disabled="formItem.props.disabled"
              :precision="formItem.props.precision" :min="formItem.props.min" :max="formItem.props.max"
              :style="formItem.props.style">
              <template #prefix v-if="formItem.props.prefix">
                {{ formItem.props.prefix }}
              </template>
              <template #suffix v-if="formItem.props.suffix">
                {{ formItem.props.suffix }}
              </template>
            </el-input-number>

            <!-- 开关 -->
            <el-switch v-else-if="formItem.type === 'switch'" v-model="myFormData[formItem.key]"
              :disabled="formItem.props.disabled" :style="formItem.props.style" />

            <!-- 时间 -->
            <el-time-picker v-else-if="formItem.type === 'time'" v-model="myFormData[formItem.key]"
              :placeholder="formItem.props.placeholder" :disabled="formItem.props.disabled" format="HH:mm:ss"
              value-format="HH:mm:ss" :clearable="formItem.props.clearable" :style="formItem.props.style" />

            <!-- 时间 to 时间 -->
            <el-time-picker v-else-if="formItem.type === 'timeToTime'" v-model="myFormData[formItem.key]" is-range
              :range-separator="formItem.props.rangeSeparator" :start-placeholder="formItem.props.startPlaceholder"
              :end-placeholder="formItem.props.endPlaceholder" :disabled="formItem.props.disabled" format="HH:mm:ss"
              value-format="HH:mm:ss" :clearable="formItem.props.clearable" :style="formItem.props.style" />

            <!-- 日期 -->
            <el-date-picker v-else-if="formItem.type === 'date'" v-model="myFormData[formItem.key]" type="date"
              format="YYYY-MM-DD" value-format="YYYY-MM-DD" :placeholder="formItem.props.placeholder"
              :disabled="formItem.props.disabled" :clearable="formItem.props.clearable" :style="formItem.props.style" />

            <!-- 日期 to 日期 -->
            <el-date-picker v-else-if="formItem.type === 'dateToDate'" v-model="myFormData[formItem.key]"
              :placeholder="formItem.props.placeholder" type="daterange" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
              :range-separator="formItem.props.rangeSeparator" :start-placeholder="formItem.props.startPlaceholder"
              :end-placeholder="formItem.props.endPlaceholder" :disabled="formItem.props.disabled"
              :clearable="formItem.props.clearable" :style="formItem.props.style" />

            <!-- 日期时间 -->
            <el-date-picker v-else-if="formItem.type === 'dateTime'" v-model="myFormData[formItem.key]" type="datetime"
              format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" :placeholder="formItem.props.placeholder"
              :disabled="formItem.props.disabled" :clearable="formItem.props.clearable" :style="formItem.props.style" />

            <!-- 日期时间 to 日期时间 -->
            <el-date-picker v-else-if="formItem.type === 'dateTimeToDateTime'" v-model="myFormData[formItem.key]"
              type="datetimerange" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
              :range-separator="formItem.props.rangeSeparator" :start-placeholder="formItem.props.startPlaceholder"
              :end-placeholder="formItem.props.endPlaceholder" :disabled="formItem.props.disabled"
              :clearable="formItem.props.clearable" :style="formItem.props.style" />

            <!-- 上传 -->
            <UploadFile v-else-if="formItem.type === 'uploadFile'" v-model="myFormData[formItem.key]"
              :option="formItem.props" :disabled="formItem.props.disabled" :style="formItem.props.style" />

            <!-- 单选 -->
            <el-radio-group v-else-if="formItem.type === 'radio'" v-model="myFormData[formItem.key]"
              :style="formItem.props.style">
              <el-radio v-for="option in formItem.props.options" :key="option[formItem.props.key]"
                :value="option[formItem.props.value]">
                {{ option[formItem.props.label] }}
              </el-radio>
            </el-radio-group>

            <!-- 多选框 -->
            <el-checkbox-group v-else-if="formItem.type === 'checkbox'" v-model="myFormData[formItem.key]"
              :style="formItem.props.style">
              <el-checkbox v-for="option in formItem.props.options" :key="option[formItem.props.key]"
                :value="option[formItem.props.value]">
                {{ option[formItem.props.label] }}
              </el-checkbox>
            </el-checkbox-group>

            <!-- 下拉单选 -->
            <el-select v-else-if="formItem.type === 'select'" v-model="myFormData[formItem.key]"
              :placeholder="formItem.props.placeholder" :disabled="formItem.props.disabled"
              :clearable="formItem.props.clearable" :style="formItem.props.style">
              <el-option v-for="option in formItem.props.options" :key="option[formItem.props.key]"
                :label="option[formItem.props.label]" :value="option[formItem.props.value]" />
            </el-select>

            <!-- 下拉单选 -->
            <el-select v-else-if="formItem.type === 'selectMultiple'" v-model="myFormData[formItem.key]"
              :multiple="true" :placeholder="formItem.props.placeholder" :disabled="formItem.props.disabled"
              :clearable="formItem.props.clearable" :style="formItem.props.style">
              <el-option v-for="option in formItem.props.options" :key="option[formItem.props.key]"
                :label="option[formItem.props.label]" :value="option[formItem.props.value]" />
            </el-select>

            <!-- 颜色 -->
            <el-color-picker v-else-if="formItem.type === 'color'" v-model="myFormData[formItem.key]"
              :disabled="formItem.props.disabled" :style="formItem.props.style" />
          </el-form-item>
        </template>
      </AnimateTransitionGroup>

      <el-form-item>
        <div class="form-plus__operation" :style="{ textAlign: operationPosition }">
          <template v-for="operation in operationList" :key="operation.text">
            <el-button :type="operation.type" @click="handleOperationClick(operation)">
              {{ operation.text }}
            </el-button>
          </template>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.form-plus__operation {
  flex: 1;
}

.form-plus-inline :deep(.el-input) {
  --el-input-width: 220px;
}

.form-plus-inline :deep(.el-select) {
  --el-select-width: 160px;
}

.el-form-item__label--required {
  color: #f56c6c;
  margin-right: 4px;
}

.form-item-read-only {
  flex: 1;
  width: 0;
  padding: 6px 10px;
  border-radius: 6px;
  background-color: #f5f5f5;
}

.form-item-read-only__content:empty::before {
  content: '---';
  color: #999;
}
</style>