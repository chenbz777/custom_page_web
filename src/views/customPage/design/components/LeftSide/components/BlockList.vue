<script setup>
import MaterielFactory from '@/hooks/useCustomPage/materielFactory';
import { vDraggable } from 'vue-draggable-plus';
import useCustomPageDesign from '@/hooks/useCustomPageDesign';


const { addComponent } = useCustomPageDesign();

const list = [
  {
    title: '活动规则',
    data: {
      'type': 'LayoutGroup',
      'key': 'LayoutGroup_moygiuwnagjtqwuz',
      'props': {},
      'slots': [
        {
          'name': 'head',
          'title': '头部插槽',
          'allowComponents': [],
          'denyComponents': [],
          'children': [
            {
              'type': 'BaseTitle',
              'key': 'BaseTitle_jkhddcgecuspkwwi',
              'props': {
                'title': '活动规则',
                'lineColor': '#b3f64a'
              },
              'slots': [],
              'style': {
                'fontSize': '16px',
                'fontWeight': 600,
                'color': '#303133'
              },
              'editProps': {
                'delete': true,
                'copy': true,
                'move': true
              },
              'events': {
                'onMounted': [],
                'onClick': []
              }
            }
          ]
        },
        {
          'name': 'default',
          'title': '默认插槽',
          'allowComponents': [],
          'denyComponents': [],
          'children': [
            {
              'type': 'ExhibitionRichText',
              'key': 'ExhibitionRichText_czvqhuyxgtmldimf',
              'props': {
                'content': '<p><span style="color: rgb(68, 68, 68); background-color: rgb(255, 255, 255); font-size: 14px;">1、活动时间内，小米商城米家商品（不含手机、笔记本、电视）订单金额大于300元以上享受小米分期3/6期免息，用户优惠次数不限。<br>2、免息优惠仅限于开通小米分期的用户，未开通小米分期的用户需开通后即可享受免息。<br>3、使用小米分期购买的用户，最终是否具有免息资格，以用户小米分期可用额度及收银台优惠为准。享受免息资格，用户需直接使用小米钱包分期进行支付<br>4、如用户使用了优惠券购买商品，用券后按照最终支付金额享受分期 。<br>5、 活动期间内，小米商城APP和PC端小米网都可享受免息，不限制购物渠道。<br>6、使用小米分期支付的用户，订单支付金额需大于300元</span></p>'
              },
              'slots': [],
              'style': {},
              'editProps': {
                'delete': true,
                'copy': true,
                'move': true
              },
              'events': {}
            }
          ]
        }
      ],
      'style': {
        'fontSize': '14px',
        'color': '#303133',
        'fontWeight': 400,
        'marginLeft': '10px',
        'marginRight': '10px',
        'marginTop': '10px',
        'marginBottom': '10px',
        'borderRadius': '6px',
        'borderWidth': '1px',
        'borderStyle': 'solid',
        'borderColor': '#e8e8e8',
        'backgroundColor': '#ffffff',
        'overflowY': 'hidden',
        'overflowX': 'hidden',
        'boxShadow': '   '
      },
      'editProps': {
        'delete': true,
        'copy': true,
        'move': true
      },
      'events': {
        'onMounted': [],
        'onClick': []
      }
    }
  }
];

// 拖拽配置
const draggableOption = {
  animation: 200,
  sort: false,
  group: {
    name: 'customPageDesignGroup',
    put: false,
    pull: 'clone'
  },
  clone: (blockData) => {
    const { data } = blockData;

    return MaterielFactory.createMateriel(data.type, data);
  }
};

// 点击组件
function handleClick(blockData) {
  const { data } = blockData;

  addComponent(MaterielFactory.createMateriel(data.type, data));
}
</script>

<template>
  <div class="component-list">
    <AnimateTransitionGroup>
      <el-row :gutter="10" v-draggable="[list, draggableOption]">
        <el-col :span="12" v-for="item in list" :key="item.key">
          <div class="component-list__item" @click="handleClick(item)">{{ item.title }}</div>
        </el-col>
      </el-row>
    </AnimateTransitionGroup>
  </div>
</template>

<style scoped>
.component-list__title {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  line-height: 40px;
}

.component-list__item {
  background-color: #f0f0f0;
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.3s;
}

.component-list__item:hover {
  border: 1px solid #3095fa;
}
</style>