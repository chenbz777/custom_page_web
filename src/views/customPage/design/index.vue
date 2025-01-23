<script setup>
import { ref, onUnmounted } from 'vue';
import LeftSide from './components/LeftSide/index.vue';
import EditPage from './components/EditPage.vue';
import Configuration from './components/Configuration/index.vue';
import useCustomPageDesign from '@/hooks/useCustomPageDesign';
import { ElMessageBox } from 'element-plus';
import userDefined from '@/utils/userDefined';
import useCustomPage from '@/hooks/useCustomPage';
import PreviewPopup from './components/PreviewPopup.vue';
import IframeMessage from '@/common/IframeMessage';
import ComponentActive from './components/ComponentActive.vue';
import Breadcrumb from './components/Breadcrumb.vue';


const { initCustomPageData } = useCustomPage();

const { customPageData, subscribe } = useCustomPageDesign();

// 预览弹窗实例
const previewPopupRef = ref(null);

// 导出配置JSON
const exportJSON = () => {
  const fileName = customPageData.value[0].key + '的页面.json';

  userDefined.exportJSON(customPageData.value, fileName);
};

// 导入配置JSON
const importJSON = () => {
  userDefined.importJSON().then((data) => {
    customPageData.value = initCustomPageData(data);
  });
};

function clearPage() {
  ElMessageBox.confirm(
    '确认清空页面数据吗？',
    '清空问卷',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      subscribe.emit('clickComponent', null);
      customPageData.value = initCustomPageData();
    })
    .catch(() => { });
}

const iframeMessage = new IframeMessage();

onUnmounted(() => {
  iframeMessage.destroy();
});

// 监听消息
iframeMessage.onMessage = (event) => {
  const { type, data } = event;

  if (type === 'setCustomPageData') {
    customPageData.value = initCustomPageData(data);

    iframeMessage.send({
      type: 'setCustomPageDataCallback',
      data: data
    });
  }

  if (type === 'getCustomPageData') {
    iframeMessage.send({
      type: 'getCustomPageDataCallback',
      data: customPageData.value
    });
  }
};

// 平台
const platform = ref('手机预览');

// 选项
const platformOptions = ['电脑预览', '手机预览'];
</script>

<template>
  <div class="design">
    <div class="design__left">
      <LeftSide></LeftSide>
    </div>

    <div class="design__content">
      <div class="design__content__head">
        <div>
          <el-segmented v-model="platform" :options="platformOptions" />
        </div>
        <div>
          <el-dropdown>
            <el-button class="mr-3">
              工具菜单
              <el-icon class="ml-1">
                <arrow-down />
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="exportJSON()">
                  <el-icon class="mr-1">
                    <Upload />
                  </el-icon>
                  导出页面JSON
                </el-dropdown-item>
                <el-dropdown-item @click="importJSON()">
                  <el-icon class="mr-1">
                    <Download />
                  </el-icon>
                  导入页面JSON
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-button type="danger" plain @click="clearPage()">
            清空页面
            <el-icon class="ml-1">
              <Delete />
            </el-icon>
          </el-button>
          <el-button type="success" plain @click="previewPopupRef.open(customPageData, platform)">
            预览页面
            <el-icon class="ml-1">
              <View />
            </el-icon>
          </el-button>
        </div>
      </div>

      <Breadcrumb></Breadcrumb>

      <div class="design__content__edit" :class="{
        'design__content__edit--mobile': platform === '手机预览'
      }">
        <EditPage></EditPage>
      </div>
    </div>

    <div class="design__right">
      <Configuration></Configuration>
    </div>

    <PreviewPopup ref="previewPopupRef" />
    <ComponentActive></ComponentActive>
  </div>
</template>

<style scoped>
.design {
  background-color: #e8eaef;
  padding: 20px;
  height: 100vh;
  display: flex;
}

.design__left {
  height: 100%;
  overflow-y: auto;
  background-color: white;
  border-radius: 12px;
}

.design__content {
  flex: 1;
  width: 0;
  height: 100%;
  overflow-y: auto;
  margin: 0 20px;
}

.design__right {
  width: 300px;
  height: 100%;
  overflow-y: auto;
  background-color: white;
  border-radius: 12px;
}

.design__content__head {
  background-color: white;
  padding: 6px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.design__content__edit {
  width: 100%;
  height: calc(100% - 20px - 44px - 34px);
  overflow-y: auto;
  margin: 0 auto;
  transition: all 0.3s;
}

.design__content__edit--mobile {
  width: 375px;
}
</style>