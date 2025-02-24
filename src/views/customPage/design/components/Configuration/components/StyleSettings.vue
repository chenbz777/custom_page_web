<script setup>
import { reactive, watch } from 'vue';


function getBaseStyleData() {
  return {
    fontSize: '',
    color: '',
    fontWeight: 400,
    lineHeight: '',
    textAlign: '',
    width: '',
    height: '',
    marginLeft: '',
    marginRight: '',
    marginTop: '',
    marginBottom: '',
    paddingLeft: '',
    paddingRight: '',
    paddingTop: '',
    paddingBottom: '',
    display: '',
    flexDirection: '',
    justifyContent: '',
    alignItems: '',
    flexWrap: '',
    borderRadius: '',
    borderWidth: '',
    borderStyle: '',
    borderColor: '',
    backgroundColor: '',
    backgroundImage: '',
    backgroundSize: '',
    boxShadowOffsetX: '',
    boxShadowOffsetY: '',
    boxShadowBlur: '',
    boxShadowColor: '',
    overflowY: '',
    overflowX: ''
  };
}

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => { }
  }
});

const styleData = reactive(Object.assign(getBaseStyleData(), JSON.parse(JSON.stringify(props.modelValue))));

// 数据更新事件
const emit = defineEmits(['update:modelValue']);

watch(() => styleData, (value) => {

  const data = JSON.parse(JSON.stringify(value));

  data.boxShadow = `${data.boxShadowOffsetX} ${data.boxShadowOffsetY} ${data.boxShadowBlur} ${data.boxShadowColor}`;

  // 清除无用数据
  for (const key in data) {
    if (data[key] === '') {
      delete data[key];
    }
  }

  emit('update:modelValue', data);
}, {
  deep: true
});
</script>

<template>
  <div class="style-deploy">
    <div class="style-deploy__title">文字</div>
    <el-row>
      <el-col :span="12">
        <div class="custom-input-group">
          <div class="custom-input-group__before">字号</div>
          <div class="custom-input-group__content">
            <el-input v-model="styleData.fontSize" clearable />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="custom-input-group">
          <div class="custom-input-group__before">颜色</div>
          <div class="custom-input-group__content">
            <el-color-picker v-model="styleData.color" />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="custom-input-group">
          <div class="custom-input-group__before">字重</div>
          <div class="custom-input-group__content">
            <el-select placeholder="请选择" v-model="styleData.fontWeight" clearable>
              <el-option label="300" :value="300" />
              <el-option label="400" :value="400" />
              <el-option label="500" :value="500" />
              <el-option label="600" :value="600" />
              <el-option label="700" :value="700" />
              <el-option label="800" :value="800" />
              <el-option label="900" :value="900" />
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="custom-input-group">
          <div class="custom-input-group__before">行高</div>
          <div class="custom-input-group__content">
            <el-input v-model="styleData.lineHeight" clearable />
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="custom-input-group">
          <div class="custom-input-group__before">对齐</div>
          <div class="custom-input-group__content">
            <el-select placeholder="请选择" v-model="styleData.textAlign" clearable>
              <el-option label="左对齐" value="left" />
              <el-option label="右对齐" value="right" />
              <el-option label="居中对齐" value="center" />
              <el-option label="两端对齐" value="justify" />
            </el-select>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="style-deploy__title">布局</div>
    <el-row>
      <el-col :span="12">
        <div class="custom-input-group">
          <div class="custom-input-group__before">宽度</div>
          <div class="custom-input-group__content">
            <el-input v-model="styleData.width" clearable />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="custom-input-group">
          <div class="custom-input-group__before">高度</div>
          <div class="custom-input-group__content">
            <el-input v-model="styleData.height" clearable />
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="grid-box">
          <div class="grid-box__padding">
            <div class="grid-box__content">
            </div>
          </div>
          <span class="grid-box--margin">外间距</span>
          <span class="grid-box--padding">内间距</span>
          <el-input v-model="styleData.marginLeft" class="grid-box--margin-left" />
          <el-input v-model="styleData.marginRight" class="grid-box--margin-right" />
          <el-input v-model="styleData.marginTop" class="grid-box--margin-top" />
          <el-input v-model="styleData.marginBottom" class="grid-box--margin-bottom" />
          <el-input v-model="styleData.paddingLeft" class="grid-box--padding-left" />
          <el-input v-model="styleData.paddingRight" class="grid-box--padding-right" />
          <el-input v-model="styleData.paddingTop" class="grid-box--padding-top" />
          <el-input v-model="styleData.paddingBottom" class="grid-box--padding-bottom" />
        </div>
      </el-col>
      <el-col :span="24">
        <div class="custom-input-group">
          <div class="custom-input-group__before">显示</div>
          <div class="custom-input-group__content">
            <el-select placeholder="请选择" v-model="styleData.display" clearable>
              <el-option label="块元素" value="block" />
              <el-option label="行内元素" value="inline" />
              <el-option label="行内块元素" value="inline-block" />
              <el-option label="flex" value="flex" />
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="12" v-if="styleData.display === 'flex'">
        <div class="custom-input-group">
          <div class="custom-input-group__before">主轴方向</div>
          <div class="custom-input-group__content">
            <el-select placeholder="请选择" v-model="styleData.flexDirection" clearable>
              <el-option label="行" value="row" />
              <el-option label="列" value="column" />
              <el-option label="反向行" value="row-reverse" />
              <el-option label="反向列" value="column-reverse" />
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="12" v-if="styleData.display === 'flex'">
        <div class="custom-input-group">
          <div class="custom-input-group__before">主轴对齐</div>
          <div class="custom-input-group__content">
            <el-select placeholder="请选择" v-model="styleData.justifyContent" clearable>
              <el-option label="主轴头" value="flex-start" />
              <el-option label="居中" value="center" />
              <el-option label="主轴尾" value="flex-end" />
              <el-option label="主轴头尾" value="space-between" />
              <el-option label="主轴两侧间隔相等" value="space-around" />
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="12" v-if="styleData.display === 'flex'">
        <div class="custom-input-group">
          <div class="custom-input-group__before">交叉轴对齐</div>
          <div class="custom-input-group__content">
            <el-select placeholder="请选择" v-model="styleData.alignItems" clearable>
              <el-option label="交叉轴头" value="flex-start" />
              <el-option label="居中" value="center" />
              <el-option label="交叉轴尾" value="flex-end" />
              <el-option label="第一行文字的基线" value="baseline" />
              <el-option label="伸展" value="stretch" />
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="12" v-if="styleData.display === 'flex'">
        <div class="custom-input-group">
          <div class="custom-input-group__before">flex换行</div>
          <div class="custom-input-group__content">
            <el-select placeholder="请选择" v-model="styleData.flexWrap" clearable>
              <el-option label="不换行" value="nowrap" />
              <el-option label="换行" value="wrap" />
              <el-option label="反向换行" value="wrap-reverse" />
            </el-select>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="style-deploy__title">边框</div>
    <el-row>
      <el-col :span="12">
        <div class="custom-input-group">
          <div class="custom-input-group__before">圆角</div>
          <div class="custom-input-group__content">
            <el-input v-model="styleData.borderRadius" clearable />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="custom-input-group">
          <div class="custom-input-group__before">宽度</div>
          <div class="custom-input-group__content">
            <el-input v-model="styleData.borderWidth" clearable />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="custom-input-group">
          <div class="custom-input-group__before">样式</div>
          <div class="custom-input-group__content">
            <el-select placeholder="请选择" v-model="styleData.borderStyle" clearable>
              <el-option label="无" value="none" />
              <el-option label="实线" value="solid" />
              <el-option label="虚线" value="dashed" />
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="custom-input-group">
          <div class="custom-input-group__before">颜色</div>
          <div class="custom-input-group__content">
            <el-color-picker v-model="styleData.borderColor" />
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="style-deploy__title">填充</div>
    <el-row>
      <el-col :span="12">
        <div class="custom-input-group">
          <div class="custom-input-group__before">颜色</div>
          <div class="custom-input-group__content">
            <el-color-picker v-model="styleData.backgroundColor" />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="custom-input-group">
          <div class="custom-input-group__before">大小</div>
          <div class="custom-input-group__content">
            <el-select placeholder="请选择" v-model="styleData.backgroundSize" clearable>
              <el-option label="自动" value="auto" />
              <el-option label="覆盖" value="cover" />
              <el-option label="填充" value="contain" />
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="custom-input-group">
          <div class="custom-input-group__before">图片</div>
          <div class="custom-input-group__content">
            <el-input v-model="styleData.backgroundImage" clearable />
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="style-deploy__title">阴影</div>
    <el-row>
      <el-col :span="12">
        <div class="custom-input-group">
          <div class="custom-input-group__before">X轴</div>
          <div class="custom-input-group__content">
            <el-input v-model="styleData.boxShadowOffsetX" clearable />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="custom-input-group">
          <div class="custom-input-group__before">Y轴</div>
          <div class="custom-input-group__content">
            <el-input v-model="styleData.boxShadowOffsetY" clearable />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="custom-input-group">
          <div class="custom-input-group__before">距离</div>
          <div class="custom-input-group__content">
            <el-input v-model="styleData.boxShadowBlur" clearable />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="custom-input-group">
          <div class="custom-input-group__before">颜色</div>
          <div class="custom-input-group__content">
            <el-color-picker v-model="styleData.boxShadowColor" />
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="style-deploy__title">溢出</div>
    <el-row>
      <el-col :span="12">
        <div class="custom-input-group">
          <div class="custom-input-group__before">X轴</div>
          <div class="custom-input-group__content">
            <el-select placeholder="请选择" v-model="styleData.overflowX" clearable>
              <el-option label="隐藏" value="hidden" />
              <el-option label="显示" value="visible" />
              <el-option label="自动" value="auto" />
              <el-option label="滚动" value="scroll" />
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="custom-input-group">
          <div class="custom-input-group__before">Y轴</div>
          <div class="custom-input-group__content">
            <el-select placeholder="请选择" v-model="styleData.overflowY" clearable>
              <el-option label="隐藏" value="hidden" />
              <el-option label="显示" value="visible" />
              <el-option label="自动" value="auto" />
              <el-option label="滚动" value="scroll" />
            </el-select>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<style scoped>
.style-deploy {
  padding: 10px;
}

.style-deploy__title {
  font-size: 14px;
  font-weight: 700;
  margin: 5px;
  margin-top: 10px;
}

.custom-input-group {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 4px;
  padding-left: 0;
  background-color: #f1f2f5;
  border-radius: 4px;
  color: #4b5b76;
  font-size: 12px;
  margin: 5px;
}

.custom-input-group__before {
  position: relative;
  min-width: 32px;
  height: 30px;
  flex-shrink: 0;
  line-height: 32px;
  text-align: center;
  padding: 0 8px;
  margin-right: 4px;
}

.custom-input-group__before::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  right: -1px;
  width: 1px;
  height: 100%;
  background-color: #d6dbe3;
}

.custom-input-group__content {
  flex: 1;
}

.grid-box {
  position: relative;
  background-color: #f1f2f5;
  margin: 5px;
  padding: 40px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 20px;
  color: #97a3b7;
}

.grid-box__padding {
  position: relative;
  background-color: #e4e6ea;
  padding: 40px;
  border-radius: 4px;
}

.grid-box__content {
  position: relative;
  background-color: #f1f2f5;
  padding: 20px;
  border-radius: 4px;
}

.grid-box--margin {
  position: absolute;
  left: 16px;
  top: 10px;
}

.grid-box--padding {
  position: absolute;
  left: calc(16px + 40px);
  top: calc(10px + 40px);
}

.grid-box--margin-left {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
}

.grid-box--margin-right {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
}

.grid-box--margin-top {
  position: absolute;
  left: 50%;
  top: 5px;
  transform: translateX(-50%);
  width: 40px;
}

.grid-box--margin-bottom {
  position: absolute;
  left: 50%;
  bottom: 5px;
  transform: translateX(-50%);
  width: 40px;
}

.grid-box--padding-left {
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
}

.grid-box--padding-right {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
}

.grid-box--padding-top {
  position: absolute;
  left: 50%;
  top: calc(5px + 40px);
  transform: translateX(-50%);
  width: 40px;
}

.grid-box--padding-bottom {
  position: absolute;
  left: 50%;
  bottom: calc(5px + 40px);
  transform: translateX(-50%);
  width: 40px;
}

:deep(.el-input__wrapper) {
  background-color: transparent;
  box-shadow: none;
}

:deep(.el-select:hover:not(.el-select--disabled) .el-input__wrapper) {
  box-shadow: none;
}

:deep(.el-select) {
  width: 100%;
}

:deep(.el-select-dropdown__list) {
  margin: 0 !important;
  padding: 5px !important;
}

:deep(.el-select-dropdown__item) {
  padding: 0 15px;
  border-radius: 4px;
}

:deep(.grid-box .el-input__wrapper) {
  padding: 0 5px;
}

:deep(.grid-box .el-input__inner) {
  text-align: center;
  font-size: 12px;
}

:deep(.el-color-picker) {
  width: 100%;
}

:deep(.el-color-picker__trigger) {
  border: 1px solid transparent;
  width: 100%;
}

:deep(.el-color-picker .el-color-picker__icon) {
  color: #909399;
  display: none;
}
</style>
