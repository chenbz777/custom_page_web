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

  setCustomPageData();
});

function getCustomPageData() {
  iframeMessage.send({
    type: 'getCustomPageData'
  }, (data) => {
    console.log('getCustomPageData', data);
  });
}

function setCustomPageData() {

  const customPageData = [{ 'type': 'Page', 'key': 'Page_uuxduoglxgxttooe', 'props': {}, 'slots': [{ 'name': 'head', 'title': '头部插槽', 'allowComponents': [], 'denyComponents': ['Page'], 'children': [] }, { 'name': 'default', 'title': '默认插槽', 'allowComponents': [], 'denyComponents': ['Page'], 'children': [{ 'type': 'AssistanceBlock', 'key': 'AssistanceBlock_uybjqrmtbaxuvcev', 'props': {}, 'slots': [], 'style': { 'fontWeight': 400, 'height': '60px', 'boxShadow': '   ' }, 'editProps': { 'delete': true, 'copy': true, 'move': true }, 'events': {} }, { 'type': 'BaseText', 'key': 'BaseText_afgpfyelbbhuvmel', 'props': { 'text': '自定义页面' }, 'slots': [], 'style': { 'fontSize': '14px', 'color': '#26355D', 'fontWeight': 400, 'paddingLeft': '8px', 'paddingRight': '8px', 'paddingTop': '2px', 'paddingBottom': '2px', 'display': 'inline', 'borderRadius': '26px', 'backgroundColor': '#FFFFFF', 'boxShadow': '   ' }, 'editProps': { 'delete': true, 'copy': true, 'move': true }, 'events': { 'onMounted': [], 'onClick': [] } }, { 'type': 'AssistanceBlock', 'key': 'AssistanceBlock_rccvvocxaeivjtlu', 'props': {}, 'slots': [], 'style': { 'fontWeight': 400, 'height': '50px', 'boxShadow': '   ' }, 'editProps': { 'delete': true, 'copy': true, 'move': true }, 'events': {} }, { 'type': 'BaseText', 'key': 'BaseText_fheylofbofxlgmpr', 'props': { 'text': '地球世界日' }, 'slots': [], 'style': { 'fontSize': '40px', 'fontWeight': 400, 'boxShadow': '   ' }, 'editProps': { 'delete': true, 'copy': true, 'move': true }, 'events': { 'onMounted': [], 'onClick': [] } }, { 'type': 'AssistanceBlock', 'key': 'AssistanceBlock_abrgzfiphizktiwa', 'props': {}, 'slots': [], 'style': { 'fontWeight': 400, 'height': '10px', 'boxShadow': '   ' }, 'editProps': { 'delete': true, 'copy': true, 'move': true }, 'events': {} }, { 'type': 'BaseText', 'key': 'BaseText_lvnjnaktplostfim', 'props': { 'text': '- WORLD EARTH DAY -' }, 'slots': [], 'style': { 'fontSize': '18px', 'fontWeight': 400, 'boxShadow': '   ' }, 'editProps': { 'delete': true, 'copy': true, 'move': true }, 'events': { 'onMounted': [], 'onClick': [] } }, { 'type': 'AssistanceBlock', 'key': 'AssistanceBlock_rlflkinwvdfhymsq', 'props': {}, 'slots': [], 'style': { 'fontWeight': 400, 'height': '20px', 'boxShadow': '   ' }, 'editProps': { 'delete': true, 'copy': true, 'move': true }, 'events': {} }, { 'type': 'BaseImage', 'key': 'BaseImage_woawmnwwqpnmxrkj', 'props': { 'url': 'https://p1.itc.cn/q_70/images03/20230423/87325837d68b4add8255461b91a9333c.gif' }, 'slots': [], 'style': { 'fontWeight': 400, 'width': '70%', 'display': 'inline', 'boxShadow': '   ' }, 'editProps': { 'delete': true, 'copy': true, 'move': true }, 'events': { 'onMounted': [], 'onClick': [] } }, { 'type': 'AssistanceBlock', 'key': 'AssistanceBlock_xsykqiaxigcbhlgt', 'props': {}, 'slots': [], 'style': { 'height': '20px', 'fontWeight': 400, 'boxShadow': '   ' }, 'editProps': { 'delete': true, 'copy': true, 'move': true }, 'events': {} }, { 'type': 'LayoutContainer', 'key': 'LayoutContainer_nkjtinigmaorucaw', 'props': { 'gutter': 0, 'cols': [{ 'span': 6, 'offset': 6, 'name': 'default' }, { 'span': 6, 'offset': 0, 'name': 'enpzmf' }], 'justify': 'start' }, 'slots': [{ 'name': 'default', 'title': '默认插槽', 'allowComponents': [], 'denyComponents': [], 'children': [{ 'type': 'BaseText', 'key': 'BaseText_qgmvruwyyjflznbw', 'props': { 'text': '低碳生活' }, 'slots': [], 'style': { 'color': '#26355D', 'fontWeight': 400, 'backgroundColor': '#FFFFFF', 'boxShadow': '   ' }, 'editProps': { 'delete': true, 'copy': true, 'move': true }, 'events': { 'onMounted': [], 'onClick': [] } }] }, { 'name': 'container2', 'title': '插槽2', 'allowComponents': [], 'denyComponents': [], 'children': [] }, { 'name': 'enpzmf', 'title': '插槽enpzmf', 'allowComponents': [], 'denyComponents': [], 'children': [{ 'type': 'BaseText', 'key': 'BaseText_ibftkknistjpnljl', 'props': { 'text': '绿色出行' }, 'slots': [], 'style': { 'color': '#FFFFFF', 'fontWeight': 400, 'backgroundColor': '#4D8B34', 'boxShadow': '   ' }, 'editProps': { 'delete': true, 'copy': true, 'move': true }, 'events': { 'onMounted': [], 'onClick': [] } }] }], 'style': {}, 'editProps': { 'delete': true, 'copy': true, 'move': true }, 'events': { 'onMounted': [], 'onClick': [] } }, { 'type': 'AssistanceBlock', 'key': 'AssistanceBlock_vivacnarngkxgvpn', 'props': {}, 'slots': [], 'style': { 'fontWeight': 400, 'height': '40px', 'boxShadow': '   ' }, 'editProps': { 'delete': true, 'copy': true, 'move': true }, 'events': {} }, { 'type': 'BaseText', 'key': 'BaseText_ewnmzguefhlgalzn', 'props': { 'text': '通过绿色低碳生活，改善地球的整体环境。' }, 'slots': [], 'style': { 'fontSize': '16px', 'fontWeight': 400, 'boxShadow': '   ' }, 'editProps': { 'delete': true, 'copy': true, 'move': true }, 'events': { 'onMounted': [], 'onClick': [] } }] }, { 'name': 'foot', 'title': '底部插槽', 'allowComponents': [], 'denyComponents': ['Page'], 'children': [] }], 'style': { 'color': '#FFFFFF', 'fontWeight': 400, 'textAlign': 'center', 'backgroundColor': '#26355D', 'boxShadow': '   ' }, 'editProps': { 'delete': false, 'copy': false, 'move': false }, 'events': {} }];

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