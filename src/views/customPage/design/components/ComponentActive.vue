<script setup>
import { ref } from 'vue';
import useCustomPageDesign from '@/hooks/useCustomPageDesign';
import MaterielFactory from '@/hooks/useCustomPage/materielFactory';
import { ElMessageBox } from 'element-plus';


const { subscribe, addComponent, removeComponent } = useCustomPageDesign();

const currentComponentData = ref(null);

// 监听dom元素实例
let resizeObserver = null;
// 当前监听的dom元素
let targetElement = null;

/**
 * @author: chenbz
 * @description: 查找dom元素
 * @param {*} domId {string} dom元素id
 * @param {*} callback {function} 回调函数
 * @return {*}
 */
function onDomMethod(domId, callback) {
  // 限制查找次数为20次
  let count = 20;

  const timer = setInterval(() => {
    const dom = document.getElementById(domId);

    if (dom) {
      clearInterval(timer);

      callback(dom);
    } else {
      count--;
      if (count <= 0) {
        clearInterval(timer);
      }
    }
  }, 20);
}

// 监听dom元素变化
function setResizeObserver() {

  clearResizeObserver();

  const domId = currentComponentData.value.key;

  onDomMethod(domId, (activeDom) => {

    // 选择要观察的 DOM 节点
    targetElement = document.getElementById(domId);

    resizeObserver = new ResizeObserver((entries) => {
      showActiveBorder();
    });

    // 开始观察目标节点
    resizeObserver.observe(targetElement);
  });
}

// 取消监听dom元素变化
function clearResizeObserver() {
  if (resizeObserver && targetElement) {
    resizeObserver.unobserve(targetElement);
    resizeObserver.disconnect();
  }

  resizeObserver = null;
  targetElement = null;

  closeActiveBorder();
}

// 显示激活边框
function showActiveBorder() {

  if (!currentComponentData.value) {
    return;
  }

  onDomMethod(currentComponentData.value.key, (activeDom) => {

    const parentDom = activeDom.parentNode;

    parentDom.style.position = 'relative';

    const componentActive = document.getElementById('componentActive');

    parentDom.appendChild(componentActive);

    componentActive.style.position = 'absolute';
    componentActive.style.left = `${activeDom.offsetLeft}px`;
    componentActive.style.top = `${activeDom.offsetTop}px`;
    componentActive.style.width = `${activeDom.offsetWidth}px`;
    componentActive.style.height = `${activeDom.offsetHeight}px`;
  });
}

// 关闭激活边框
function closeActiveBorder() {
  const componentActive = document.getElementById('componentActive');
  componentActive.style.position = 'fixed';
  componentActive.style.left = '-99999px';

  document.body.appendChild(componentActive);
}

subscribe.on('clickComponent', (data) => {

  if (!data) {
    clearResizeObserver();
    return;
  }

  currentComponentData.value = data;
  setResizeObserver();
});

subscribe.on('onStart', (data) => {
  clearResizeObserver();
});

// 删除组件
function deleteComponent() {
  ElMessageBox.confirm(
    '确定删除组件吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    .then(() => {
      removeComponent();
    });
}

// 复制组件
function copyComponent() {
  // 生成组件实例
  const model = MaterielFactory.createMateriel(currentComponentData.value.type, currentComponentData.value);

  addComponent(model);
}
</script>

<template>
  <div class="component-active" id="componentActive">
    <div class="component-active__container">
      <!-- <div class="component-active__title">
        {{ currentComponentData?.title }}
      </div> -->
      <div class="component-active__menu">
        <el-icon class="component-active__menu__icon" @click.stop="copyComponent()"
          v-if="currentComponentData?.editProps.copy">
          <CopyDocument />
        </el-icon>
        <el-icon class="component-active__menu__icon" @click.stop="deleteComponent()"
          v-if="currentComponentData?.editProps.delete">
          <Delete />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<style scoped>
.component-active {
  outline: 2px solid #0062ff;
  z-index: 100;
  outline-offset: -2px;
  box-sizing: border-box;
  pointer-events: none;
  position: fixed;
  left: -99999px;
  top: 0;
  background-color: rgba(0, 98, 255, 0.05);
}

.component-active__container {
  position: relative;
}

.component-active__title {
  position: absolute;
  top: 0;
  right: 60px;
  z-index: 102;
  font-size: 12px;
  background-color: #0062ff;
  color: #fff;
  line-height: 22px;
  padding: 0 6px;
}

.component-active__menu {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 101;
  background-color: #0062ff;
  color: #fff;
  padding: 3px 6px;
  display: flex;
  align-items: center;
  pointer-events: auto;
}

.component-active__menu__icon {
  display: block;
  font-size: 16px;
  margin: 0 4px;
  cursor: pointer;
}

.component-active__menu:empty {
  padding: 0;
}
</style>