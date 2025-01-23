import BaseMateriel from './BaseMateriel';


export default class LayoutGroup extends BaseMateriel {

  constructor(instance) {
    super(instance);
  }

  get defaultStyle() {
    return {
      fontSize: '14px',
      borderRadius: '6px',
      backgroundColor: '#ffffff',
      color: '#303133',
      overflowX: 'hidden',
      overflowY: 'hidden',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#e8e8e8'
    };
  }

  get materielType() {
    return 'LayoutGroup';
  }

  get defaultSlots() {
    return [
      {
        name: 'head',
        title: '头部插槽',
        allowComponents: [],
        denyComponents: [],
        children: []
      },
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
    return '分组容器';
  }

  get group() {
    return '布局';
  }

  get attributeSettings() {
    return [
      {
        title: '控件属性',
        type: 'block',
        children: [
          {
            title: '分组标题',
            type: 'textarea',
            propsKey: 'title'
          }
        ]
      }
    ];
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