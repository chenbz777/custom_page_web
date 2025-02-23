<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import RenderEngine from './components/RenderEngine.vue';
import useCustomPage from '@/hooks/useCustomPage';
import IframeMessage from '@/common/IframeMessage';
import Subscribe from '@/common/Subscribe';
import useAction from '@/hooks/useAction';
import userDefined from '@/utils/userDefined';
import random from '@/utils/random';


const { initCustomPageData } = useCustomPage();

const { parseActionList } = useAction();

const customPageData = ref(null);

const customPageKey = ref(random.lowerCase());

const iframeMessage = new IframeMessage();

onUnmounted(() => {
  iframeMessage.destroy();
});

const option = {};

function init(data) {
  customPageData.value = initCustomPageData(data);

  option.subscribe = new Subscribe();

  handleEvents();

  customPageKey.value = random.lowerCase();
}

onMounted(() => {
  init();
});

function setCustomPageData(data) {
  init(data);
}

window.setCustomPageData = setCustomPageData;

function recursionCustomPageData(handleFn) {
  const recursionFn = (arr = []) => {
    if (!Array.isArray(arr)) {
      return;
    }

    if (!arr.length) {
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];

      try {
        handleFn(item);
      } catch (error) {
        console.warn('处理自定义页面数据出错', error);
      }

      if (item.slots) {
        for (let j = 0; j < item.slots.length; j++) {
          const slot = item.slots[j];
          recursionFn(slot.children, item);
        }
      }
    }
  };

  recursionFn(customPageData.value);
}

function handleEvents() {
  recursionCustomPageData((item) => {
    if (item.events) {
      for (const key in item.events) {
        const eventName = `${item.key}_${key}`;

        option.subscribe.on(eventName, (data) => {
          parseActionList(item.events[key], data);
        });
      }
    }
  });
}

function setGlobalData(data) {
  const text = JSON.stringify(customPageData.value);

  // 替换自定义页面数据中的全局变量
  const newText = userDefined.replaceTemplate(text, data);

  init(JSON.parse(newText));
}

window.setGlobalData = setGlobalData;

// 监听消息
iframeMessage.onMessage = (event) => {
  const { type, data } = event;

  if (type === 'setCustomPageData') {
    init(data);

    iframeMessage.send({
      type: 'setCustomPageDataCallback',
      data: data
    });
  }

  if (type === 'setGlobalData') {
    setGlobalData(data);

    iframeMessage.send({
      type: 'setGlobalDataCallback',
      data: data
    });
  }
};
</script>

<template>
  <div v-if="customPageData && customPageData.length" :key="customPageKey">
    <RenderEngine :renderList="customPageData" :option="option" />
  </div>
</template>

<style scoped></style>