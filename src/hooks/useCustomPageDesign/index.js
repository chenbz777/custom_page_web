import { ref } from 'vue';
import Subscribe from '@/common/Subscribe';
import { ElNotification } from 'element-plus';
import useCustomPage from '@/hooks/useCustomPage';


const subscribe = new Subscribe();

const { initCustomPageData } = useCustomPage();

// 当前组件数据
const currentComponentData = ref(null);

// 自定义页面数据
const customPageData = ref(initCustomPageData());

subscribe.on('clickComponent', (data) => {
  currentComponentData.value = data;
});

// 获取当前组件的父级数据
function getCurrentComponentParentData() {
  if (!currentComponentData.value) {
    // 默认取[0]作为父级数据
    return customPageData.value[0];
  }

  if (currentComponentData.value.type === 'Page') {
    return customPageData.value[0];
  }

  let parentData = null;

  const recursionFn = (arr = [], parent) => {

    if (!Array.isArray(arr)) {
      return;
    }

    if (!arr.length) {
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];

      if (item.key === currentComponentData.value.key) {
        parentData = parent;

        break;
      }

      if (item.slots) {
        for (let j = 0; j < item.slots.length; j++) {
          const slot = item.slots[j];
          recursionFn(slot.children, item);
        }
      }
    }
  };

  recursionFn(customPageData.value, null);

  if (!parentData) {
    // 默认取[0]作为父级数据, 兜底
    parentData = customPageData.value[0];
  }

  return parentData;
}

// 获取当前组件的父级插槽数据
function getCurrentComponentParentSlotData() {

  const currentComponentParentData = getCurrentComponentParentData();

  if (!currentComponentData.value) {
    return currentComponentParentData.slots.find(slot => slot.name === 'default');
  }

  if (currentComponentData.value.type === 'Page') {
    return currentComponentParentData.slots.find(slot => slot.name === 'default');
  }

  for (let i = 0; i < currentComponentParentData.slots.length; i++) {
    const slot = currentComponentParentData.slots[i];

    if (slot.children.find(child => child.key === currentComponentData.value.key)) {
      return slot;
    }
  }

  return null;
}

// 获取当前组件所有父级层级数据
function findCurrentComponentHierarchy() {

  if (!currentComponentData.value) {
    return [customPageData.value[0]];
  }

  const targetKey = currentComponentData.value.key;

  const structure = customPageData.value;

  /**
   * 递归遍历函数，用于在组件树中查找目标组件
   * @param {Object} node 当前节点
   * @param {Array} path 当前路径记录（包括父节点）
   * @returns {Array|null} 找到则返回路径数组，否则返回 null
   */
  function recursionFn(node, path) {
    // 如果当前节点的 key 和目标 key 相同，返回路径加上当前节点
    if (node.key === targetKey) {
      return [...path, node];
    }

    // 查找节点的 slots 或 children
    const children = node.slots?.flatMap(slot => slot.children) || [];
    for (const child of children) {
      // 递归调用 traverse，传入子节点
      const result = recursionFn(child, [...path, node]);
      if (result) { return result; } // 如果找到目标组件，返回结果
    }

    return null; // 当前节点及其子节点未找到目标组件
  }

  // 从根节点开始遍历结构树
  for (const node of structure) {
    const result = recursionFn(node, []);

    if (result) { return result; } // 找到后立即返回结果
  }

  return []; // 如果遍历完整个树未找到目标组件，返回空数组
}

// 添加组件
function addComponent(data) {
  const slotData = getCurrentComponentParentSlotData();

  if (slotData) {
    const deleteComponent = () => {
      ElNotification({
        title: '提示',
        message: '该组件不允许添加',
        type: 'warning'
      });
    };

    // 如果存在不允许添加的组件
    if (slotData.allowComponents && slotData.allowComponents.length) {
      if (!slotData.allowComponents.includes(data.type)) {
        deleteComponent();

        return;
      }
    }

    // 如果存在不允许添加的组件
    if (slotData.denyComponents && slotData.denyComponents.length) {
      if (slotData.denyComponents.includes(data.type)) {
        deleteComponent();

        return;
      }
    }

    slotData.children.push(data);
  }

  subscribe.emit('clickComponent', data);

  // 设置当前组件数据
  currentComponentData.value = data;

  return true;
}

// 删除组件
function removeComponent() {
  const slotData = getCurrentComponentParentSlotData();

  const index = slotData.children.findIndex(child => child.key === currentComponentData.value.key);

  slotData.children.splice(index, 1);

  subscribe.emit('clickComponent', null);
}

export default function useCustomPageDesign() {
  return {
    customPageData,
    subscribe,
    addComponent,
    currentComponentData,
    removeComponent,
    findCurrentComponentHierarchy
  };
}