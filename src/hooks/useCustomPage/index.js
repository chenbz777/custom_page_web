import { ref } from 'vue';
import MaterielFactory from '@/hooks/useCustomPage/materielFactory';


// 上传配置
const uploadConfig = ref({
  baseURL: '',
  method: 'post',
  url: '',
  headers: {},
  data: {}
});

function setUploadConfig(config) {
  uploadConfig.value = Object.assign(uploadConfig.value, config);
}

// 获取完整url
function getFullUrl(url = '') {
  return url.includes('http') ? url : uploadConfig.value.baseURL + url;
}

function initCustomPageData(customPageData) {
  if (!customPageData) {
    customPageData = [
      MaterielFactory.createMateriel('Page')
    ];
  }

  const recursionFn = (arr = []) => {

    if (!Array.isArray(arr)) {
      return;
    }

    if (!arr.length) {
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];

      const materiel = MaterielFactory.createMateriel(item.type);

      if (item.slots) {
        for (let j = 0; j < item.slots.length; j++) {
          const slot = item.slots[j];

          recursionFn(slot.children);
        }
      }

      arr[i] = Object.assign(materiel, item);
    }
  };

  recursionFn(customPageData);

  return customPageData;
}

export default function useCustomPage() {
  return {
    uploadConfig,
    setUploadConfig,
    getFullUrl,
    initCustomPageData
  };
}