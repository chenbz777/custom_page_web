import BaseMateriel from './BaseMateriel';


export default class LayoutPlainContainer extends BaseMateriel {

  constructor(instance) {
    super(instance);
  }

  get materielType() {
    return 'LayoutPlainContainer';
  }

  get defaultSlots() {
    return [
      {
        name: 'default',
        title: '默认插槽',
        allowComponents: [],
        denyComponents: [],
        children: []
      }
    ];
  }

  get title() {
    return '普通容器';
  }

  get group() {
    return '布局';
  }

  get eventSettings() {
    return [
      {
        name: 'onMounted',
        title: '组件加载完成',
        desc: ''
      },
      {
        name: 'onClick',
        title: '点击组件',
        desc: ''
      }
    ];
  }
}