<script setup>
import { ref } from 'vue';


// 问卷数据
const customPageData = ref(null);

// 选项
const options = ['电脑预览', '手机预览'];

// 平台
const platform = ref('');

// 是否显示弹窗
const popup = ref(false);

// 打开弹窗
function open(data, _platform) {
  if (!data) {
    return;
  }

  customPageData.value = JSON.parse(JSON.stringify(data));

  platform.value = _platform;

  popup.value = true;
}

// 弹窗打开后回调
function onOpened() {

  // 任务id
  let taskId = null;

  let taskNum = 50;

  taskId = setInterval(() => {
    taskNum--;

    if (taskNum <= 0) {
      clearInterval(taskId);
    }

    if (window.previewIframe.contentWindow.setCustomPageData) {
      clearInterval(taskId);

      window.previewIframe.contentWindow.setCustomPageData(customPageData.value);
    }
  }, 50);
}

// 暴露函数
defineExpose({
  open
});
</script>

<template>
  <div class="preview-popup">
    <el-drawer v-model="popup" title="预览" direction="btt" :destroy-on-close="true" size="90%" @opened="onOpened">
      <BaseContainer height="100%">
        <template #head>
          <div class="p-3 text-center">
            <el-segmented v-model="platform" :options="options" size="default" />
          </div>
        </template>

        <div class="preview__content">
          <iframe src="/customPage/preview" id="previewIframe" class="my-iframe" :class="{
            'my-iframe--pc': platform === '电脑预览',
            'my-iframe--phone': platform === '手机预览'
          }"></iframe>
        </div>
      </BaseContainer>
    </el-drawer>
  </div>
</template>

<style scoped>
.preview-popup :deep(.el-drawer__header) {
  display: none;
}

.preview-popup :deep(.el-drawer__body) {
  padding: 0;
}

.preview__content {
  height: 100%;
  padding: 10px;
  background-color: #e9eaef;
}

.my-iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 8px solid white;
  margin: auto;
  transition: all 0.3s;
}

.my-iframe--pc {
  width: 100%;
}

.my-iframe--phone {
  width: 375px;
}
</style>