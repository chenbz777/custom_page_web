<script setup>
import { nextTick, onUnmounted } from 'vue';
import IframeMessage from '@/common/IframeMessage';


const iframeUrl = window.location.origin + '/customPage/design';

let iframeMessage = null;

onUnmounted(() => {
  iframeMessage.destroy();
});

nextTick(() => {
  iframeMessage = new IframeMessage('myIframe');
});

function getCustomPageData() {
  iframeMessage.send({
    type: 'getCustomPageData'
  }, (data) => {
    console.log('getCustomPageData', data);
  });
}

function setCustomPageData() {

  const customPageData = [{ 'type': 'Page', 'key': 'Page_dsihbyhlcydrrbcp', 'props': {}, 'slots': [{ 'name': 'head', 'title': '头部插槽', 'allowComponents': [], 'denyComponents': ['Page'], 'children': [{ 'type': 'ExhibitionRollingNotification', 'key': 'ExhibitionRollingNotification_fpzhiicozqoeknqk', 'props': { 'text': '永远相信 美好的事情即将发生', 'showLeftIcon': true, 'rolling': true, 'allowClose': false, 'rollingSpeed': 60, 'backgroundColor': '#fffbe8', 'textColor': '#ed6a0c' }, 'slots': [], 'style': {} }] }, { 'name': 'default', 'title': '默认插槽', 'allowComponents': [], 'denyComponents': ['Page'], 'children': [{ 'type': 'ExhibitionSwipe', 'key': 'ExhibitionSwipe_dnlfrnjvpeqbpmri', 'props': { 'autoplayInterval': 3, 'isLoop': true, 'indicatorColor': '#fff', 'list': [{ 'url': 'http://img.chenbz.com/a_test/zwt16x9.png', 'link': '', 'key': '1' }, { 'url': 'http://img.chenbz.com/a_test/zwt16x9.png', 'link': '', 'key': '2' }, { 'url': 'http://img.chenbz.com/a_test/zwt16x9.png', 'link': '', 'key': '3' }] }, 'slots': [], 'style': {} }, { 'type': 'AssistanceBlock', 'key': 'AssistanceBlock_mpisszgywspsarqg', 'props': {}, 'slots': [], 'style': {} }, { 'type': 'AssistanceBlock', 'key': 'AssistanceBlock_kekxmyhxwksuxnef', 'props': {}, 'slots': [], 'style': {} }, { 'type': 'LayoutGroup', 'key': 'LayoutGroup_ndgzcincrmyxjyor', 'props': {}, 'slots': [{ 'name': 'default', 'title': '默认插槽', 'allowComponents': [], 'denyComponents': [], 'children': [{ 'type': 'ExhibitionRichText', 'key': 'ExhibitionRichText_ivbtmsfecxnkerrx', 'props': { 'content': '展示内容' }, 'slots': [], 'style': {} }] }, { 'name': 'head', 'title': '头部插槽', 'allowComponents': [], 'denyComponents': [], 'children': [{ 'type': 'BaseTitle', 'key': 'BaseTitle_qrviluevttafejuc', 'props': { 'title': '标题', 'lineColor': '#b3f64a' }, 'slots': [], 'style': { 'fontSize': '16px', 'fontWeight': 600, 'color': '#303133' } }] }], 'style': { 'fontSize': '14px', 'marginLeft': '10px', 'marginRight': '10px', 'marginTop': '10px', 'marginBottom': '10px', 'borderRadius': '6px', 'backgroundColor': '#ffffff', 'color': '#303133', 'overflowX': 'hidden', 'overflowY': 'hidden', 'borderWidth': '1px', 'borderStyle': 'solid', 'borderColor': '#e8e8e8' } }] }, { 'name': 'foot', 'title': '底部插槽', 'allowComponents': [], 'denyComponents': ['Page'], 'children': [] }], 'style': {} }];

  iframeMessage.send({
    type: 'setCustomPageData',
    data: customPageData
  });
}
</script>

<template>
  <div>
    <div>
      <el-button type="primary" @click="getCustomPageData()">获取页面数据</el-button>
      <el-button type="success" @click="setCustomPageData()">设置内置页面数据</el-button>
    </div>

    <iframe :src="iframeUrl" id="myIframe" frameborder="0"></iframe>
  </div>
</template>

<style scoped>
#myIframe {
  display: block;
  width: 100vw;
  height: 90vh;
}
</style>